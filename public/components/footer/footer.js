;(function() {
  class Footer {
    constructor(options = {data: {}}) {
      this.template = window.fest['footer/footer.tmpl'];
      this.el = options.el;

      this._updateHtml();
    }

    _updateHtml() {
      this.el.innerHTML = this.template(this.data);
    }
  }

  window.Footer = Footer;
})()
