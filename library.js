(function () {
	"use strict";

	var async = require.main.require('async'),
		nbbHelpers = require.main.require('./src/controllers/helpers'),
		news = require('./src/news'),
		categories = require('./src/categories'),
		data = {
			title: 'Home',
			breadcrumbs: nbbHelpers.buildBreadcrumbs([{}])
		};

	var render = {
		admin: function (req, res, next) {
			res.render('admin/plugins/start.tpl', data);
		},
		page: function (req, res, next) {
			async.parallel({
				news: async.apply(news.getNews, req, res),
				categories: async.apply(categories.getCategories, req, res)
			}, function (err, results) {
				if (err) return console.error('Block news error: ', err);
				data.news = results.news;
				data.categories = results.categories;
				data.userlist = ['Mega', 'Sanitize', 'DeamonLord', 'Петрушка', 'Сова'];
				data.userlist = [{
					name: 'Mega'
				}, {
					name: 'Sanitize'
				}, {
					name: 'Karen-yant'
				}, {
					name: 'Synchroomonnica'
				}];
				res.render('start', data);
			});
		}
	};

	var Plugin = {
		init: function (params, callback) {
			params.router.get('/start', params.middleware.buildHeader, render.page);
			params.router.get('/api/start', render.page);
			params.router.get('/plugins/start', params.middleware.admin.buildHeader, render.admin);
			params.router.get('/api/plugins/start', params.middleware.admin.buildHeader, render.admin);
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
