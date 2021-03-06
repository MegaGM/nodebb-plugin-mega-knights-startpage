<div class="news">
	<div class="header">
		<span class="icon fa-stack fa-lg" style="margin-left: 10px;"><i style="color:#f5f7f7;" class="fa fa-circle fa-stack-2x"></i><i style="color:#f55151;" class="fa fa-bell-o fa-stack-1x"></i></span>
		<span class="text">Местные новости</span>
	</div>
	<ul class="newslist">
		<!-- BEGIN news -->
		<li class="newslist__item<!-- IF news.unread --> unread<!-- ENDIF news.unread -->">


			<h2 class="title">
				<!-- IF !news.noAnchor -->
				<a class="link" href="{config.relative_path}/topic/{news.slug}<!-- IF news.bookmark -->/{news.bookmark}<!-- ENDIF news.bookmark -->">{news.title}</a>
				<br />
				<!-- ELSE -->
				{news.title}
				<br />
				<!-- ENDIF !news.noAnchor -->
				<small class="">
					<span class="timeago" title="{news.timestampISO}"></span>
				</small>
				<span class="taglist">
					<!-- IF news.tags.length -->
					<small>&nbsp;&bull;</small>
					<!-- ENDIF news.tags.length -->
					<!-- BEGIN tags -->
					<a href="{config.relative_path}/tags/{news.tags.value}"><span class="tag" style="<!-- IF news.tags.color -->color: {news.tags.color};<!-- ENDIF news.tags.color --><!-- IF news.tags.bgColor -->background-color: {news.tags.bgColor};<!-- ENDIF news.tags.bgColor -->">{news.tags.value}</span></a>
					<!-- END tags -->
				</span>

			</h2>

		</li>
		<!-- END news -->
	</ul>
</div>
