(function ($) {
  "use strict";

  // =========================
  // Spinner
  // =========================
  function spinner() {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  }
  spinner();

  // =========================
  // WOW Animation
  // =========================
  if (typeof WOW === "function") {
    new WOW().init();
  }

  // =========================
  // Navbar + Back To Top (Combined Scroll)
  // =========================
  $(window).on("scroll", function () {
    const scrollTop = $(this).scrollTop();

    // Navbar
    if (scrollTop > 300) {
      $(".navbar").fadeIn("slow").css("display", "flex");
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".navbar").fadeOut("slow").css("display", "none");
      $(".back-to-top").fadeOut("slow");
    }
  });

  // =========================
  // Smooth Scrolling
  // =========================
  $(".navbar-nav a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      const target = $(this.hash);
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 45,
          },
          1500,
          "easeInOutExpo",
        );
      }

      $(".navbar-nav .active").removeClass("active");
      $(this).addClass("active");
    }
  });

  // =========================
  // Back To Top Click
  // =========================
  $(".back-to-top").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo",
    );
    return false;
  });

  // =========================
  // Typed.js
  // =========================
  if ($(".typed-text-output").length && typeof Typed !== "undefined") {
    const typed_strings = $(".typed-text").text();

    new Typed(".typed-text-output", {
      strings: typed_strings.split(","),
      typeSpeed: 100,
      backSpeed: 20,
      smartBackspace: false,
      loop: true,
    });
  }

  // =========================
  // Modal Video
  // =========================
  let videoSrc = "";

  $(".btn-play").on("click", function () {
    videoSrc = $(this).data("src");
  });

  $("#videoModal").on("shown.bs.modal", function () {
    if (videoSrc) {
      $("#video").attr(
        "src",
        videoSrc + "?autoplay=1&modestbranding=1&showinfo=0",
      );
    }
  });

  $("#videoModal").on("hide.bs.modal", function () {
    $("#video").attr("src", videoSrc);
  });

  // =========================
  // Counter Up
  // =========================
  if ($.fn.counterUp) {
    $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 2000,
    });
  }

  // =========================
  // Skills Progress Animation
  // =========================
  if ($.fn.waypoint) {
    $(".skill").waypoint(
      function () {
        $(".progress .progress-bar").each(function () {
          $(this).css("width", $(this).attr("aria-valuenow") + "%");
        });
      },
      {
        offset: "80%",
      },
    );
  }

  // =========================
  // Testimonials Carousel
  // =========================
  if ($.fn.owlCarousel) {
    $(".testimonial-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      items: 1,
      dots: true,
      loop: true,
    });
  }

  // =========================
  // Portfolio Isotope
  // =========================
  const $portfolioContainer = $(".portfolio-container");

  if ($portfolioContainer.length && $.fn.isotope) {
    $portfolioContainer.imagesLoaded(function () {
      $portfolioContainer.isotope({
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });
    });

    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("active");
      $(this).addClass("active");

      $portfolioContainer.isotope({
        filter: $(this).data("filter"),
      });
    });
  }
})(jQuery);

// =========================
// Theme Toggle
// =========================
(function () {
  const toggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const root = document.documentElement;

  if (!toggleBtn || !themeIcon) return;

  // System preference
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.classList.add("dark-theme");
    themeIcon.className = "bi bi-moon";
  }

  toggleBtn.addEventListener("click", () => {
    root.classList.toggle("dark-theme");
    themeIcon.className = root.classList.contains("dark-theme")
      ? "bi bi-moon"
      : "bi bi-sun";
  });
})();

// =========================
// Theme Image Switch
// =========================
(function () {
  function updateThemeImages() {
    const isDark = document.documentElement.classList.contains("dark-theme");

    document.querySelectorAll(".theme-img").forEach((img) => {
      const newSrc = isDark ? img.dataset.dark : img.dataset.light;
      if (newSrc && img.src !== newSrc) {
        img.src = newSrc;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", updateThemeImages);

  const observer = new MutationObserver(updateThemeImages);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
})();

// =========================
// Collapse Buttons
// =========================
document.querySelectorAll(".collapse-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.toggle("open");
  });
});


document.getElementById("download-resume").addEventListener("click", function (e) {

    e.preventDefault();

    // Create timestamp
    const now = new Date();
    const timestamp =
        now.getFullYear() +
        String(now.getMonth() + 1).padStart(2, '0') +
        String(now.getDate()).padStart(2, '0') + "_" +
        String(now.getHours()).padStart(2, '0') +
        String(now.getMinutes()).padStart(2, '0');

    const filename = `Divyani_Resume_${timestamp}.pdf`;

    // Create temporary link
    const link = document.createElement("a");
    link.href = "./resume/Resume-V2.pdf";
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});