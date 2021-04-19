const navigation = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav_link");
const frontNavLinks = document.querySelectorAll(".nav_link_front");
const logoBox = document.querySelector(".nav_logo");
const navTitle = document.querySelector(".nav_title");
const timeOpen = document.querySelector(".time");
const mobileFoot = document.querySelector("footer");

function hideTitle(e) {
  if (!timeOpen) return;
  if (
    window.pageYOffset > document.documentElement.clientHeight &&
    !navigation.classList.contains("open_navigation")
  ) {
    logoBox.classList.add("hide_logo");
    timeOpen.classList.add("hide_time");
    navTitle.classList.add("hide_title");
    navigation.classList.add("short_nav");
    for (let link of navLinks) {
      link.classList.add("short_link");
    }
    for (let link of frontNavLinks) {
      link.classList.add("hide_logo");
    }
    mobileFoot.classList.remove("hide_foot");
  } else {
    logoBox.classList.remove("hide_logo");
    timeOpen.classList.remove("hide_time");
    navTitle.classList.remove("hide_title");
    navigation.classList.remove("short_nav");
    for (let link of navLinks) {
      link.classList.remove("short_link");
    }
    for (let link of frontNavLinks) {
      link.classList.remove("hide_logo");
    }
    mobileFoot.classList.add("hide_foot");
  }
}

document.addEventListener("scroll", hideTitle);

const burgerButton = document.querySelector(".burger_container");

function openMenu(e) {
  highlightLink();
  if (navigation.classList.contains("short_nav")) {
    navigation.classList.remove("short_nav");
  }
  navigation.classList.toggle("open_navigation");
  burgerButton.classList.toggle("close_burger");
}

burgerButton.addEventListener("click", openMenu);

const topButton = document.querySelector(".to_top");

function moveToTop() {
  window.scrollTo(0, 0);
}

function showUpButton(e) {
  if (window.pageYOffset > document.documentElement.clientHeight) {
    topButton.style.transform = "scale(1)";
  } else {
    topButton.style.transform = "scale(0)";
  }
}

topButton.addEventListener("click", moveToTop);
document.addEventListener("scroll", showUpButton);

const downButton = document.querySelector(".logo_picture");

function moveDown() {
  window.scrollBy(0, document.documentElement.clientHeight / 2);
}

if (downButton) {
  downButton.addEventListener("click", moveDown);
}
/*Highlight current link*/

function highlightLink() {
  const navigationLinks = document.querySelectorAll(".nav_link");

  navigationLinks.forEach((link) => {
    console.log(link);
    if (link.href === document.URL) link.className += " current-link";
  });
}

highlightLink();

/*lightBox*/

const images = document.querySelectorAll(".modalclass");

for (let bigImage of images) {
  function openLightBox() {
    addOverlay();
    addCloseBtn();
    if (bigImage.classList.contains("modalclass")) {
      bigImage.classList.remove("modalclass");
      bigImage.classList.add("picture_lightbox");
    }
    if (bigImage.firstElementChild.classList.contains("content_picture")) {
      bigImage.firstElementChild.classList.remove("content_picture");
      bigImage.firstElementChild.classList.add("content_picture-full");
    }
  }

  bigImage.addEventListener("click", openLightBox);
}

function addOverlay() {
  let overlay = document.createElement("div");
  overlay.className = "lightbox_overlay";
  document.body.appendChild(overlay);
}

function addCloseBtn() {
  let closeBtn = document.createElement("button");
  closeBtn.className = "close_lightbox";
  closeBtn.innerHTML = "X";

  function closeLightbox() {
    let overlay = document.querySelector(".lightbox_overlay");
    let closingButton = document.querySelector(".close_lightbox");
    overlay.parentNode.removeChild(overlay);
    closingButton.parentNode.removeChild(closingButton);

    for (let image of images) {
      if (image.classList.contains("picture_lightbox")) {
        image.classList.add("modalclass");
        image.classList.remove("picture_lightbox");
      }
      if (image.firstElementChild.classList.contains("content_picture-full")) {
        image.firstElementChild.classList.remove("content_picture-full");
        image.firstElementChild.classList.add("content_picture");
      }
    }
  }

  closeBtn.addEventListener("click", closeLightbox);
  document.body.appendChild(closeBtn);
}

/*reveal elements*/
function displayOnScroll(e) {
  const allHidden = document.querySelectorAll(".move");
  for (let elem of allHidden) {
    let box = elem.getBoundingClientRect();
    let windowSize = document.documentElement.clientHeight;
    let pagePosition = box.top + pageYOffset;
    if (pagePosition - windowSize < window.pageYOffset) {
      elem.style.transform = "translateY(0)";
      elem.style.opacity = 1;
    }
  }
}
window.addEventListener("scroll", displayOnScroll);

let accordionItems = document.querySelectorAll(".article_title");
let i;

for (i = 0; i < accordionItems.length; i++) {
  function openAccordion() {
    for (j = 0; j < accordionItems.length; j++) {
      if (accordionItems[j] != this) {
        if (accordionItems[j].classList.contains("open_accordion")) {
          accordionItems[j].classList.remove("open_accordion");
          let panel = accordionItems[j].nextElementSibling;
          panel.style.maxHeight = null;
        }
      }
    }
    this.classList.toggle("open_accordion");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

  accordionItems[i].addEventListener("click", openAccordion);
}

const toLoadPic = document.querySelectorAll(".lazypic");

const options = {
  // If the image gets within 50px in the Y axis, start the download.
  root: null, // Page as root
  rootMargin: "0%",
  threshold: 0.1,
};

const fetchImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = resolve;
    image.onerror = reject;
  });
};

const loadImage = (image) => {
  const src = image.dataset.src;
  fetchImage(src).then(() => {
    image.src = src;
  });
};

const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      loadImage(entry.target);
    }
  });
};

// The observer for the images on the page
const observer = new IntersectionObserver(handleIntersection, options);

toLoadPic.forEach((img) => {
  observer.observe(img);
});

let loaderWrapper = document.querySelector(".loader_wrapper");
const vLoader = document.querySelector(".grape_loader");
const loaderItemFirst = document.querySelector("#ball_one");
const loaderItemSecond = document.querySelector("#ball_two");
const loaderItemThird = document.querySelector("#ball_three");
let currentAnimationTime = 0;
const amplitude = 20;

function animateVertically() {
  const offset = amplitude * Math.sin(currentAnimationTime);
  const offsetSecond = amplitude * Math.sin(currentAnimationTime - 1);
  const offsetThird = amplitude * Math.sin(currentAnimationTime - 2);

  loaderItemFirst.style.transform = `translateY(${offset}px) rotate(45deg)`;

  loaderItemSecond.style.transform = `translateY(${offsetSecond}px) rotate(43deg)`;

  loaderItemThird.style.transform = `translateY(${offsetThird}px) rotate(40deg)`;

  currentAnimationTime += 0.1;

  requestAnimationFrame(animateVertically);
}

animateVertically();

document.addEventListener("DOMContentLoaded", function () {
  var lazyloadImages;
  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazyback");

    var imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.classList.remove("lazyback");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image);
    });
  } else {
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazyback");

    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function () {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function (img) {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            img.classList.remove("lazyback");
          }
        });
        if (lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
});

function pageLoaded() {
  loaderWrapper.classList.add("hide_loader");
}
window.addEventListener("load", pageLoaded);
