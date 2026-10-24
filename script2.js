(function () {
  const menuButton = document.querySelector(
    "[data-testid='mobile-menu-button']"
  );

  const navigation = document.querySelector("#primary-navigation");
  const navLinks = document.querySelectorAll(".primary-nav a");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("is-open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  const revealItems = document.querySelectorAll(".reveal");

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }
})();