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
		<!-- <img src="/plugins/nodebb-plugin-mega-knights-startpage/img/chat_screenshot.png" alt="" style="margin: 0 auto; display: block;"> -->

		<div class="chat-layout">
			<div class="header">
				<span class="text icon fa-stack fa-lg" style="margin-left: 10px;"><i style="color:#f5f7f7;" class="fa fa-circle fa-stack-2x"></i><i class="fa fa-bell-o fa-stack-1x"></i></span>
				<span class="text">Местные новости</span>
			</div>

			<div class="columns">
				<div class="roomlist-column">
					<div class="room">
						<a href="#room" class="link guests"></a>
					</div>
					<div class="room">
						<a href="#room" class="link friends"></a>
					</div>
					<div class="room">
						<a href="#room" class="link knights"></a>
					</div>
					<div class="room">
						<a href="#room" class="link officers"></a>
					</div>
					<div class="room">
						<a href="#room" class="link commanders"></a>
					</div>
				</div>
				<!-- <div class="roomlist-column">
					<div class="room"><a href="#roommoom" class="link public">Все</a></div>
					<div class="room"><a href="#roommoom" class="link friends">Соратники</a></div>
					<div class="room"><a href="#roommoom" class="link knights">Рыцари</a></div>
					<div class="room"><a href="#roommoom" class="link officers">Офицеры</a></div>
					<div class="room"><a href="#roommoom" class="link foremans">Foremans</a></div>
				</div> -->
				<div class="main-column">
					<span class="temporary">Здесь будет чат</span>
				</div>
				<div class="userlist-column">
					<ul class="userlist">
						<!-- BEGIN chat.userlist -->
						<a class="link" href="/user/{../userslug}">
							<li class="userlist__item">{../username}</li>
						</a>
						<!-- END chat.userlist -->
					</ul>
				</div>
			</div>
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
