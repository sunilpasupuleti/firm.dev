$(document).ready(() => {
  AOS.init({
    duration: 2000,
    once: true,
  });

  $(".nav__logo img").css("transform", "rotate(270deg)");

  setTimeout(() => {
    $(".nav__logo img").css("transform", "rotate(0deg)");
  }, 2000);

  const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

  document.addEventListener("scroll", () => {
    $(".nav__logo img").css("transform", "rotate(0deg)");
  });

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      $(".nav__logo img").css("transform", "rotate(0deg)");
      // $(".nav__logo img").css("transform", "rotate(270deg)");
      // setTimeout(() => {
      navMenu.classList.add("show-menu");
      // }, 1000);
    });
  }

  if (navClose) {
    navClose.addEventListener("click", () => {
      // $(".nav__logo img").css("transform", "rotate(0deg)");

      navMenu.classList.remove("show-menu");
      $(".nav__logo img").css("transform", "rotate(270deg)");

      // navMenu.classList.remove("show-menu");
    });
  }

  const navLink = document.querySelectorAll(".nav__link");

  function linkAction() {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show-menu");
  }

  navLink.forEach((n) => n.addEventListener("click", linkAction));

  // change theme

  const themeButton = document.getElementById("theme-button");

  let presentTheme = "light";
  themeButton.addEventListener("click", () => {
    if (presentTheme === "light") {
      presentTheme = "dark";
      $(".nav__logo img").attr("src", "assets/images/logo_white.svg");
    } else {
      presentTheme = "light";
      $(".nav__logo img").attr("src", "assets/images/logo_black.svg");
    }
    document.body.classList.toggle("dark-theme");
    themeButton.classList.toggle("uil-sun");
  });

  // hovering on what we do

  $(".wedo__hover__content").hide();

  $(".wedo__titles").hover(
    function (e) {
      let width = $(window).width();
      if (width > 768) {
        $(this).parent().find(".wedo__hover__content").fadeIn();
      }
    },
    function (e) {
      let width = $(window).width();
      if (width > 768) {
        $(this).parent().find(".wedo__hover__content").fadeOut();
      }
    }
  );

  // for smaller screen show and hide on click
  $(".wedo__titles").click(function (e) {
    let width = $(window).width();
    if (width < 768) {
      $(this).toggle();
      $(this).parent().find(".round__line").toggle();
      $(this).parent().find(".wedo__hover__content").toggle();
      $(this).parent().css({ display: "block" });
    }
  });

  $(".wedo__hover__content").click(function (e) {
    let width = $(window).width();
    if (width < 768) {
      $(this).toggle();
      $(this).parent().find(".round__line").toggle();
      $(this).parent().find(".wedo__titles").toggle();
      $(this).parent().css({ display: "grid" });
    }
  });

  // hover on image
  $(".build__images img").hover(
    function (e) {
      let mainImageClass = ".build__images .grid__2 .first img";

      let mainImageSrc = $(mainImageClass).attr("src");
      let changedImageSrc = $(this).attr("src");
      $(this).attr("src", mainImageSrc);
      $(mainImageClass).attr("src", changedImageSrc);
      // add css to mainImage
      $(mainImageClass).css({
        transform: "scale(1.05)",
        transition: "1s",
        filter: "none",
      });

      $(".build__images .grid__2 .second").css({
        transform: "scale(0.9)",
        transition: "1s",
      });
    },
    function (e) {
      let mainImageClass = ".build__images .grid__2 .first img";
      $(mainImageClass).css({
        transform: "scale(1)",
        filter: "grayscale(100%)",
      });
      $(".build__images .grid__2 .second").css({
        transform: "scale(1)",
      });
    }
  );

  // for faqs
  const faq = $(".faq"),
    faqQuestion = $(".faq__question");
  faq.each(function (e) {
    $(this).click(function (ce) {
      $(this).attr("class", "faq faq__close");
      $(this).find(".faq__answer").slideToggle();
    });
  });
});
