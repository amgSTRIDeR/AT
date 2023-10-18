/* eslint-disable require-jsdoc */

import BaseComponent from '../common/base.component.js';

export default class AddDoctorComponent extends BaseComponent {
  constructor() {
    super('.new-doctor-dialog');
  }

  get saveBtn() {
    return this.rootEl.$('.e-footer-content button.e-primary');
  }

  get closeBtn() {
    return this.rootEl.$('.e-dlg-closeicon-btn');
  }

  input(name) {
    const selectors = {
      name: '[name="Name"]',
      phone: '#DoctorMobile',
      email: '[name="Email"]',
      education: '[name="Education"]',
      designation: '[name="Designation"]',
    };
    return this.rootEl.$(selectors[name.toLowerCase()]);
  }
}
