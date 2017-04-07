<!-- IMPORT XXXpartials/breadcrumbs.tpl -->
<div class="chat-news-layout">
	<div class="chat-column">
		{chat}
		<div class="chat-layout">
			<!-- IF !_loggedIn -->
			<div class="make-application-teaser">
				<span class="text bg-success">
					<button type="button" class="button btn btn-sm btn-success">
						<img src="/plugins/nodebb-plugin-mega-knights-startpage/img/knights_logo_helmet_vk_logo_32.png" alt="">
						<span>
							Вступить в Knights
						</span>
					</button>
				</span>
			</div>
			<!-- ENDIF !_loggedIn -->
		</div>
	</div>
	<!-- IF news -->
	<div class="news-column">
		{news}
	</div>
	<!-- ENDIF news -->
</div>

<div class="row">
	<div class="col-xs-12 categories-layout">{categories}</div>
</div>
