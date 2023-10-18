/* eslint-disable require-jsdoc */

import BaseComponent from '../common/base.component.js';

export default class ListHeaderComponent extends BaseComponent {
  constructor() {
    super('.specialization-types');
  }

  get addNewDoctorBtn() {
    return this.rootEl.$('button.e-control');
  }
}
