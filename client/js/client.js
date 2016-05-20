if ('/start' === window.location.pathname) {
	window.history.replaceState({}, '', '/');
}
$(document).on('ready', function (e) {
	var asyncPath = '../../plugins/nodebb-plugin-mega-knights-startpage/js/async.min';
	require([asyncPath], function (async) {
		// window.history.replaceState({}, '', '/');
	});
});
