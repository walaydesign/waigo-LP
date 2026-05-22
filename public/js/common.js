// menu
$(".header__menu").click(function () {
  $(this).toggleClass("active");
  $(".header__nav").toggleClass("active");
});

var swiper = new Swiper(".gallery-swiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  slidesPerGroup: 3,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  speed: 1000,
  loop: true,
  breakpoints: {
    576: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
    992: {
      slidesPerView: 7,
      slidesPerGroup: 5,
    },
  },
});

$(".tool-tab-active").click(function () {
    if ($(window).width() < 992) {
        $(this).parents(".tool-tab").find(".nav-tabs").slideToggle(300).css("display","flex");
    }
});
$(".tool-tab .nav-link").click(function () {
    if ($(window).width() < 992) {
        $(this).parents(".nav-tabs").slideUp(300);
        let text = $(this).text();
        $(".tool-tab-active>p").text(text);
    }
});
