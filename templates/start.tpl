<div class="row startpage">
	<div class="col-xs-12 col-sm-9 col-md-9 chat-container">
		<!-- IMPORT partials/breadcrumbs.tpl -->
		<!-- <img src="/plugins/nodebb-plugin-mega-knights-startpage/img/chat_screenshot.png" alt="" style="margin: 0 auto; display: block;"> -->
		<div class="row mega-chat">
			<div class="col-xs-9 mega-chat__main">chat</div>
			<div class="col-xs-3">
				<ul class="mega-chat__userlist">
					<!-- BEGIN userlist -->
					<li class="row"><a href="{../userslug}">{../name}</a></li>
					<!-- END userlist -->
				</ul>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-3 col-md-3 news-container">
		<!-- IF news -->
		{news}
		<!-- ENDIF news -->
	</div>
</div>
<!-- IF loggedIn -->
<!-- ENDIF loggedIn -->

<div class="row startpage">
	<div class="col-xs-12 categories-container">{categories}</div>
</div>
