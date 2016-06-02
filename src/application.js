"use strict";
var _ = require('lodash'),
	req,
	res,
	fs = require('fs'),
	path = require('path'),
	async = require.main.require('async'),
	nconf = require.main.require('nconf'),
	db = require.main.require('./src/database/redis'),
	middleware = require.main.require('./src/middleware'),
	topics = require.main.require('./src/topics'),
	templates = require.main.require('templates.js'),
	privileges = require.main.require('./src/privileges'),
	newsTemplate = fs.readFileSync(path.join(__dirname, '../templates/partials/news.tpl')).toString();
// newsTemplate = fs.readFileSync(path.join(__dirname, '../templates/partials/newsBackup.tpl')).toString(),


var Block = {
	data: {
		topicTags: []
	}
};

var getTopicsTagsAndReadState = function (callback) {
	//meow
};

//topics.hasReadTopics(tids, uid, callback)
Block.getNews = function (_req, _res, callback) {
	req = _req;
	res = _res;
	async.series({
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
