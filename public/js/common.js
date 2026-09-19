AOS.init({ startEvent: "load" });
window.addEventListener("load", AOS.refresh);

// menu
$(".header__menu").click(function () {
  $(this).toggleClass("active");
  $(".header__nav").toggleClass("active");
});

// Hero video swiper
(function () {
  var heroVideoMuted = false;
  var heroVideoSwiper;

  function getActiveVideo() {
    var slide = document.querySelector(".hero-video-swiper .swiper-slide-active");
    return slide ? slide.querySelector("video") : null;
  }

  function stopAllVideos() {
    document.querySelectorAll(".hero-video-swiper video").forEach(function (v) {
      v.pause();
      v.currentTime = 0;
      v.muted = true;
      v.onended = null;
    });
  }

  function updateMuteBtn() {
    var iconMuted = document.querySelector(".hero-video-mute .icon-muted");
    var iconUnmuted = document.querySelector(".hero-video-mute .icon-unmuted");
    if (iconMuted) iconMuted.style.display = heroVideoMuted ? "" : "none";
    if (iconUnmuted) iconUnmuted.style.display = heroVideoMuted ? "none" : "";
  }

  function playActive() {
    stopAllVideos();
    var video = getActiveVideo();
    if (!video) return;
    video.muted = heroVideoMuted;
    var p = video.play();
    if (p !== undefined) {
      p.catch(function () {
        video.muted = true;
        heroVideoMuted = true;
        updateMuteBtn();
        video.play();
      });
    }
    video.onended = function () {
      heroVideoSwiper.slideNext();
    };
  }

  heroVideoSwiper = new Swiper(".hero-video-swiper", {
    loop: true,
    allowTouchMove: true,
    pagination: {
      el: ".hero-video-pagination",
      clickable: true,
    },
    on: {
      slideChangeTransitionEnd: function () {
        playActive();
      },
    },
  });

  playActive();

  var muteBtn = document.querySelector(".hero-video-mute");
  if (muteBtn) {
    muteBtn.addEventListener("click", function () {
      heroVideoMuted = !heroVideoMuted;
      updateMuteBtn();
      var video = getActiveVideo();
      if (video) video.muted = heroVideoMuted;
    });
  }
})();

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
    $(this)
      .parents(".tool-tab")
      .find(".nav-tabs")
      .slideToggle(300)
      .css("display", "flex");
  }
});
$(".tool-tab .nav-link").click(function () {
  if ($(window).width() < 992) {
    $(this).parents(".nav-tabs").slideUp(300);
    let text = $(this).text();
    $(".tool-tab-active>p").text(text);
  }
});

function updateCalculate() {
  let monthlyPrice = 0;
  $(".calculate-wrapper input").each(function () {
    if ($(this).is(":checked")) {
      let price = parseInt(
        $(this).parents(".calculate-checkbox").find(".price").text(),
      );
      monthlyPrice = monthlyPrice + price;
    }
  });
  $(".save-monthly").text(monthlyPrice);
  $(".save-yearly").text(monthlyPrice * 12);
}

$(".calculate-checkbox input").on("change", updateCalculate);
updateCalculate();

resize();
$(window).on("resize scroll", function () {
  resize();
});

// Masonry gallery
var $masonryGrid = $(".masonry-grid");
if ($masonryGrid.length) {
  $masonryGrid.imagesLoaded(function () {
    $masonryGrid.masonry({
      itemSelector: ".masonry-item",
      columnWidth: ".masonry-sizer",
      percentPosition: true,
      gutter: 12,
    });
  });
}

function resize() {
  // header
  if ($(window).scrollTop() > 0) {
    $(".header").addClass("scrolldown");
  } else {
    $(".header").removeClass("scrolldown");
  }
}