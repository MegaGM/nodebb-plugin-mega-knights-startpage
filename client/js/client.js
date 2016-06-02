if ('/start' === window.location.pathname) {
	window.history.replaceState({}, '', '/');
}

$(document).on('ready', function (e) {
	$('.make-application-teaser .button').on('click', function (e) {
		ajaxify.go('/make-application')
	});
});
