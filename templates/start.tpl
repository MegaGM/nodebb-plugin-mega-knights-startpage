<!-- IMPORT XXXpartials/breadcrumbs.tpl -->
<!-- IF !_loggedIn -->
<div class="row">
		<div class="col-xs-12 make-application-teaser">
				<span class="text bg-success">Чтобы получить титул Рыцаря
						<button type="button" class="button btn btn-sm btn-success">
								<img src="plugins/nodebb-plugin-mega-knights-startpage/img/knights_logo_helmet_vk_logo_32.png" alt="">
								<span>
										Подай заявку сегодня
								</span>
						</button>
						бесплатно и без СМС!
				</span>
		</div>
</div>
<!-- ENDIF !_loggedIn -->
<div class="chat-news-layout">
		<div class="chat-column">
				{chat}
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
