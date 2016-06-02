$(document).on('ready', function (e) {
	function resizeChat() {
		$('.chat-layout').css('max-height', $('.news').css('height'));
	}
	resizeChat();
	$(window).on('action:ajaxify.end', resizeChat);
});
