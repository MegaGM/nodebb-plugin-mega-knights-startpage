(function () {
	"use strict";

	/* ---------------------------------------------
	 * require dependencies
	 * ---------------------------------------------*/
	var async = require.main.require('async'),
		nbbHelpers = require.main.require('./src/controllers/helpers'),
		news = require('./src/news'),
		chat = require('./src/chat'),
		categories = require('./src/categories'),
		data = {
			title: 'Home',
			breadcrumbs: nbbHelpers.buildBreadcrumbs([{}]),
			chat: {}
		};

	/* ---------------------------------------------
	 * declare routes
	 * ---------------------------------------------*/
	var render = {
		admin: function (req, res, next) {
			res.render('admin/plugins/start.tpl', data);
		},
		page: function (req, res, next) {
			async.parallel({
				chat: async.apply(chat.getChat, req, res),
				news: async.apply(news.getNews, req, res),
				categories: async.apply(categories.getCategories, req, res)
			}, function (err, results) {
				if (err) return console.error('Block news error: ', err);
				data.chat = results.chat;
				data.news = results.news;
				data.categories = results.categories;
				res.render('start', data);
			});
		}
	};

	var Plugin = {
		init: function (params, callback) {
			/* ---------------------------------------------
			 * setup routes
			 * ---------------------------------------------*/
			params.router.get('/start',
				params.middleware.buildHeader,
				render.page);

			params.router.get('/api/start',
				render.page);

			params.router.get('/plugins/start',
				params.middleware.admin.buildHeader,
				render.admin);

			params.router.get('/api/plugins/start',
				params.middleware.admin.buildHeader,
				render.admin);
			callback(null);
		},
		admin: function (header, callback) {
			header.plugins.push({
				route: '/plugins/start',
				icon: 'fa-paint-brush',
				name: 'Startpage'
			});

			callback(null, header);
		}
	};

	module.exports = Plugin;
})();
