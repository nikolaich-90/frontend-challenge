$(function() {

    initial();

    const the_cat_api_url = 'https://api.thecatapi.com/v1/images/search?limit=2';
    const the_cat_api_key = 'live_ERImMV7FWPm7qWGJLUWtGs0XxPIc2LJ1k0bFo5rIoCsfOVBdiRwK5iA7FduYXhsJ';

    the_cat_api_request();

    $('footer').on('click', the_cat_api_request);

    // $(window).on('scroll', function() {
    //     alert('збс');
    //     console.log($(window).scrollTop());
    //     console.log($('footer').offset().top);
    //     if ($(window).scrollTop() > $('footer').offset().top) {
    //         the_cat_api_request();
    //     }
    // });

    $('#header__tab__all-cats').on('click', all_cats_selected);

    $('#header__tab__favorite-cats').on('click', favorite_cats_selected);

    $('body').on('click', '[class="picture-with-cat__heart"]', like_dislike_cats);

    function initial() {
        $('#header__tab__all-cats').addClass('header__tab_selected');
        $('#header__tab__text__all-cats').addClass('header__tab__text_selected');
        $('#main-content__favorte-cats').css('display', 'none');
        let url = 0;
        let id = 1;
        while (Cookies.get(Object.keys(Cookies.get())[url]) != undefined) {
            $('#main-content__favorte-cats').append($(`<div class="picture-with-cat" id="${Cookies.get(Object.keys(Cookies.get())[url])}">` +
                `<img class="picture-with-cat__picture" src="${Cookies.get(Object.keys(Cookies.get())[url])}" alt="cat">` +
                '</div>'));
            $(`[id="${Cookies.get(Object.keys(Cookies.get())[url])}"]`).append($(`<img class="picture-with-cat__heart" src="./images/filled-heart.png" alt="filled-heart" id="${Cookies.get(Object.keys(Cookies.get())[id])}">`));
            url = url + 2;
            id = id + 2;
        }
    }

    function the_cat_api_request() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', the_cat_api_url);
        xhr.setRequestHeader('x-api-key', the_cat_api_key);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload = function() {
            let data = xhr.response;
            data.map(function(data) {
                $('#main-content__all-cats').append($(`<div class="picture-with-cat" id="${data.url}">` +
                    `<img class="picture-with-cat__picture" src="${data.url}" alt="cat">` +
                    `<img class="picture-with-cat__heart" src="./images/empty-heart.png" alt="empty-heart" id="${data.id}">` +
                    '</div>'));
            });
        }
    }

    function all_cats_selected() {
        $('#header__tab__favorite-cats').removeClass('header__tab_selected');
        $('#header__tab__text__favorite-cats').removeClass('header__tab__text_selected');
        $('#header__tab__all-cats').addClass('header__tab_selected');
        $('#header__tab__text__all-cats').addClass('header__tab__text_selected');
        $('#main-content__favorte-cats').css('display', 'none');
        $('#main-content__all-cats').css('display', 'flex');
        $('footer').css('display', 'block');
    };

    function favorite_cats_selected() {
        $('#header__tab__all-cats').removeClass('header__tab_selected');
        $('#header__tab__text__all-cats').removeClass('header__tab__text_selected');
        $('#header__tab__favorite-cats').addClass('header__tab_selected');
        $('#header__tab__text__favorite-cats').addClass('header__tab__text_selected');
        $('#main-content__all-cats').css('display', 'none');
        $('footer').css('display', 'none');
        $('#main-content__favorte-cats').css('display', 'flex');
    };

    function like_dislike_cats() {
        if (this.alt == 'empty-heart') {
            this.src = './images/filled-heart.png';
            this.alt = 'filled-heart';
            $('#main-content__favorte-cats').append($(`<div class="picture-with-cat" id="${$(this).parent().attr('id')}">` +
                `<img class="picture-with-cat__picture" src="${$(this).parent().attr('id')}" alt="cat">` +
                `<img class="picture-with-cat__heart" src="./images/filled-heart.png" alt="filled-heart" id="${$(this).attr('id')}">` +
                '</div>'));
            Cookies.set('url_' + `${$(this).attr('id')}`, `${$(this).parent().attr('id')}`, { sameSite: 'strict' });
            Cookies.set('id_' + `${$(this).attr('id')}`, `${$(this).attr('id')}`, { sameSite: 'strict' });
        } else {
            Cookies.remove('url_' + `${$(this).attr('id')}`);
            Cookies.remove('id_' + `${$(this).attr('id')}`);
            if ($('#main-content__all-cats').find($(`[id="${$(this).attr('id')}"]`))[0] != undefined) {
                $('#main-content__all-cats').find($(`[id="${$(this).attr('id')}"]`))[0].src = './images/empty-heart.png';
                $('#main-content__all-cats').find($(`[id="${$(this).attr('id')}"]`))[0].alt = 'empty-heart';
            }
            $('#main-content__favorte-cats').find($(`[id="${$(this).parent().attr('id')}"]`)).remove();
        }
    };

});