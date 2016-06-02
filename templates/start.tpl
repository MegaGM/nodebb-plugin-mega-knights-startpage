<!-- IF !XXXloggedIn -->
<div class="row">
	<div class="col-xs-12 make-application-teaser">
		<span class="text bg-success">Хотите получить титул Рыцаря? Сегдоня у Вас есть шанс
			<button type="button" class="button btn btn-sm btn-success">Подать заявку</button>
		</span>
	</div>
</div>
<!-- ENDIF !XXXloggedIn -->
<!-- IMPORT XXXpartials/breadcrumbs.tpl -->
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
