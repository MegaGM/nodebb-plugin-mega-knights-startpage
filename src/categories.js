var _ = require('lodash');
"use strict";
var Block = {
		data: {}
	},
	data,
	async = require.main.require('async'),
	templates = require.main.require('templates.js'),
	db = require.main.require('./src/database/redis'),
	topics = require.main.require('./src/topics'),
	posts = require.main.require('./src/posts');
// privileges.topics.can('read', tid, req.uid, next);
// privileges.categories.get(data.cid, socket.uid, next);

Block.getNews = function (_data, callback) {
	data = _data;
	async.series([], function (err, results) {
		console.log('\n\n\n\ntopics: ', Block.data.topics);
		data.topics = Block.data.topics;
		callback(err);
	});
};

module.exports = Block;
