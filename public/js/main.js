// $(window).load(function() {
//     // Animate loader off screen
//     $(".loader").show();
// });

$(document).ready(function () {
    var $sectionHero = $('.section--hero');

    function changeHeight() {
        $sectionHero.height($(window).height() - $('header').outerHeight() * 1.5);
    }

    changeHeight();
    $(window).resize(function () {
        changeHeight();
    });
});

$(document).ready(function () {
    // $(".loader").animate({opacity: 0}).remove();
    //datepicker
    $(".c-form-field__input[name='dateIn'], .c-form-field__input[name='dateOut']").datepicker({
        showOn: "button",
        buttonImage: "img/calendar-white.png",
        buttonImageOnly: true,
        buttonText: "Выбрать дату"
    });
});

$(document).ready(function () {
    //Header Scroll
    window.addEventListener('scroll', scroller);
    function scroller() {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $('.c-nav').parent().css('margin-top', $('.c-nav').outerHeight());
            $('.c-nav').addClass('fixed');
        } else {
            $('.c-nav').removeClass('fixed');
            $('.c-nav').parent().css('margin-top', 0);
        }

    }


    // contact form
    $("#contactsform").submit(function () {
        var a = $(this).attr("action");
        $("#message").slideUp(750, function () {
            $("#message").hide();
            $("#submit-contacts").attr("disabled", "disabled");
            $.post(a, {
                name: $("#contacts-form-name").val(),
                email: $("#contacts-form-email").val(),
                phone: $("#contacts-form-phone").val(),
                comments: $("#contacts-form-message").val()
            }, function (a) {
                document.getElementById("message").innerHTML = a;
                $("#message").slideDown("slow");
                $("#submit-contacts").removeAttr("disabled");
                if (null != a.match("success")) $("#contactsform").slideDown("slow");
            });
        });
        return false;
    });
    $("#contactsform input, #contactsform textarea").keyup(function () {
        $("#message").slideUp(1500);
    });

    //menu scrolling
    var $menuLinkClass = $('.c-list__link');

    function getActiveLink(el) {
        return $($(el).attr('href'));
    }

    $menuLinkClass.click(function (e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: getActiveLink(this).offset().top}, 1000);
    });

    //waypoint script
    $('.section').waypoint(function (direction) {
        var self = this;
        if (direction === 'down') {
            $menuLinkClass.map(function () {
                var $aHash = $(this).attr('href').slice(1);
                if ($(self.element).hasClass($aHash)) {
                    $menuLinkClass.parents().removeClass('c-list__item--is-active');
                    $(this).parent().addClass('c-list__item--is-active');
                }
            });
        }
    }, {offset: '20%'});
    $('.section').waypoint(function (direction) {
        var self = this;
        if (direction === 'up') {
            $menuLinkClass.map(function () {
                var $aHash = $(this).attr('href').slice(1);
                if ($(self.element).hasClass($aHash)) {
                    $menuLinkClass.parents().removeClass('c-list__item--is-active');
                    $(this).parent().addClass('c-list__item--is-active');
                }
            });
        }
    }, {offset: '-30%'});

    //masked input tel
    function maskedInput() {
        $('input[name="fullName"]').attr('placeholder', 'Введите ваше имя');
        $('input[name="phoneNumber"]').attr('placeholder', '(___) ___-____');
        $("input[type='tel']").mask("(999) 999-9999");
    }

    maskedInput();
    //hero-slider
    var swiper = new Swiper('.swiper-container', {
        autoplay: 3000,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    });

    // var swiperStars = new Swiper('.team-swiper', {
    //     slidesPerView: 3.5,
    //     direction: 'vertical',
    //     spaceBetween: 30,
    //     nextButton: '.c-slider__list-item__control-down',
    //     prevButton: '.c-slider__list-item__control-up'
    // });

    var swiperTeam = new Swiper('.team-swiper', {
        slidesPerView: 3.4,
        spaceBetween: 10,
        nextButton: '.team-swiper-button-next',
        prevButton: '.team-swiper-button-prev'
    });

    //slider team
    var $items2 = $('.c-hor-slider__list-item');
    $items2.on('click', function () {
        $items2.removeClass('c-hor-slider__list-item--is-active');
        $(this).addClass('c-hor-slider__list-item--is-active');
        var index = $items2.index($(this));
        $('.c-hor-slider__content__item').hide().css('opacity', '0').eq(index).show().animate({opacity: 1}, 600);
        // currMargin = currMargin - startMargin - $('.c-slider__list-item').outerHeight(true);
        // $('.c-slider__content-list__wrapper').animate({marginTop: currMargin + 'px'}, 300);
    }).eq(0).click();

    //slider stars
    $('.c-slider__content-list').css('height', $('.c-slider').height());
    var $items = $('.c-slider__list-item');
    $items.on('click', function () {
        $items.removeClass('c-slider__list-item--is-active');
        $(this).addClass('c-slider__list-item--is-active');
        var index = $items.index($(this));
        $('.c-slider__content__item').hide().css('opacity', '0').eq(index).show().animate({opacity: 1}, 600);
        // currMargin = currMargin - startMargin - $('.c-slider__list-item').outerHeight(true);
        // $('.c-slider__content-list__wrapper').animate({marginTop: currMargin + 'px'}, 300);
    }).eq(0).click();

    var startMargin = 0;
    var currMargin = 0;
    var sum = 0;
    $('.c-slider__list-item').each(function () {
        return sum = sum + $(this).height()
    });
    var maxMargin = sum;

    $('.c-slider__list-item__control-down').on('click', function () {
        if (currMargin * 1.5 < '-' + maxMargin) {
            currMargin = 0;
            $('.c-slider__content-list__wrapper').animate({marginTop: currMargin + 'px'}, 300);
        } else {
            currMargin = currMargin - startMargin - $('.c-slider__list-item').outerHeight(true);
            $('.c-slider__content-list__wrapper').animate({marginTop: currMargin + 'px'}, 300);
        }

    });
    $('.c-slider__list-item__control-up').on('click', function () {
        if (currMargin >= 0) {
            currMargin = -maxMargin / 1.5 - $('.c-slider__list-item').outerHeight(true);
            $('.c-slider__content-list__wrapper').animate({marginTop: currMargin + 'px'}, 300);
        } else {
            currMargin = currMargin + $('.c-slider__list-item').outerHeight(true);
            $('.c-slider__content-list__wrapper').animate({marginTop: currMargin + 'px'}, 300);
        }

    });


    //modal
    vex.defaultOptions.className = 'vex-theme-plain';
    $('.c-button--section').on('click', function (e) {
        var target = e.target;
        vex.dialog.prompt({
            message: '<h1>Бронирование</h1><p>Заполните необходимые поля и наши менеджеры свяжутся с вами в ближайшее время!</p>',
            input: '<div class="row">'
            + '<div class="modal-form__group small-6 columns"> <label class="modal-form__group__title">Дата заезда: </label> <input name="dateIn" class="modal-form__group__input form_contacts__dateIn" type="text"> </div>'
            + '<div class="modal-form__group small-6 columns"> <label class="modal-form__group__title">Дата выезда: </label> <input name="dateOut" class="modal-form__group__input form_contacts__dateOut" type="text"> </div>'
            + '</div>'
            + '<div class="row">'
            + '<div class="modal-form__group small-6 columns"> <label class="modal-form__group__title">Количество взрослых:</label> <input name="peopleCount" class="modal-form__group__input form_contacts__peopleCount" type="number"> </div>'
            + '<div class="modal-form__group small-6 columns"> <label class="modal-form__group__title">Количество детей:</label> <input name="childCount" class="modal-form__group__input form_contacts__peopleCount" type="number"> </div>'
            + '</div>'
            + '<div class="row">'
            + '<div class="modal-form__group small-6 columns"> <label class="modal-form__group__title">Как Вас зовут: </label> <input name="fullName" class="modal-form__group__input form_contacts__name" type="text"> </div>'
            + '<div class="modal-form__group small-6 columns"> <label class="modal-form__group__title">Номер телефона: </label> <input name="phone" class="modal-form__group__input form_contacts__phone" type="tel"> </div>'
            + '</div>',
            buttons: [
                $.extend({}, vex.dialog.buttons.YES, {
                    text: 'Отправить заявку',
                    className: 'c-button c-button--section c-button--pop-up'
                })
            ],
            showCloseButton: true,
            afterOpen: function (e) {
                $(".modal-form__group__input[name='dateIn'], .modal-form__group__input[name='dateOut'] ").datepicker({
                    showOn: "button",
                    buttonImage: "img/calendar.png",
                    buttonImageOnly: true,
                    buttonText: "Выбрать дату"
                });
                //mask on input
                maskedInput();

                //hide no need fields
                function hideModalInputs(arrayOfInputsNames) {

                    arrayOfInputsNames.forEach(function (el) {
                        $('.modal-form__group__input[name='+el+']').parent().hide();
                    });
                }

                if($(target).parents().hasClass('section--apartments')){

                }else if ($(target).parents().hasClass('section--spa')) {

                    hideModalInputs(['dateOut', 'peopleCount', 'childCount']);

                }else if($(target).parents().hasClass('section--lounge')){

                    hideModalInputs(['dateOut','dateIn', 'peopleCount', 'childCount']);

                }else if($(target).parents().hasClass('section--sport')){

                    hideModalInputs(['dateOut','dateIn', 'peopleCount', 'childCount']);

                }else if($(target).parents().hasClass('section--dates')){

                    hideModalInputs(['dateOut', 'peopleCount', 'childCount']);

                }else if($(target).parents().hasClass('section--events')){

                    hideModalInputs(['dateOut', 'childCount']);

                }
                //serviceFormSender('.vex-dialog-form', '.form__message_service');
            },
            onSubmit: function (event) {
                event.preventDefault();
                event.stopPropagation();

            }
        });


    });
});


function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: {lat: 60.0001745, lng: 30.3138074},
        disableDefaultUI: true
    });

    var image = 'img/pointer.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 60.0001763, lng: 30.3159463},
        map: map,
        icon: image
    });


}


