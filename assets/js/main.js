AOS.init({
  duration: 2000,
  once: false,
  mirror: true,
});

$(".nav__logo img").css("transform", "rotate(270deg)");

setTimeout(() => {
  $(".nav__logo img").css("transform", "rotate(0deg)");
}, 2000);

const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    $(".nav__logo img").css("transform", "rotate(270deg)");
    setTimeout(() => {
      navMenu.classList.add("show-menu");
    }, 1000);
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    $(".nav__logo img").css("transform", "rotate(0deg)");
    navMenu.classList.remove("show-menu");
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
    $(".nav__logo img").attr("src", "assets/images/logo_white.png");
  } else {
    presentTheme = "light";
    $(".nav__logo img").attr("src", "assets/images/logo_black.png");
  }
  document.body.classList.toggle("dark-theme");
  themeButton.classList.toggle("uil-sun");
});
