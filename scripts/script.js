$(function() {

	const the_cat_api_url = 'https://api.thecatapi.com/v1/images/search?limit=20';
	const the_cat_api_key = 'live_ERImMV7FWPm7qWGJLUWtGs0XxPIc2LJ1k0bFo5rIoCsfOVBdiRwK5iA7FduYXhsJ';

	$('#header__tab__all-cats').addClass('header__tab_selected');
	$('#header__tab__text__all-cats').addClass('header__tab__text_selected');
	$('#main-content__favorte-cats').css('display', 'none');
	
	let xhr = new XMLHttpRequest();
	xhr.open('POST', the_cat_api_url);
	xhr.setRequestHeader('x-api-key', the_cat_api_key);
	xhr.responseType = 'json';
    xhr.send();

	$('#header__tab__all-cats').on('click', function(){
		$('#header__tab__favorite-cats').removeClass('header__tab_selected');
		$('#header__tab__text__favorite-cats').removeClass('header__tab__text_selected');
		$('#header__tab__all-cats').addClass('header__tab_selected');
		$('#header__tab__text__all-cats').addClass('header__tab__text_selected');
		$('#main-content__favorte-cats').css('display', 'none');
		$('#main-content__all-cats').css('display', 'flex');	
		$('footer').css('display', 'block');
	});

	$('#header__tab__favorite-cats').on('click', function(){
		$('#header__tab__all-cats').removeClass('header__tab_selected');
		$('#header__tab__text__all-cats').removeClass('header__tab__text_selected');
		$('#header__tab__favorite-cats').addClass('header__tab_selected');
		$('#header__tab__text__favorite-cats').addClass('header__tab__text_selected');
		$('#main-content__all-cats').css('display', 'none');	
		$('footer').css('display', 'none');
		$('#main-content__favorte-cats').css('display', 'flex');
	});


});