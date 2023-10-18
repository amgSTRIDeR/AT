/* eslint-disable require-jsdoc */

import {HeaderComponent, SidemenuComponent} from '../components/index.js';

export default class BasePage {
  constructor(url) {
    this.url = url;
    this.header = new HeaderComponent();
    this.sideMenu = new SidemenuComponent();
  }

  open() {
    return browser.url(this.url);
  }
}
