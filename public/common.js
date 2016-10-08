;(function() {
  const Navbar = window.Navbar;
  const Footer = window.Footer;

  const navbar = new Navbar({
    data: {},
    el: document.querySelector('.js-navbar'),
  });

  const footer = new Footer({
    data: {},
    el: document.querySelector('.js-footer'),
  });
})()
