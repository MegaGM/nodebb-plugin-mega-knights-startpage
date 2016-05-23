var _ = require('lodash'),
	fs = require('fs'),
	path = require('path'),
	async = require.main.require('async'),
	nconf = require.main.require('nconf'),
	validator = require.main.require('validator'),
	categories = require.main.require('./src/categories'),
	meta = require.main.require('./src/meta'),
	helpers = require.main.require('./src/controllers/helpers'),
	db = require.main.require('./src/database/redis'),
	privileges = require.main.require('./src/privileges'),
	topics = require.main.require('./src/topics'),
	templates = require.main.require('templates.js'),
	categoriesTemplate = fs.readFileSync(path.join(__dirname, '../templates/partials/categories.tpl')).toString(),
	Block = {
		data: {
			canRead: 0,
			tids: [],
			topics: [],
			topicTags: []
		}
	};

var categoriesController = {};

categoriesController.getCategories = function (req, res, next) {
	res.locals.metaTags = [{
		name: "title",
		content: validator.escape(meta.config.title || 'NodeBB')
	}, {
		name: "description",
		content: validator.escape(meta.config.description || '')
	}, {
		property: 'og:title',
		content: '[[pages:categories]]'
	}, {
		property: 'og:type',
		content: 'website'
	}];

	var ogImage = meta.config['og:image'] || meta.config['brand:logo'] || '';
	if (ogImage) {
		if (!ogImage.startsWith('http')) {
			ogImage = nconf.get('url') + ogImage;
		}
		res.locals.metaTags.push({
			property: 'og:image',
			content: ogImage
		});
	}

	var categoryData;
	async.waterfall([
		function (next) {
			categories.getCategoriesByPrivilege('cid:0:children', req.uid, 'find', next);
		},
		function (_categoryData, next) {
			categoryData = _categoryData;

			var allCategories = [];
			categories.flattenCategories(allCategories, categoryData);

			categories.getRecentTopicReplies(allCategories, req.uid, next);
		}
	], function (err) {
		if (err) {
			return next(err);
		}

		var data = {
			title: '[[pages:categories]]',
			categories: categoryData
		};

		if (req.path.startsWith('/api/categories') || req.path.startsWith('/categories')) {
			data.breadcrumbs = helpers.buildBreadcrumbs([{
				text: data.title
			}]);
		}

		data.categories.forEach(function (category) {
			if (category && Array.isArray(category.posts) && category.posts.length) {
				category.teaser = {
					url: nconf.get('relative_path') + '/topic/' + category.posts[0].topic.slug + '/' + category.posts[0].index,
					timestampISO: category.posts[0].timestampISO,
					pid: category.posts[0].pid
				};
			}
		});

		// res.render('categories', data);
		templates.parse(categoriesTemplate, {
			categories: data.categories,
			config: {
				relative_path: nconf.get('relative_path')
			}
		}, function (html) {
			next(err, html);
		});
	});
};

module.exports = categoriesController;
