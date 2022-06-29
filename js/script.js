///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
const navSelector = document.querySelector(".header");
function toggleNavHandler(event) {
  if (event.target.name === "menu-outline") {
    navSelector.classList.add("nav-open");
  } else {
    navSelector.classList.remove("nav-open");
  }
}
// Smooth navigation implimentation
// selects anchor elements which have href property
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    if (href !== "#" && href.startsWith("#")) {
      //scroll to view
      const selectionEl = document.querySelector(href);
      selectionEl.scrollIntoView({ behavior: "smooth" });
    }
    if (link.classList.contains("main-nav-link")) {
      navSelector.classList.remove("nav-open");
    }
  });
});
// // // // // // // // // // // // // // // // // // //
// Sticky navigation
const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the view port
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);
//// // // // // // // // // // // // // // // // // //
const yearElement = document.querySelector(".year");
yearElement.textContent = new Date().getFullYear();
const btn = document.querySelector(".btn--mobile-nav");
btn.addEventListener("click", toggleNavHandler);
//// // // // // // // // // // // // // //
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
