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
	newsTemplate = fs.readFileSync(path.join(__dirname, '../templates/partials/news.tpl')).toString(),
	Block = {
		data: {
			canRead: 0,
			tids: [],
			topics: [],
			topicTags: []
		}
	};

var cid = '15',
	cidPublic = '20',
	cidRedis = 'cid:' + cid + ':tids',
	cidRedisPublic = 'cid:' + cidPublic + ':tids';

var canRead = function (callback) {
	privileges.categories.can('read', cid, req.uid, function (err, canRead) {
		if (err) callback(err);
		Block.data.canRead = !!canRead;
		callback(err);
	});
};

var getTopicIds = function (callback) {
	Block.data.tids = [];
	async.parallel({
			newsTopicIds: function (callback) {
				if (!Block.data.canRead) return callback(null);
				db.getSortedSetRevRange(cidRedis, 0, 8, function (err, tids) {
					if (err) return callback(err);
					Block.data.tids = _.concat(Block.data.tids, tids);
					callback(err);
				});
			},
			publicNewsTopicIds: function (callback) {
				db.getSortedSetRevRange(cidRedisPublic, 0, 8, function (err, tids) {
					if (err) return callback(err);
					Block.data.tids = _.concat(Block.data.tids, tids);
					callback(err);
				});
			},
		},
		function (err, results) {
			callback(err);
		}
	);

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

var getTopicsTags = function (callback) {
	async.each(Block.data.topics, function (topic, callback) {
			topics.getTopicTagsObjects(topic.tid, function (err, tags) {
				topic.tags = tags;
				callback(err);
			});
		},
		function (err, results) {
			callback(err);
		});
};

Block.getNews = function (_req, _res, callback) {
	req = _req;
	res = _res;
	async.series({
		canRead: canRead,
		getTopicIds: getTopicIds,
		getTopicsData: getTopicsData,
		getTopicsTags: getTopicsTags
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
