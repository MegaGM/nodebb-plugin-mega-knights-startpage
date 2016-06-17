"use strict";
var _ = require('lodash'),
	req,
	res,
	fs = require('fs'),
	path = require('path'),
	async = require.main.require('async'),
	nconf = require.main.require('nconf'),
	db = require.main.require('./src/database/redis'),
	topics = require.main.require('./src/topics'),
	templates = require.main.require('templates.js'),
	privileges = require.main.require('./src/privileges'),
	newsTemplate = fs.readFileSync(path.join(__dirname, '../templates/partials/news.tpl')).toString();
// newsTemplate = fs.readFileSync(path.join(__dirname, '../templates/partials/newsBackup.tpl')).toString(),

class Category {
	constructor(cid, desc) {
		this.cid = cid;
		this.desc = desc;
		this.canRead = false;
	}

	get cidRedis() {
		return `cid:${this.cid}:tids`;
	}
};

var Block = {
	data: {
		categories: [new Category('15', 'general news')],
		categoriesPublic: [new Category('20', 'general public news')],
		tids: [],
		topics: [],
		topicTags: []
	}
};

// var cid = '15',
// 	cidPublic = '20',
// 	cidRedis = 'cid:' + cid + ':tids',
// 	cidRedisPublic = 'cid:' + cidPublic + ':tids';

var canRead = function (callback) {
	async.each(Block.data.categories, function (category, callback) {
		privileges.categories.can('read', category.cid, req.uid, function (err, canRead) {
			if (err) callback(err);
			category.canRead = !!canRead;
			callback(err);
		});
	}, callback);
};

var getTopicIds = function (callback) {
	Block.data.tids = [];
	async.parallel({
		newsTopicIds: function (callback) {
			async.each(Block.data.categories, function (category, callback) {
				if (!category.canRead) return callback(null);
				db.getSortedSetRevRange(category.cidRedis, 0, 4, function (err, tids) {
					// console.log('category categories getTopicIds: ', category, category.cidRedis);
					Block.data.tids = _.concat(Block.data.tids, tids);
					callback(err);
				});
			}, callback);
		},
		publicNewsTopicIds: function (callback) {
			async.each(Block.data.categoriesPublic, function (category, callback) {
				db.getSortedSetRevRange(category.cidRedis, 0, 4, function (err, tids) {
					Block.data.tids = _.concat(Block.data.tids, tids);
					callback(err);
				});
			}, callback);
		},
	}, callback);
};

var getTopicsData = function (callback) {
	topics.getTopicsData(Block.data.tids, function (err, topics) {
		Block.data.topics = _.chain(topics)
			.orderBy(['timestamp'], ['desc'])
			.filter(function (topic) {
				return !parseInt(topic.deleted, 10);
			})
			.slice(0, 5)
			.value();
		callback(err);
	});
};

var getTopicsTagsAndReadState = function (callback) {
	async.each(Block.data.topics, function (topic, callback) {
		async.parallel([
			function (callback) {
				topics.getTopicTagsObjects(topic.tid, function (err, tags) {
					topic.tags = tags;
					callback(err);
				});
			},
			function (callback) {
				topics.hasReadTopic(topic.tid, req.uid, function (err, hasRead) {
					topic.unread = !hasRead;
					callback(err);
				});
			}
		], callback);
	}, callback);
};

//topics.hasReadTopics(tids, uid, callback)
Block.getNews = function (_req, _res, callback) {
	req = _req;
	res = _res;
	async.series({
		canRead: canRead,
		getTopicIds: getTopicIds,
		getTopicsData: getTopicsData,
		getTopicsTagsAndReadState: getTopicsTagsAndReadState
	}, function (err, results) {
		templates.parse(newsTemplate, {
			news: Block.data.topics,
			config: {
				relative_path: nconf.get('relative_path')
			}
		}, function (html) {
			callback(err, html);
		});
	});
};

module.exports = Block;
