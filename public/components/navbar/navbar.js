;(function() {
  class Navbar {
    constructor(options = {data: {}}) {
      this.template = window.fest['navbar/navbar.tmpl'];
      this.el = options.el;

      this._updateHtml();
    }

    _updateHtml() {
      this.el.innerHTML = this.template(this.data);
    }
  }

  window.Navbar = Navbar;
})()
