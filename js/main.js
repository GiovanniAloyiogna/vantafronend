/*  ---------------------------------------------------
  Template Name: DJoz
  Description:  DJoz Music HTML Template
  Author: Colorlib
  Author URI: https://colorlib.com
  Version: 1.0
  Created: Colorlib
---------------------------------------------------------  */

"use strict";

(function ($) {
  /*------------------
        Preloader
    --------------------*/
  $(window).on("load", function () {
    $(".loader").fadeOut();
    $("#preloder").delay(200).fadeOut("slow");
  });

  /*------------------
        Background Set
    --------------------*/
  $(".set-bg").each(function () {
    var bg = $(this).data("setbg");
    $(this).css("background-image", "url(" + bg + ")");
  });

  /*------------------
		Navigation
	--------------------*/
  $(".mobile-menu").slicknav({
    prependTo: "#mobile-menu-wrap",
    allowParentLinks: true,
  });

  /*--------------------------
        Event Slider
    ----------------------------*/
  $(".event__slider").owlCarousel({
    loop: true,
    margin: 0,
    items: 3,
    dots: false,
    nav: true,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>",
    ],
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
    responsive: {
      992: {
        items: 3,
      },
      768: {
        items: 2,
      },
      0: {
        items: 1,
      },
    },
  });

  /*--------------------------
        Videos Slider
    ----------------------------*/
  $(".videos__slider").owlCarousel({
    loop: true,
    margin: 0,
    items: 4,
    dots: false,
    nav: true,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>",
    ],
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
    responsive: {
      992: {
        items: 4,
      },
      768: {
        items: 3,
      },
      576: {
        items: 2,
      },
      0: {
        items: 1,
      },
    },
  });

  /*------------------
		Magnific
	--------------------*/
  $(".video-popup").magnificPopup({
    type: "iframe",
  });

  /*------------------
		Barfiller
	--------------------*/
  $("#bar1").barfiller({
    barColor: "#ffffff",
  });

  $("#bar2").barfiller({
    barColor: "#ffffff",
  });

  $("#bar3").barfiller({
    barColor: "#ffffff",
  });

  /*-------------------
		Nice Scroll
	--------------------- */
  $(".nice-scroll").niceScroll({
    cursorcolor: "#111111",
    cursorwidth: "5px",
    background: "#e1e1e1",
    cursorborder: "",
    autohidemode: false,
    horizrailenabled: false,
  });
  $(document).ready(function () {
  // Function to update the cart count in the header
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    $("#cart-count").text(`(${cart.length})`);
  }

  // Call the function to update cart count when the page loads
  updateCartCount();
});

})(jQuery);


