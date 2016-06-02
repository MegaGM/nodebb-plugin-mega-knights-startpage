(function () {
	"use strict";

	/* ---------------------------------------------
	 * require dependencies
	 * ---------------------------------------------*/
	var async = require.main.require('async'),
		nbbHelpers = require.main.require('./src/controllers/helpers'),
		news = require('./src/news'),
		chat = require('./src/chat'),
		nconf = require.main.require('nconf'),
		routerHelpers = require.main.require('./src/routes/helpers'),
		ensureLoggedIn = require.main.require('connect-ensure-login'),
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
		application: function (req, res, next) {
			console.log('application middleware!!');
			if (res.locals.isAPI) {
				console.log('application middleware isAPI!!!');
			}
			res.render('make-application', {
				testData: 'this test dat'
			});
		},
		page: function (req, res, next) {
			async.parallel({
				news: async.apply(news.getNews, req, res),
				chatUserlist: async.apply(chat.getUsersData, req, res),
				categories: async.apply(categories.getCategories, req, res)
			}, function (err, results) {
				if (err) return console.error('Block news error: ', err);
				data.userlist = [{
					name: 'Mega'
				}, {
					name: 'Sanitize'
				}, {
					name: 'Karen-yant'
				}, {
					name: 'Synchroomonnica'
				}];

				data.news = results.news;
				data.categories = results.categories;
				data.chat.userlist = results.chatUserlist;
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
				ensureLoggedIn.ensureLoggedIn(nconf.get('relative_path') + '/login'),
				params.middleware.buildHeader,
				render.page);

			params.router.get('/api/start',
				render.page);

			params.router.get('/make-application',
				ensureLoggedIn.ensureLoggedIn(nconf.get('relative_path') + '/login'),
				params.middleware.buildHeader,
				render.application);

			params.router.get('/api/make-application',
				ensureLoggedIn.ensureLoggedIn(nconf.get('relative_path') + '/login'),
				render.application);

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
