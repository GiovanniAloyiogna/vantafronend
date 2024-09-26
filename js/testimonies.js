$(document).ready(function () {
  $("#testimonial-slider").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000, // 5 seconds
    autoplayHoverPause: true,
    nav: true,
    dots: true,
   
    itemsDesktop: [1000, 1],
    itemsDesktopSmall: [979, 1],
    itemsTablet: [768, 1],
    pagination: true,
    transitionStyle: "backSlide",
   
  });
});
