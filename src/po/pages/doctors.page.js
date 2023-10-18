/* eslint-disable require-jsdoc */
import {ListHeaderComponent, AddDoctorComponent, SpecialistCard} from
  '../components/index.js';
import BasePage from './base.page.js';

export default class DoctorsPage extends BasePage {
  constructor() {
    super('/showcase/angular/appointmentplanner/#/doctors');
    this.doctorsListHeader = new ListHeaderComponent();
    this.addDoctorModal = new AddDoctorComponent();
  }

  specialistCard(id) {
    return new SpecialistCard(id);
  }
}
