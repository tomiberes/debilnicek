'use strict';

var Pages = module.exports = function(content, modal, toast) {
  this.contentbone = content;
  this.modalbone = modal;
  this.toastbone = toast;
  this.currentPage = null;
  this.pageHistory = [];
};

Pages.animationend = 'animationend webkitAnimationEnd msAnimationEnd oanimationend';

Pages.prototype = {

  depth: function() {
    return this.pageHistory.length;
  },

  back: function() {
    return window.history.back();
  },

  // Used from router just show or slide back, eg. sidebar menu options
  show: function(page) {
    var url = window.location.pathname + window.location.hash;
    if (url === this.pageHistory[this.pageHistory.length - 2]) {
      this.slideBack(page, url);
    } else {
      this.replace(page, url);
    }
  },

  // Used from router slide both way, eg. always nested nav, single trash item
  slide: function(page) {
    var url = window.location.pathname + window.location.hash;
    if (url === this.pageHistory[this.pageHistory.length - 2]) {
      this.slideBack(page, url);
    } else if (!this.currentPage) {
      this.replace(page, url);
    } else {
      this.slideForward(page, url);
    }
  },

  // Replace without any animation
  replace: function(page, url) {
    this.contentbone.append(page.$el);
    this.pageHistory.length = 0;
    this.pageHistory.push(url);
    this.animate({
      in: { view: page, animation: '' },
      out: { view: this.currentPage, animation: '' }
    });
    this.currentPage = page;
    return;
  },

  // In case it's new, slide right
  slideForward: function(page, url) {
    this.contentbone.append(page.$el);
    this.pageHistory.push(url);
    this.animate({
      in: { view: page, animation: 'animation-page-moveToLeft' },
      out: { view: this.currentPage, animation: 'animation-page-moveFromRight' }
    });
    this.currentPage = page;
    return;
  },

  // In case it's back, slide left
  slideBack: function(page, url) {
    this.contentbone.append(page.$el);
    this.pageHistory.pop();
    this.animate({
      in: { view: page, animation: 'animation-page-moveFromLeft' },
      out: { view: this.currentPage, animation: 'animation-page-moveToRight' }
    });
    this.currentPage = page;
    return;
  },

  // Type: `dialog` or `reveal`
  modal: function(view, type) {
    var inAnimation, outAnimation;
    switch (type) {
      case 'dialog':
        inAnimation = '';
        outAnimation = '';
        break;
      case 'reveal':
        inAnimation = 'animation-page-moveFromBottom';
        outAnimation = 'animation-page-moveToBottom';
        break;
      default:
        inAnimation = '';
        outAnimation = '';
        break;
    }
    if (!this.modalbone.html()) {
      this.modalbone.html(view.$el);
      this.animate({
        in: { view: view, animation: inAnimation },
        out: { view: null, animation: '' }
      });
      return true;
    } else {
      this.animate({
        in: { view: null, animation: '' },
        out: { view: view, animation: outAnimation }
      });
      return false;
    }
  },

  toast: function(view) {
    if (!this.toastbone.html()) {
      this.toastbone.html(view.$el);
      this.animate({
        in: { view: view, animation: 'animate-toast-moveFromBottom' },
        out: { view: null, animation: '' }
      });
      return true;
    } else {
      this.animate({
        in: { view: null, animation: '' },
        out: { view: view, animation: 'animate-toast-moveToBottom' }
      });
      return false;
    }
  },

  animate: function(views) {
    if (views.in.view) {
      if (!views.in.animation) {
        views.in.view.trigger('animation:complete');
      } else {
        views.in.view.$el.one(Pages.animationend, function(ev) {
          views.in.view.$el.removeClass(views.in.animation);
          views.in.view.trigger('animation:complete');
        });
        views.in.view.$el.addClass(views.in.animation);
      }
    }
    if (views.out.view) {
      if (!views.out.animation) {
        views.out.view.close();
      } else {
        views.out.view.$el.one(Pages.animationend, function(ev) {
          views.out.view.close();
        });
        views.out.view.$el.addClass(views.out.animation);
      }
    }
  }

};
