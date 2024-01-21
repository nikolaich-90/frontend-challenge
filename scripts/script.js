$(function() {

    let favorite_cats = {};

    initial();

    $(window).resize(check_scroll);

    const the_cat_api_url = 'https://api.thecatapi.com/v1/images/search?limit=10';
    const the_cat_api_key = 'live_ERImMV7FWPm7qWGJLUWtGs0XxPIc2LJ1k0bFo5rIoCsfOVBdiRwK5iA7FduYXhsJ';

    the_cat_api_request();

    // $('footer').on('click', the_cat_api_request);

    $(window).on('scroll', function() {
        a = $('html').prop('clientHeight');
        b = $('html').prop('scrollHeight');
        c = $('html').prop('scrollTop');
        scroll_bottom = b - c - a;
        min_bottom = 140;
        if ($('#main-content__all-cats').hasClass('main-content_active')) {
            if (scroll_bottom < min_bottom) the_cat_api_request();
        }
    });

    $('#header__tab__all-cats').on('click', all_cats_selected);

    $('#header__tab__favorite-cats').on('click', favorite_cats_selected);

    $('body').on('click', '[class="picture-with-cat__heart"]', like_dislike_cats);

    function initial() {
        favorite_cats = Cookies.get('favorite_cats');
        if (favorite_cats) {
            favorite_cats = JSON.parse(favorite_cats);
        } else {
            favorite_cats = {};
        }
        for (let id in favorite_cats) {
            let src = favorite_cats[id];
            $('#main-content__favorte-cats').append(`<div class="picture-with-cat" data-src="${src}">` +
                `<img class="picture-with-cat__picture" src="${src}" alt="cat">` +
                `<img class="picture-with-cat__heart" src="./images/filled-heart.png" alt="filled-heart" id="${id}">` +
                '</div>');
        }
    }

    function the_cat_api_request() {
        if (window.loading == true) {
            return false;
        }
        let xhr = new XMLHttpRequest();
        xhr.open('GET', the_cat_api_url);
        xhr.setRequestHeader('x-api-key', the_cat_api_key);
        xhr.responseType = 'json';
        xhr.send();
        window.loading = true;
        $('footer').addClass('footer_active');
        xhr.onload = function() {
            window.loading = false;
            $('footer').removeClass('footer_active');
            let data = xhr.response;
            data.map(function(data) {
                $('#main-content__all-cats').append(`<div class="picture-with-cat" data-src="${data.url}">` +
                    `<img class="picture-with-cat__picture" src="${data.url}" alt="cat">` +
                    `<img class="picture-with-cat__heart" src="./images/empty-heart.png" alt="empty-heart" id="${data.id}">` +
                    '</div>');
            });
            check_scroll();
        }
    }

    function all_cats_selected() {
        $('.header__tab').removeClass('header__tab_selected');
        $('#header__tab__all-cats').addClass('header__tab_selected');
        $('.main-content').removeClass('main-content_active');
        $('#main-content__all-cats').addClass('main-content_active');
    };

    function favorite_cats_selected() {
        $('.header__tab').removeClass('header__tab_selected');
        $('#header__tab__favorite-cats').addClass('header__tab_selected');
        $('.main-content').removeClass('main-content_active');
        $('#main-content__favorte-cats').addClass('main-content_active');
    };

    function like_dislike_cats() {
        let id = $(this).attr('id');
        let src = $(this).parent().data('src');
        if (this.alt == 'empty-heart') {
            this.src = './images/filled-heart.png';
            this.alt = 'filled-heart';
            $('#main-content__favorte-cats').append(`<div class="picture-with-cat" data-src="${src}">` +
                `<img class="picture-with-cat__picture" src="${src}" alt="cat">` +
                `<img class="picture-with-cat__heart" src="./images/filled-heart.png" alt="filled-heart" id="${id}">` +
                '</div>');
            favorite_cats[id] = src;
            Cookies.set('favorite_cats', JSON.stringify(favorite_cats));
        } else {
            favorite_cats[id] = undefined;
            Cookies.set('favorite_cats', JSON.stringify(favorite_cats));
            if ($(`#main-content__all-cats #${id}`).length > 0) {
                $(`#main-content__all-cats #${id}`).attr('src', './images/empty-heart.png');
                $(`#main-content__all-cats #${id}`).attr('alt', 'empty-heart');
            }
            $(`#main-content__favorte-cats [data-src="${src}"]`).remove();
        }
    };

    function check_scroll() {
        a = $('body').prop('clientHeight');
        b = $('body').prop('scrollHeight');
        c = $('html').prop('clientHeight');
        d = $('html').prop('scrollHeight');
        if (a == b && c == d) {
            the_cat_api_request();
        }
    }

});