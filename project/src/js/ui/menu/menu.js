var utils = require('../../utils');
var Zanimo = require('zanimo');
var backbutton = require('../../backbutton');
var helper = require('../helper')

var menu = {};

/* properties */
menu.isOpen = false;

// we need to transition manually the menu on route change, because mithril's
// diff strategy is 'all'
menu.menuRouteAction = function(route) {
  return function() {
    menu.close();
    return Zanimo(document.getElementById('side_menu'), 'transform', 'translate3d(-100%,0,0)',
      '250', 'ease-out').then(utils.f(m.route, route));
  };
};

menu.toggle = function() {
  if (menu.isOpen) menu.close();
  else menu.open();
};

menu.open = function() {
  helper.analyticsTrackView('Main Menu');
  backbutton.stack.push(menu.close);
  menu.isOpen = true;
};

menu.close = function(fromBB) {
  if (fromBB !== 'backbutton' && menu.isOpen) backbutton.stack.pop();
  menu.isOpen = false;
};

module.exports = menu;
