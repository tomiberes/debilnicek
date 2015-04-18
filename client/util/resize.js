'use strict';

var $ = require('jquery'),
    _ = require('underscore'),
    Mediator = require('../bones').Mediator;

var Resize = module.exports = {
  $win: null,
  $header: null,
  $menu: null,
  $content: null,

  init: function() {
    Resize.$win = $(window);
    Resize.$header = $('.header')/*.first()*/;
    Resize.$menu = $('.menu-side')/*.first()*/;
    Resize.$content = $('.content')/*.first()*/;
    return Resize;
  },

  header: function() {
    return Resize;
  },

  menu: function() {
    Resize.$menu.height(Resize.$win.height() - Resize.$header.height());
    return Resize;
  },

  content: function() {
    Resize.$content.width(Resize.$win.width() - Resize.$menu.width());
    Resize.$content.height(Resize.$win.height() - Resize.$header.height());
    return Resize;
  },

  all: function() {
    Resize.header();
    Resize.menu();
    Resize.content();
    return Resize;
  },

  onLoad: function() {
    Resize.$content.css({ 'left': Resize.$menu.width() });
    Resize.all();
    return Resize;
  },

  onChangeDesktop: function() {
    var lazyResize = _.debounce(function() {
      Resize.all();
    }, 100);
    $(window).on('resize', lazyResize);
    return Resize;
  },

  onChangeMobile: function() {
    // Keyboard shown, reduce overall browser height
    $(window).on('resize', function($ev) {
      Resize.$menu.height(Resize.$win.height() - Resize.$header.height());
      Resize.$content.height(Resize.$win.height() - Resize.$header.height());
    });
    // Device rotated swap width & height
    $(window).on('orientationchange', function($ev) {
      setTimeout(Resize.all, 200);
    });
    return Resize;
  },
};
