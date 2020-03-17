jQuery(document).ready(function () {
    homePageModule.init();
    globalModule.init();
    bagPageModule.init();
    if (jQuery('.bag-page')[0]) pageBagZakaz.init();
    if (jQuery('.about-section-our-team-slider')[0]) pageAboutOwlSlider();

    pageModuleRevies.init();

    probnoeMenuSliderInit.init();

    qustionAnswerItem();

    jQuery(document).on('click', '.slow-animation', function (e) {
        e.preventDefault();
        jQuery('html, body').animate({
            scrollTop: jQuery( jQuery.attr(this, 'href') ).offset().top
        }, 500);
        return false;
    });

    // showThankYouPopup();


    document.addEventListener( 'wpcf7mailsent', function( event ) {
        if ( '314' == event.detail.contactFormId ||'305' == event.detail.contactFormId) {
            showThankYouPopup();
        }
    }, false );
});

let probnoeMenuSliderInit = {
    sliderClass: '.eating-slider',
    listContainer: '[checkboxlist]',
    blockLeftContainer: '.main-block-style .left-part',
    customEatingNav: '.custom-eating-navigation',
    init: function () {
        if (!jQuery(document).find(this.sliderClass)[0]) return;
        this.serealizeSlider();
        this.changeOnNextPrevDayType();
        this.initSliderList();
        this.initSummaryKkal();
    },
    serealizeSlider: function () {
        let that = this;
        let sliderParams = {
            loop:false,
            margin:0,
            responsiveClass:true,
            items:1,
            nav:true,
        };
        let owl = jQuery(that.sliderClass).owlCarousel(sliderParams);
        that.onChangeOwl(owl);
    },
    changeOnNextPrevDayType: function () {
        let that = this;
        jQuery(document).find(that.blockLeftContainer + ' ' + that.customEatingNav).on('click', 'span', function () {
            jQuery(document).find(that.blockLeftContainer + '.show ' + that.customEatingNav + ' .active-time').removeClass('active-time');
            jQuery(document).find('[data-sliderlist=' + that.getActiveSkiderList() + ']').trigger('to.owl.carousel', [jQuery(this).attr('data-id'), 300]);
            console.log('[data-sliderlist=' + that.getActiveSkiderList() + ']');
            jQuery(this).addClass('active-time');
        })
    },
    onChangeOwl: function(owl) {
        let that = this;
        owl.on('changed.owl.carousel', function(event) {
            jQuery(document).find(that.blockLeftContainer + '.show ' + that.customEatingNav + ' .active-time').removeClass('active-time');
            let ind = event.item.index;
            jQuery(document).find(that.blockLeftContainer + '.show ' + that.customEatingNav + ' span:eq('+ ind +')').addClass('active-time');
        })
    },
    getActiveSkiderList: function () {
        let that = this;
        return jQuery(that.listContainer + ' ul ').find('.active').attr('data-sliderfilter');
    },
    initSliderList: function () {
        let that = this;

        if (jQuery(document).find(that.listContainer)[0]) {
            jQuery(document).find(that.listContainer).on('click', '.forshowing-action', function () {
                jQuery(this).closest(that.listContainer).addClass('show');
            });

            jQuery(document).find(that.listContainer).on('click', 'li', function () {
                jQuery('.super-loader-inslider').show();

                let nameSlider = jQuery(this).attr('data-sliderfilter');

                jQuery('.main-block-style .left-part').removeClass('show');

                jQuery(that.listContainer).find('.active').removeClass('active');
                jQuery(that.listContainer).find('.current').text(jQuery(this).text());
                jQuery(that.listContainer).removeClass('show');
                jQuery(this).addClass('active');

                jQuery('[data-sliderprogram="'+ nameSlider +'"]').addClass('show');
                setTimeout(function () {
                    jQuery('.super-loader-inslider').hide();
                }, 100);

                that.initSummaryKkal();
            });
        }
        return;
    },
    initSummaryKkal: function () {
        let that = this;
        let bilok=jur=yglvod=kkal=0;

        jQuery(document).find(that.blockLeftContainer + '.show ' + ' .owl-item').each((index, val) => {
            let it = jQuery(document).find(that.blockLeftContainer + '.show ' + ' .owl-item')[index];
            bilok += parseFloat(jQuery(it).find('.slider-bilok').text());
            jur += parseFloat(jQuery(it).find('.slider-jur').text());
            yglvod += parseFloat(jQuery(it).find('.slider-yglevod').text());
            kkal += parseFloat(jQuery(it).find('.slider-kkal').text());
        });

        jQuery('.probne-menu-summary .bilok-cl').text(bilok.toFixed(2));
        jQuery('.probne-menu-summary .jur-cl').text(jur.toFixed(2));
        jQuery('.probne-menu-summary .yglevod-cl').text(yglvod.toFixed(2));
        jQuery('.probne-menu-summary .kksl-cl').text(kkal.toFixed(2));
    }
}


function showThankYouPopup() {
    let $html = `
<section class="modalThankYouPopup modal fade" id="modalThankYouPopup" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered dish-item" role="document">
        <div class="modal-content" >
            <div class="card">

                <!-- Close -->
                <button type="button" class="modal-close close text-white" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">
                        <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M31.0054 10.9844L29.5046 9.48359L20.5 18.4882L11.4954 9.48359L9.99461 10.9844L18.9992 19.989L9.99409 28.9941L11.4949 30.4949L20.5 21.4898L29.5051 30.4949L31.0059 28.9941L22.0008 19.989L31.0054 10.9844Z" fill="white"/>
                        </svg>
                    </span>
                </button>
                <div class="card-body">
                    <svg width="205" height="96" viewBox="0 0 205 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle opacity="0.1" cx="101.5" cy="48.021" r="47.5" fill="#70D44B"/>
                        <g clip-path="url(#clip0)">
                        <path d="M99.687 65.853C97.615 67.925 94.253 67.925 92.182 65.853L80.554 54.225C78.482 52.154 78.482 48.792 80.554 46.721C82.625 44.649 85.987 44.649 88.059 46.721L94.987 53.648C95.51 54.17 96.359 54.17 96.883 53.648L115.642 34.889C117.713 32.817 121.075 32.817 123.147 34.889C124.142 35.884 124.701 37.234 124.701 38.641C124.701 40.048 124.142 41.398 123.147 42.393L99.687 65.853Z" fill="#70D44B"/>
                        </g>
                        <circle cx="170" cy="16.521" r="5" fill="#FFD83A"/>
                        <circle cx="174.5" cy="82.021" r="3.5" fill="#00ADFB"/>
                        <circle cx="27" cy="8.521" r="8" fill="#00ADFB"/>
                        <circle cx="31" cy="69.521" r="6" fill="#FFD83A"/>
                        <rect x="180.918" y="43.521" width="29" height="8" rx="4" transform="rotate(29.3211 180.918 43.521)" fill="#F75948"/>
                        <rect x="2.91797" y="26.521" width="29" height="8" rx="4" transform="rotate(29.3211 2.91797 26.521)" fill="#A1C545"/>
                        <defs>
                        <clipPath id="clip0">
                        <rect width="45.701" height="45.7" fill="white" transform="translate(79 27.521)"/>
                        </clipPath>
                        </defs>
                        </svg>
                        
                        <div class="green">
                            <p>Благодарим<br>
                                Ваш заказ принят</p>
                        </div>
                        <div class="text">
                            <p>
                            В ближайшее время с Вами свяжется<br> наш менеджер для уточнения деталей
                            </p>
                        </div>
                        <a href="#" class="modal-link" onclick="jQuery('#modalThankYouPopup').modal('hide');" >Закрыть</a>
                </div>

            </div>
        </div>
    </div>
</section>
`;
    jQuery('body').append($html);
    jQuery('#modalThankYouPopup').modal();
}

function qustionAnswerItem() {
    if (!jQuery('.qustion-answer-item')[0]) return;

    jQuery('.qustion-answer-item').on('click', '', function () {
        let answer = jQuery(this).find('.answer');
        jQuery('.qustion-answer-item .answer').hide('slow');
        if (answer.is(':hidden'))
            answer.show('slow');
    });
}




let pageModuleRevies = {
    formBtn:document.getElementById('sendReview'),
    form: document.getElementById('sendRevieForm'),
    init: function () {
        if (!jQuery('#modalSendReview')[0]) return;
        if (jQuery('.our-friends-slider')[0]) (this.pageReviewsOwlSlider());
        this.pageReviewPopup();
        this.initFormSubmit();
    },
    pageReviewsOwlSlider: function() {
        jQuery('.our-friends-slider').owlCarousel({
            loop:false,
            margin:30,
            responsiveClass:true,
            items:1,
            // stagePadding: 2,
            nav:true,
            pagination: true,
            mouseDrag: false,
            dotsEach: true,
        })
    },
    pageReviewPopup: function() {
        let that = this;


        jQuery(document).on('click', '.modal-review', function (e) {
            e.preventDefault();

            jQuery('#modalSendReview').modal();

            jQuery(document).find('.card-body.modal2 .super-rating').on('mouseover', 'svg', function () {
                let parentEl = jQuery(this).closest('.super-rating');
                let that = this;
                parentEl.find('svg').removeClass('active');
                parentEl.find('svg').each(function () {
                    if (parseInt(jQuery(this).attr('data-rating')) <= parseInt(jQuery(that).attr('data-rating'))) {
                        jQuery(this).addClass('active');
                    }
                });
                pageModuleRevies.onChangeRatingInModal();
            });
            jQuery(document).find('.card-body.modal2 .super-rating').on('click', 'svg', function () {
                jQuery(this).addClass('active');
                that.onChangeRatingInModal();
            });
        });
    },
    onChangeRatingInModal: function () {
        jQuery(document).find('.rating-field').val(jQuery(document).find('.card-body.modal2 .super-rating svg.active').last().attr('data-rating'));
    },
    initFormSubmit: function () {
        let that = this;
        that.form.addEventListener('submit', function (e) {
            if(that.form.checkValidity()) {
                e.preventDefault();
                that.doSendAjax();
            } else {
                that.formBtn.click();
            }
        });
    },
    doSendAjax() {
        let that = this;
        let data = jQuery(that.form).serialize();

        let ajaxurl = '/wp-admin/admin-ajax.php';

        jQuery.ajax({
            type: 'POST',
            url: ajaxurl,
            cache : false,
            data: {
                action: 'send_review_action',
                fields: data
            },
            success: function(result) {
                if (result.success) {
                    jQuery('body').append(that.getPopupSended());
                    jQuery('#modalSendReview').modal('hide');
                    jQuery('#modalSendedReview').modal();
                    jQuery(document).on('hide.bs.modal', '#modalSendedReview', function (e) {
                        jQuery('#modalAddedToBag').remove();
                    })
                    setTimeout(function () {
                        jQuery('#modalSendedReview').modal('hide');
                    }, 1000)
                }
            },
            error:  function(xhr, str){
                console.log('Error: ' + xhr.responseCode);
            }
        });
    },
    getPopupSended: function () {
        $html = `
            <div class="dish-popup-section modal fade" id="modalSendedReview" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="card">
                        <!-- Close -->
                        <button type="button" class="modal-close close text-white" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">
                                <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M31.0054 10.9844L29.5046 9.48359L20.5 18.4882L11.4954 9.48359L9.99461 10.9844L18.9992 19.989L9.99409 28.9941L11.4949 30.4949L20.5 21.4898L29.5051 30.4949L31.0059 28.9941L22.0008 19.989L31.0054 10.9844Z" fill="white"/>
                                </svg>
                            </span>
                        </button>
                        </div>
                        <div class="card-body">
                            <h3>Отзыв оставлен!</h3>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return $html;
    }
}

function pageAboutOwlSlider() {
    jQuery('.about-section-our-team-slider').owlCarousel({
        loop:false,
        margin:0,
        responsiveClass:true,
        items:1,
        nav:true,
        pagination: true,
    })
}

let pageBagZakaz = {
    formBtn:document.getElementById('formZakazbtn'),
    form: document.getElementById('formForZakazDishes'),
    status_message: document.getElementById('form-message-status'),
    init: function () {
        this.btnClick();
        this.initFormSubmit();
    },
    btnClick: function () {
        let that = this;
        jQuery(document).on('click', '#sendDozakaz', function (e) {
            e.preventDefault();
            that.formBtn.click();
        });
    },
    initFormSubmit: function () {
        let that = this;
        that.form.addEventListener('submit', function (e) {
            if(that.form.checkValidity()) {
                e.preventDefault();
                that.doSendAjax();
            } else {
                that.btnZakaz.click();
            }
        });
    },
    doSendAjax() {
        let that = this;
        data = jQuery(that.form).serialize();

        let dishes = [];
        jQuery('[data-dish-id]').each(function (index ) {
            let dishId = jQuery(this).attr('data-dish-id');
            let dishCount = jQuery(this).find('[data-count-number]').text();
            dishes[index ] = {
                dishId,
                dishCount
            }
        });

        let ajaxurl = '/wp-admin/admin-ajax.php';

        jQuery.ajax({
            type: 'POST',
            url: ajaxurl,
            cache : false,
            data: {
                action: 'do_zakaz_action',
                fields: data,
                dishes: dishes
            },
            success: function(result) {
                if (result.success) {
                    if (result.data.order_code && result.data.order_code !== '') {
                        let $order = result.data.order_code;
                        setCookie('vkusShop', '');
                        window.location.href = '/thankyou?order=' + $order;
                    } else if (result.data.liqpay && result.data.liqpay !== ''){
                        jQuery('body').append(`<div class="liqpayForm" style="display:none;">${result.data.liqpay}</div>`);
                        jQuery(document).find('.liqpayForm form').submit();
                    }
                }
            },
            error:  function(xhr, str){
                console.log('Error: ' + xhr.responseCode);
            }
        });
    }

}

let globalModule = {
    init: function () {
        this.plusMinusCountItem();
        this.addDishToBag();
        this.headerBagBtnPrice();
    },
    plusMinusCountItem: function () {
        let that = this;
        jQuery(document).on('click', '[data-prev-number]', function () {
            var count = parseInt(jQuery(this).closest('.plus-minus-popup').find('[data-count-number]').text());
            var needed = (count === 0) ? 0 : (count - 1);

            var minNumver = jQuery(this).closest('.plus-minus-popup').find('.number').attr('data-minnumber');

            if (minNumver !== undefined) {
                if (needed <= minNumver) needed = minNumver;
            }

            jQuery(this).closest('.plus-minus-popup').find('[data-count-number]').text(needed);
            that.changePriceOnBagPage(needed, this);

            if (jQuery(document).find('.single-program-levels')[0]) {
                let priceDay = jQuery(this).closest('.levels-item').find('.price-day span').text();
                jQuery(this).closest('.levels-item').find('.suma span').text(needed*priceDay);
            }
        });
        jQuery(document).on('click', '[data-next-number]', function () {
            var count = parseInt(jQuery(this).closest('.plus-minus-popup').find('[data-count-number]').text());
            var needed = count + 1;

            var maxNumver = jQuery(this).closest('.plus-minus-popup').find('.number').attr('data-maxnumber');

            if (maxNumver !== undefined) {
                if (needed >= maxNumver) needed = maxNumver;
            }

            jQuery(this).closest('.plus-minus-popup').find('[data-count-number]').text(needed);
            that.changePriceOnBagPage(needed, this);

            if (jQuery(document).find('.single-program-levels')[0]) {
                let priceDay = jQuery(this).closest('.levels-item').find('.price-day span').text();
                jQuery(this).closest('.levels-item').find('.suma span').text(needed*priceDay);
            }
        });
    },
    changePriceOnBagPage: function (count, that) {
        let thatthat = this;
        if (jQuery('.bag-page')[0]) {
            let $price = jQuery(that).closest('.bag-dish-item').attr('data-dish-price');
            let $sum = parseInt(count)*parseInt($price);
            jQuery(that).closest('.bag-dish-item').find('.dish-price span').text($sum);

            thatthat.changeAllSumPrice();
        }

    },
    changeAllSumPrice: function() {
        if (jQuery('.sumprice')[0]) {
            let sum = 0;
            jQuery(document).find('.dish-price').each(function () {
                sum += parseInt(jQuery(this).find('span').text());
            });
            jQuery('.sumprice span').text(sum);
        }
    },
    addDishToBag: function () {
        let that = this;
        jQuery(document).on('click', '.addToBag', function (e) {
            e.preventDefault();

            if (jQuery(document).find('.single-program-levels')[0]) {
                let $parent = jQuery(document).find(this).closest('.levels-item');
                let dishId = jQuery($parent).attr('data-dishId');
                let countNumb = jQuery($parent).find('.count .number').text();

                let $product = {
                    id:dishId,
                    count: countNumb,
                    price: jQuery($parent).find('.price-day span').text()
                };
                if (dishId) that.addUpdateShopBagCookie($product);

            } else {
                let $parent = jQuery(document).find(this).closest('.dish-item');
                let dishId = jQuery($parent).attr('data-dishId');
                let countNumb;
                if (jQuery($parent).find('[data-count-number]').text() !== '' && jQuery($parent).find('[data-count-number]').text() !== '0') {
                    countNumb = parseInt(jQuery($parent).find('[data-count-number]').text());
                } else {
                    countNumb = 1;
                }

                let $product = {
                    id:dishId,
                    count: countNumb,
                    price: jQuery($parent).find('.dish-price span').text()
                };
                if (dishId) that.addUpdateShopBagCookie($product);
            }
        });
    },
    headerBagBtnPrice: function () {
        if (!jQuery('nav .nav-mybag span')[0] || !getCookie('vkusShop')) return ;
        if (typeof JSON.parse(getCookie('vkusShop')) === 'object') {
            let priceAll = 0;
            JSON.parse(getCookie('vkusShop')).map(function (item) {
                priceAll += parseInt(item.count)*parseInt(item.price);
            });
            if (priceAll !== 0) jQuery('nav .nav-mybag span').text(priceAll);
        }
    },
    addUpdateShopBagCookie: function ($obj) {
        let that = this;
        if (typeof $obj !== 'object') return ;
        if (getCookie('vkusShop')) {
            if (typeof JSON.parse(getCookie('vkusShop')) === 'object') {
                let res = JSON.parse(getCookie('vkusShop'));
                let $exist = false;
                res.map(function (item) {
                    if (item.id === $obj.id ) {
                        item.count +=  $obj.count;
                        $exist = true;
                    }
                });
                if ($exist === false) res.push($obj);
                $jsonRes = JSON.stringify(res);
                setCookie('vkusShop', $jsonRes);
            }
        } else {
            if (typeof $obj === 'object') {
                let res = [$obj];
                $jsonRes = JSON.stringify(res);
                setCookie('vkusShop', $jsonRes);
            }
        }
        jQuery('body').append(that.getPopupAddedToBag());
        jQuery('#modalDishContainer').modal('hide');
        jQuery('#modalAddedToBag').modal();
        that.headerBagBtnPrice();
        jQuery(document).on('hide.bs.modal', '#modalAddedToBag', function (e) {
            jQuery('#modalAddedToBag').remove();
        })
        setTimeout(function () {
            jQuery('#modalAddedToBag').modal('hide');
        }, 1000)
    },
    getPopupAddedToBag: function () {
        $html = `
            <div class="dish-popup-section modal fade" id="modalAddedToBag" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="card">
                        <!-- Close -->
                        <button type="button" class="modal-close close text-white" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">
                                <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M31.0054 10.9844L29.5046 9.48359L20.5 18.4882L11.4954 9.48359L9.99461 10.9844L18.9992 19.989L9.99409 28.9941L11.4949 30.4949L20.5 21.4898L29.5051 30.4949L31.0059 28.9941L22.0008 19.989L31.0054 10.9844Z" fill="white"/>
                                </svg>
                            </span>
                        </button>
                        </div>
                        <div class="card-body">
                            <h3>Товар добавлен в корзину!</h3>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return $html;
    }
};

let bagPageModule = {
    init: function () {
        this.bagForm();
        this.removeFromBag();
    },
    bagForm: function () {
        if (jQuery(document).find('form')[0]) {
            jQuery('form .form-field-style').on('focus', function () {
                jQuery('form').find('.form-field-style').each(function (index) {
                    if (jQuery(this).val() === '') jQuery(this).closest('.form-field').removeClass('with-text');
                });
                jQuery(this).closest('.form-field').addClass('with-text');
            });
        }
    },
    removeFromBag: function () {
        if (jQuery('.remove-from-bag')[0]) {
            jQuery('.remove-from-bag').on('click', function () {
                jQuery(this).closest('.bag-dish-item').remove();
                globalModule.changeAllSumPrice();
            });
        }
    }
};

let homePageModule = {
    init: function () {
        this.owlSliderHome();
        this.homeSecondMenuFixed();
        this.homePgeTabsForMenuChange();
        this.homeAjaxModal();
        this.homeSecondMenuClick();
        this.homeModalSlider();
    },
    homeModalSlider: function() {
        if (!jQuery(document).find('.dishcard-img-slider-style')[0]) return;
        jQuery(document).find('.dishcard-img-slider-style').owlCarousel({
            loop:false,
            margin:0,
            responsiveClass:true,
            items:1,
            nav:true,
            pagination: true,
            nestedItemSelector: 'item-slide'
        })
    },
    owlSliderHome: function () {
        if (!jQuery('.owlHomePageCarusel')[0]) return;
        jQuery('.owlHomePageCarusel').owlCarousel({
            loop:false,
            margin:0,
            responsiveClass:true,
            items:1,
            nav:false,
            pagination: true,
            nestedItemSelector: 'owl-home-slide'
        })
    },
    homeSecondMenuFixed: function() {
        if (!jQuery('.home-subnav')[0]) return;
        var secondNav = jQuery('.home-subnav');
        var offset = secondNav.offset();
        var secondNavTop = offset.top;
        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() >= secondNavTop) {
                secondNav.addClass('fixed-top');
            } else {
                secondNav.removeClass('fixed-top');
            }
        });
    },
    homeSecondMenuClick: function() {
        if (jQuery('.home-subnav')[0]) {
            jQuery('.home-subnav').on('click', 'a', function (e) {
                e.preventDefault();
                jQuery('html, body').animate({
                    scrollTop: jQuery(jQuery.attr(this, 'href')).offset().top - 110
                }, 500);
            });
        }
        // if (jQuery('.home-meni-item')[0]) {
        //     jQuery('.home-meni-item').on('click', 'a', function (e) {
        //         e.preventDefault();
        //         jQuery('html, body').animate({
        //             scrollTop: jQuery(jQuery.attr(this, 'href')).offset().top - 110
        //         }, 500);
        //     });
        // }
    },
    homePgeTabsForMenuChange: function() {
        let that = this;
        if (!jQuery('.home-page-menu-tabs')) return ;

        jQuery('.home-page-menu-tabs').on('click', 'li', function (e) {
            e.preventDefault();

            jQuery(this).closest('ul').find('li').removeClass('active');
            jQuery(this).addClass('active');

            var url = '/wp-json/v2/dishes-menu/';
            url += jQuery(this).attr('data-date');

            jQuery.get(url).done(function(data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var $item = data[key];
                        jQuery(`[data-${key}]`).find('.dishes-list-section .dish-item').remove();
                        for (var k in $item) {
                            var el = $item[k];
                            $classBlock = 'w-4';
                            if (key === 'biznes_lanch') {
                                $classBlock = 'w-2 left-img d-flex flex-xl-row flex-column';
                            }
                            else {
                                let lang = $item.length;
                                if (lang === 2) {
                                    $classBlock = 'w-2';
                                } else if (lang === 3) {
                                    if (parseInt(k) === 0) {
                                        $classBlock = 'w-2';
                                    }
                                }
                            }
                            jQuery(`[data-${key}]`).find('.dishes-list-section').append(that.homeMenuBLockType(el.ID, el.post_content, el.dish_price, el.image, $classBlock));
                            checkIfImageLoaded(`[data-dish-code="${el.ID}"]`, '.card-img-top');
                        }
                    }
                }
            });

        });
    },
    homeMenuBLockType: function(ID, title, price, image, $class) {
        let imageblock;
        if (image && image !== '') {
            imageblock = `<img src="${image}">`;
        } else {
            imageblock = '';
        }
        let $html = `
        <div class="dish-item ${$class}" data-dishId="${ID}">
                        <div class="card-img-top" data-dish-code="${ID}">
                            <div class="slider-loader-null">
                                <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                            </div>
                            ${imageblock}
                        </div>
                        <div class="dish-item-body d-flex flex-row flex-wrap justify-content-between align-items-center align-content-between">
                            <div class="dish-text">${title}</div>
                            <div class="dish-price"><span>${price}</span><sup>грн</sup></div>
                            <a href="#" class="dish-btn addToBag">В корзину</a>
                        </div>
                    </div>
        `;
        return $html;
    },
    homeAjaxModal: function () {
        jQuery(document).on('click', '[data-dish-code]', function (e) {
            e.preventDefault();

            if (jQuery(e.target).is('a')) {
                return false;
            }
            //remove last modal
            jQuery('#modalDishContainer').remove();
            let url = 'wp-json/v2/dish/';
            url += jQuery(this).closest('[data-dish-code]').attr('data-dish-code');

            jQuery.get(url).done(function(data) {
                let getPopup = homePageDishPopupBlock(data);
                if (getPopup === false ) return ;
                jQuery('body').append(getPopup);
                if (jQuery(document).find('.dishcard-img-slider-init')[0]) {
                    jQuery(document).find('.dishcard-img-slider-init').owlCarousel({
                        loop:false,
                        margin:0,
                        responsiveClass:true,
                        items:1,
                        nav:true,
                        pagination: false,
                        nestedItemSelector: 'item-slide'
                    });
                }
                checkIfImageLoaded(`.card-img-top`, '.card');
                jQuery('#modalDishContainer').modal();
            });
        });

        jQuery(document).on('hide.bs.modal', '#modalDishContainer', function (e) {
            jQuery('#modalDishContainer').remove();
        })
    }
};

function popupFullScreenImage(src) {
    jQuery('<div>').css({
        background: 'RGBA(0,0,0,.5) url('+src+') no-repeat center',
        backgroundSize: 'contain',
        width:'100%', height:'100%',
        position:'fixed',
        zIndex:'10000',
        top:'0', left:'0',
        cursor: 'zoom-out'
    }).click(function(){
        jQuery(this).remove();
    }).appendTo('body');
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkIfImageLoaded($selector, $parentSelector) {
    if (jQuery(document).find(`${$selector}`)[0]) {
        jQuery(document).find(`${$selector} img`).on("load", function () {
            jQuery(this).closest($parentSelector).find('.slider-loader-null').remove();
        }).each(function () {
            if (this.complete) {
                jQuery(this).closest($parentSelector).find('.slider-loader-null').remove();
            }
        });
    }
}

function homePageDishPopupBlock(data) {
    if (!data.ID || !data) return false;

    let $img;
    if (!data.dish_images_slider || data.dish_images_slider === '') {
        $img = `
            <div class="dish-popup-section dishcard-img-slider-style card-img-top">
                <div class="slider-loader-null">
                    <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                <img class="item" src="${data.image}" >
            </div>
        `;
    } else {

        let $items ='';
        for (var imgk in data.dish_images_slider) {
            $items += `<div class="item-slide"><img class="item" src="${data.dish_images_slider[imgk]}" >
</div>`;
        }

        $img = `
            <div class="dishcard-img-slider-init dishcard-img-slider-style card-img-top owl-carousel owl-custom-nav">
                    <div class="slider-loader-null">
                        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                    <div class="item-slide-cintainer">${$items}</div>             
                </div>
        `;
    }

    let sostav = data.dish_sostav ? `<p>Состав:</p> ${data.dish_sostav}` : '';
    let $kkal = '';
    if (data.dish_kkal) {
        $kkal = '<ul class="d-flex flex-wrap flex-row justify-content-between">';
        data.dish_kkal.map(function (val) {
            $kkal += `<li class="d-flex flex-wrap flex-row justify-content-between"><span>${val.name}</span><span class="dots flex-fill"></span><span>${val.count}</span></li>`;
        });
        $kkal += '</ul>';
    }
    let vitamins = data.dish_vitamins ? `<p>Витамины: ${data.dish_vitamins}</p>` : '';
    let kalor = '';
    if (vitamins !== '' || $kkal !== '') {
        kalor = `<div class="dishpopup-info-kalor">${$kkal}${vitamins}</div>`;
    }
    let $html = `
<section class="dish-popup-section modal fade" id="modalDishContainer" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered dish-item" role="document" data-dishId="${data.ID}">
        <div class="modal-content" >
            <div class="card">

                <!-- Close -->
                <button type="button" class="modal-close close text-white" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">
                        <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M31.0054 10.9844L29.5046 9.48359L20.5 18.4882L11.4954 9.48359L9.99461 10.9844L18.9992 19.989L9.99409 28.9941L11.4949 30.4949L20.5 21.4898L29.5051 30.4949L31.0059 28.9941L22.0008 19.989L31.0054 10.9844Z" fill="white"/>
                        </svg>
                    </span>
                </button>

                ${$img}

                <!-- Body -->
                <div class="card-body">
                    <div class="popup-full-screen-image" onclick="popupFullScreenImage(jQuery('.dishcard-img-slider-init .owl-item.active .item-slide img').attr('src'));">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.6">
                                    <path d="M0.673843 5.84868C1.04607 5.84868 1.34769 5.54698 1.34769 5.17483V2.30175L5.68769 6.64085C5.81931 6.77238 5.99172 6.83815 6.16414 6.83815C6.33664 6.83815 6.50915 6.77238 6.64068 6.64076C6.90384 6.3776 6.90384 5.95092 6.64059 5.68785L2.30041 1.34866H5.17413C5.54627 1.34866 5.84797 1.04696 5.84797 0.67482C5.84797 0.302679 5.54636 0.000976562 5.17413 0.000976562H0.673843C0.301612 0.000976562 0 0.302679 0 0.67482V5.17492C0 5.54698 0.301612 5.84868 0.673843 5.84868Z" fill="white"/>
                                    <path d="M18.6745 13.4999C18.3023 13.4999 18.0007 13.8016 18.0007 14.1738V17.0469L13.5271 12.5733C13.2638 12.3102 12.8372 12.3102 12.5741 12.5733C12.3109 12.8365 12.3109 13.2632 12.5741 13.5262L17.0476 17.9998H14.1746C13.8024 17.9998 13.5007 18.3015 13.5007 18.6736C13.5007 19.0457 13.8024 19.3474 14.1746 19.3474H18.6746C19.0468 19.3474 19.3484 19.0457 19.3484 18.6736V14.1738C19.3484 13.8016 19.0467 13.4999 18.6745 13.4999Z" fill="white"/>
                                    <path d="M5.82132 12.5734L1.34817 17.0469V14.1738C1.34817 13.8016 1.04656 13.4999 0.674331 13.4999C0.3021 13.4999 0.000488281 13.8016 0.000488281 14.1738V18.6738C0.000488281 19.0459 0.3021 19.3476 0.674331 19.3476H5.17417C5.54631 19.3476 5.84801 19.0459 5.84801 18.6738C5.84801 18.3017 5.5464 18 5.17417 18H2.30108L6.77432 13.5263C7.03748 13.2631 7.03748 12.8364 6.77423 12.5733C6.51125 12.3102 6.08457 12.3102 5.82132 12.5734Z" fill="white"/>
                                    <path d="M18.6746 0H14.1745C13.8023 0 13.5007 0.301702 13.5007 0.673843C13.5007 1.04598 13.8023 1.34769 14.1745 1.34769H17.0477L12.7083 5.68733C12.4452 5.95048 12.4452 6.37716 12.7084 6.64032C12.84 6.77185 13.0125 6.83762 13.1849 6.83762C13.3573 6.83762 13.5298 6.77176 13.6614 6.64023L18.0008 2.30059V5.17386C18.0008 5.546 18.3024 5.8477 18.6746 5.8477C19.0469 5.8477 19.3485 5.546 19.3485 5.17386V0.673843C19.3484 0.301612 19.0467 0 18.6746 0Z" fill="white"/>
                                </g>
                            </svg>
                           
                        </div>
                    <div>
                        <p>Вес ${data.dish_mass}г</p>
                    </div>
                    <!-- Heading -->
                   <h3>
                       ${data.post_content}
                   </h3>

                    <div class="d-flex flex-wrap flex-sm-row flex-column justify-content-between align-items-center mb-5">
                        <div class="d-flex flex-wrap flex-row justify-content-between align-items-center plus-minus-popup mb-5 mb-sm-0">
                            <div data-next-number class="next-number">
                                <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 39C30.2696 39 39 30.2696 39 19.5C39 8.73045 30.2696 0 19.5 0C8.73045 0 0 8.73045 0 19.5C0 30.2696 8.73045 39 19.5 39Z" fill="#F8F8F8"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1538 11H18.8462V18.8462H11V20.1538H18.8462V28H20.1538V20.1538H28V18.8462H20.1538V11Z" fill="#70D44B"/>
                                </svg>
                            </div>
                            <div data-count-number class="number h3">1</div>
                            <div data-prev-number class="prev-number">
                                <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 39C30.2696 39 39 30.2696 39 19.5C39 8.73045 30.2696 0 19.5 0C8.73045 0 0 8.73045 0 19.5C0 30.2696 8.73045 39 19.5 39Z" fill="#F8F8F8"/>
                                    <path d="M28 19V20.3077H11V19H28Z" fill="#70D44B"/>
                                </svg>
                            </div>
                        </div>
                        <div class="d-flex flex-wrap flex-column flex-sm-row justify-content-between align-items-center price-block">
                            <div class="dish-price mb-5 mb-sm-0"><span>${data.dish_price}</span><sup>грн</sup></div>
                            <a href="#" class="dish-btn dish-btn-modal btn-green addToBag">В корзину</a>
                        </div>
                    </div>

                    <div class="d-flex flex-wrap flex-row justify-content-between align-items-start">
                        <div class="dishpopup-info-sostav">
                            ${sostav}
                        </div>
                           ${kalor}
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>
`;
    return $html;
}
