"use strict";
var _ = require('lodash'),
	req,
	res,
	fs = require('fs'),
	path = require('path'),
	async = require.main.require('async'),
	nconf = require.main.require('nconf'),
	db = require.main.require('./src/database/redis'),
	user = require.main.require('./src/user'),
	topics = require.main.require('./src/topics'),
	templates = require.main.require('templates.js'),
	privileges = require.main.require('./src/privileges'),
	newsTemplate = fs.readFileSync(path.join(__dirname, '../templates/partials/news.tpl')).toString(),
	// newsTemplate = fs.readFileSync(path.join(__dirname, '../templates/partials/newsBackup.tpl')).toString(),
	Block = {
		data: {
			userIds: [],
			usersData: []
		}
	};

// getSortedSetRevRangeByScore
var getOnline = function (callback) {
	var now = Date.now();
	db.getSortedSetRevRangeByScore('users:online', 0, 20, '+inf', now - 300000000000, function (err, userIds) {
		Block.data.userIds = userIds;
		callback(err);
	});
};

var getUserData = function (callback) {
	user.getUsersData(Block.data.userIds, function (err, usersData) {
		// console.log('usersData: ', usersData);
		Block.data.usersData = usersData;
		callback(err);
	});
};

Block.getUsersData = function (_req, _res, callback) {
	req = _req;
	res = _res;
	async.series({
		getOnline: getOnline,
		getUserData: getUserData
	}, function (err, results) {
		callback(err, Block.data.usersData);
	});
};

module.exports = Block;
