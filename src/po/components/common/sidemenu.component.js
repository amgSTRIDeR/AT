/* eslint-disable require-jsdoc */

import BaseComponent from './base.component.js';

export default class SideMenuComponent extends BaseComponent {
  constructor() {
    super('#plannerSiderBar');
  }

  get name() {
    return this.rootEl.$('.name');
  }

  item(param) {
    const selectors = {
      dashboard: '[routerlink="/dashboard"]',
      schedule: '[routerlink="/calendar"]',
      doctors: '[routerlink="/doctors"]',
    };
    return this.rootEl.$(selectors[param.toLowerCase()]);
  }
};
