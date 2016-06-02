if ('/start' === window.location.pathname) {
	window.history.replaceState({}, '', '/');
}
$(document).on('ready', function (e) {
	var asyncPath = '../../plugins/nodebb-plugin-mega-knights-startpage/js/async.min';
	require([asyncPath], function (async) {
		// window.history.replaceState({}, '', '/');
		function resizeChat() {
			$('.chat-layout').css('max-height', $('.news').css('height'));
		}
		resizeChat();
		$(window).on('action:ajaxify.end', resizeChat);

		$('.make-application-teaser .button').on('click', function (e) {
			ajaxify.go('/make-application')
		});
	});
});
