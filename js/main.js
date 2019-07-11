'use strict';

/* 0. Initialization */
// Get height on Window resized
$(window).on('resize', function () {
    var slideHeight = $('.slick-track').innerHeight();
    return false;
});

// Show / hide menu
var menuItems = $('.page-menu');
var menuIcon = $('.menu-icon');
menuIcon.on('click', function () {
    if (menuIcon.hasClass('menu-visible')) {
        menuIcon.removeClass('menu-visible');
    } else {
        menuIcon.addClass('menu-visible');
    }
    if (menuItems.hasClass('menu-visible')) {
        menuItems.removeClass('menu-visible');
    } else {
        menuItems.addClass('menu-visible');
    }
    setTimeout(hideMenu, 10000);
});

var hideMenu = function () {
    if (menuItems.hasClass('menu-visible')) {
        menuIcon.removeClass('menu-visible');
        menuItems.removeClass('menu-visible');
    }
    return true;
};

$(".page-main").on('click', hideMenu);
// Smooth scroll <a> links
var $root = $('html, body');
$('a.s-scroll').on('click', function () {
    var href = $.attr(this, 'href');
    $root.animate({
        scrollTop: $(href).offset().top
    }, 500, function () {
        window.location.hash = href;
    });
    return false;
});


// Scroll to next/previous section
$('.p-footer a.down').on('click', function () {
    $.fn.fullpage.moveSectionDown();
});
$('.p-footer a.up').on('click', function () {
    $.fn.fullpage.moveSectionUp();
});

/* 1. Clock attribute */

var dateReadableText = 'Upcoming date';
if ($('.site-config').attr('data-date-readable') && ($('.site-config').attr('data-date-readable') != '')) {
    $('.timeout-day').text('');
    dateReadableText = $('.site-config').attr('data-date-readable');
    $('.timeout-day').text(dateReadableText);
}
try {
    // check if clock is initialised
    $('.clock-countdown').downCount({
        date: $('.site-config').attr('data-date'),
        offset: +10
    }, function () {
        //callback here if finished
        //alert('YES, done!');
        var zerodayText = 'An upcoming date';
        if ($('.site-config').attr('data-zeroday-text') && ($('.site-config').attr('data-zeroday-text') != '')) {
            $('.timeout-day').text('');
            zerodayText = $('.site-config').attr('data-zeroday-text');
        }
        $('.timeout-day').text(zerodayText);
    });
} catch (error) {
    // clockdisabled
    console.log("clock disabled");
}


/* 2. Background for page / section */

var background = '#ccc';
var backgroundMask = 'rgba(255,255,255,0.92)';
var backgroundVideoUrl = 'none';

/* Background image as data attribut */
var list = $('.bg-img');

for (var i = 0; i < list.length; i++) {
    var src = list[i].getAttribute('data-image-src');
    list[i].style.backgroundImage = "url('" + src + "')";
    list[i].style.backgroundRepeat = "no-repeat";
    list[i].style.backgroundPosition = "center";
    list[i].style.backgroundSize = "cover";
}

/* Background color as data attribut */
var list = $('.bg-color');
for (var i = 0; i < list.length; i++) {
    var src = list[i].getAttribute('data-bgcolor');
    list[i].style.backgroundColor = src;
}


/* Slide Background variables */
var isSlide = false;
var slideElem = $('.slide');
var arrowElem = $('.p-footer .arrow-d');
var pageElem = $('.section');

/* 3. Init all plugin on load */
$(document).ready(function () {
    /* Init console to avoid error */
    var method;
    var noop = function () {
    };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }

    /* Init Slidesow background */
    /* Background slide show Background variables  */
    var imageList = $('.slide-show .img');
    var imageSlides = [];
    for (var i = 0; i < imageList.length; i++) {
        var src = imageList[i].getAttribute('data-src');
        imageSlides.push({src: src});
    }
    $('.slide-show').vegas({
        delay: 5000,
        shuffle: false,
        slides: imageSlides,
        //transition: [ 'zoomOut', 'burn' ],
        //animation: [ 'kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight' ]
    });
    // Gallery slideshow
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        animateOut: 'fadeOut',
        autoplay: true,
        autoplayTimeout: 5000,
        items: 1,
        loop: true,
        navClass: ['owl-prev', 'owl-next'],
        margin: 0,
        lazyLoad: true,
        merge: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1 // In this configuration 1 is enabled from 0px up to 479px screen size
            }
        }
    });

    // Products/Projects/items slideshow
    var swiper = new Swiper('.items-slide', {
        pagination: '.items-pagination',
        paginationClickable: '.items-pagination',
        nextButton: '.items-button-next',
        prevButton: '.items-button-prev',
        grabCursor: true,
        slidesPerView: '4',
        centeredSlides: false,
        spaceBetween: 64,
        breakpoints: {
            1024: {
                slidesPerView: 3,
            },
            800: {
                slidesPerView: 3,
                spaceBetween: 32
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 32
            },
            440: {
                slidesPerView: 1,
                spaceBetween: 32
            }
        }
    });


    /* Init youtube video background */
    if (backgroundVideoUrl != 'none') {

        //disable video background for smallscreen
        if ($(window).width() > 640) {
            $.okvideo({
                source: backgroundVideoUrl,
                adproof: true
            });
        }
    }
    var pageSectionDivs = $('.fullpg .section');
    var pageSections = [];
    var pageAnchors = [];
    var slideCount = slideElem.length;
    var slideRightBtn = $('#moveSlideRight');
    var slideLeftBtn = $('#moveSlideLeft');
    var headerLogo = $('.header-top .logo');
    var bodySelector = $('body');
    var sectionSelector = $('.section');
    var scrollOverflow = true;
    var nextSectionDOM;
    var nextSection;
    for (var i = 0; i < pageSectionDivs.length; i++) {
        pageSections.push(pageSectionDivs[i]);
    }
    window.asyncEach(pageSections, function (pageSection, cb) {
        var anchor = pageSection.getAttribute('data-section');
        pageAnchors.push(anchor + "");
        cb();
    }, function (err) {
        /** Init fullpage.js for main page index.html */
        if ($('#mainpage').height()) {
            if ($(window).width() < 601) {
                scrollOverflow = false;
            }
            // config fullpage.js
            $('#mainpage').fullpage({
                menu: '.qmenu',
                //			anchors: ['register', 'about-us', 'contact', 'message'],
                anchors: pageAnchors,
                verticalCentered: true,
                responsiveWidth: 601,
                scrollOverflow: scrollOverflow,
                css3: true,
                navigation: true,
                onLeave: function (index, nextIndex, direction) {
                    arrowElem.addClass('gone');
                    pageElem.addClass('transition');
                    slideElem.removeClass('transition');
                    isSlide = false;
                    arrowElem.removeClass('gone');
                    pageElem.removeClass('transition');

                    /*if(nextIndex === 1){
                        headerLogo.addClass('dark-bg');
                    }*/
                    nextSectionDOM = sectionSelector[(nextIndex - 1)];
                    nextSection = $(nextSectionDOM);
                    if (nextSection.hasClass('dark-bg')) {
                        bodySelector.addClass('dark-section');
                        headerLogo.addClass('dark-bg');
                    } else {
                        bodySelector.removeClass('dark-section');
                        headerLogo.removeClass('dark-bg');
                    }
                },
                afterLoad: function (anchorLink, index) {

                    // manage dark bg for active section
                    if ($('.section.active').hasClass('dark-bg')) {
                        bodySelector.addClass('dark-section');
                        headerLogo.addClass('dark-bg');
                    } else {
                        bodySelector.removeClass('dark-section');
                        headerLogo.removeClass('dark-bg');
                    }
                },

                afterRender: function () {

                }
            });

            /* Init video background */
            $('.video-container video, .video-container object').maximage('maxcover');
        }

        $('#fp-nav').css("margin-top", 0);

        /** Init fullpage.js for item detail items.html */
        if ($('#itemdetail-page').height()) {
            scrollOverflow = false;
            if ($(window).width() < 802) {
                scrollOverflow = true;
            }
            $('#itemdetail-page').fullpage({
                menu: '.qmenu',
                anchors: ['detail'],
                verticalCentered: false,
                scrollOverflow: scrollOverflow,
                css3: false,
                slidesNavigation: false,
                controlArrows: false,
                loopHorizontal: false,
                navigation: false,
                responsiveWidth: 802,
                onLeave: function (index, nextIndex, direction) {
                    arrowElem.addClass('gone');
                    pageElem.addClass('transition');
                    slideElem.removeClass('transition');
                    isSlide = false;
                },
                afterLoad: function (anchorLink, index) {
                    arrowElem.removeClass('gone');
                    pageElem.removeClass('transition');
                    if (isSlide) {
                        slideElem.removeClass('transition');
                    }
                },

                afterRender: function () {
                    // init simscroll to adjust content height for large screen
                    if ($(window).width() > 803) {
                        var parentPane = $('.page-item-detail .section .content .c-pane');
                        $('.page-item-detail .section .content .c-pane .c-content').slimScroll({
                            color: '#000',
                            size: '6px',
                            height: parentPane.height(),
                            alwaysVisible: true,
                        });
                    }
                },
                afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
                    // hide, or show navigation arrow
                    if (slideIndex === (slideCount - 1)) {
                        slideRightBtn.addClass('gone');
                    } else {
                        slideRightBtn.removeClass('gone');
                    }
                    if (slideIndex === 0) {
                        slideLeftBtn.addClass('gone');
                    } else {
                        slideLeftBtn.removeClass('gone');
                    }
                }
            });
            slideRightBtn.on('click', function () {
                // Slide to right
                $.fn.fullpage.moveSlideRight();
                return false;
            });

            slideLeftBtn.on('click', function () {
                // Slide to left
                $.fn.fullpage.moveSlideLeft();
                return false;
            });
        }


    });


});


// Page Loader : hide loader when all are loaded
$(window).load(function () {
    $('#page-loader').addClass('p-hidden');
    $('.section').addClass('anim');
});

// Email validation text, uncomment below to use them
/*
// Email registration 
var email_reg_elem = document.getElementById("reg-email");
email_reg_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This email field cannot be left blank");
	}
};
email_reg_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
// email message
var email_message_elem = document.getElementById("mes-email");
email_message_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This email field cannot be left blank");
	}
};
// name message
email_message_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
var name_message_elem = document.getElementById("mes-name");
name_message_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This name field cannot be left blank");
	}
};
// text message
name_message_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
var text_message_elem = document.getElementById("mes-text");
text_message_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This text field cannot be left blank");
	}
};
text_message_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
*/

//send contact email
function send() {
    document.getElementById('form').action = "mailto:contact@braytonglobal.com?subject="
        + document.getElementById('subject').value
        + "&body=" + document.getElementById("mail-body").value;
}

//display modal
function addExpand(name) {
    document.querySelector('.modal-'+name).classList.add('expand');
    document.querySelector('.modal-background-'+name).classList.add('expand');
    document.querySelector('#fp-nav').classList.add('back');
    document.querySelector('.site-footer').classList.add('back');
    document.querySelector('.header-top').classList.add('header-back');
    $.fn.fullpage.setAllowScrolling(false);
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';

}

function removeExpand(name) {
    document.querySelector('.modal-'+name).classList.remove('expand');
    document.querySelector('.modal-background-'+name).classList.remove('expand');
    document.querySelector('#fp-nav').classList.remove('back');
    document.querySelector('.site-footer').classList.remove('back');
    document.querySelector('.header-top').classList.remove('header-back');
    event.stopPropagation();
    $.fn.fullpage.setAllowScrolling(true);
}


//send contact email
function send() {
    document.getElementById('form').action = "mailto:contact@braytonglobal.com?subject="
        + document.getElementById('subject').value
        + "&body=" + document.getElementById("mail-body").value;
}

//show column content
function showAndHide(id) {
    if(id === "philosophy") {
        showContent("philosophy");
        hideContent("team");
    }
    else if(id === "team") {
        showContent("team");
        hideContent("philosophy");
    }
}

function showContent(id) {
    document.querySelector('#down-'+id).classList.add('invisible');
    document.querySelector('#down-'+id).classList.remove('visible');
    document.querySelector('.'+id).classList.add('visible');
    document.querySelector('.'+id).classList.remove('invisible');
    setTimeout(function() { document.querySelector('#'+id).classList.remove('invisible-column');
        document.querySelector('#'+id).classList.add('visible-column');}, 10);
}

function hideContent(id) {
    document.querySelector('#down-'+id).classList.add('visible');
    document.querySelector('#down-'+id).classList.remove('invisible');
    document.querySelector('#'+id).classList.add('invisible-column');
    document.querySelector('#'+id).classList.remove('visible-column');
    // setTimeout((function() {document.querySelector('.'+id).classList.remove('visible');
    //     document.querySelector('.'+id).classList.add('invisible');}), 1000)
    document.querySelector('.'+id).classList.remove('visible');
    document.querySelector('.'+id).classList.add('invisible');

}


//change footer background
function changeFooterBg() {
    if (window.location.hash === '#home' || window.location.hash === '#contact' || window.location.hash === "") {
        document.querySelector('.site-footer').style.backgroundColor = 'transparent';
    } else {
        document.querySelector('.site-footer').style.backgroundColor = '#19242F';
    }
}

changeFooterBg();
window.onhashchange = function () {
    changeFooterBg();
}