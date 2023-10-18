import {pages} from '../po/pages/index.js';

describe('Test suite', () => {
  beforeEach(async () => {
    await pages('dashboard').open();
  });

  it('Open modal window for adding a new doctor', async () => {
    await pages('dashboard').sideMenu.item('doctors').click();
    await pages('doctors').doctorsListHeader.addNewDoctorBtn.click();
    await expect(pages('doctors').addDoctorModal.rootEl).toBeDisplayed();
  });

  it('Add a new doctor', async () => {
    await pages('dashboard').sideMenu.item('doctors').click();
    await pages('doctors').doctorsListHeader.addNewDoctorBtn.click();
    await pages('doctors').addDoctorModal.rootEl.waitForDisplayed();
    await pages('doctors').addDoctorModal.input('name').setValue('John Wick');
    await pages('doctors').addDoctorModal.input('phone').setValue('9995554433');
    await pages('doctors').addDoctorModal
        .input('email').setValue('1@gmail.com');
    await pages('doctors').addDoctorModal
        .input('education').setValue('A good one');
    await pages('doctors').addDoctorModal
        .input('designation').setValue('Test');
    await pages('doctors').addDoctorModal.saveBtn.click();
    expect(pages('doctors').addDoctorModal.rootEl).not.toBeDisplayed();
    expect(pages('doctors').specialistCard(8)
        .name).toHaveText('Dr. John Wick');
    expect(pages('doctors').specialistCard(8)
        .education).toHaveText('A good one', {
      ignoreCase: true,
    });
  });

  it('Close a modal window for adding a new doctor', async () => {
    await pages('dashboard').sideMenu.item('doctors').click();
    await pages('doctors').doctorsListHeader.addNewDoctorBtn.click();
    await pages('doctors').addDoctorModal.rootEl.waitForDisplayed();
    await pages('doctors').addDoctorModal.closeBtn.click();
    expect(pages('doctors').addDoctorModal.rootEl).not.toBeDisplayed();
  });

  it(`Show error messages for required 
  fields for adding a new doctor modal`, async () => {
    await pages('dashboard').sideMenu.item('doctors').click();
    await pages('doctors').doctorsListHeader.addNewDoctorBtn.click();
    await pages('doctors').addDoctorModal.rootEl.waitForDisplayed();
    await $('.e-footer-content button.e-primary').click();
    expect(pages('doctors').addDoctorModal.rootEl).toBeDisplayed();
    expect($('label#Name-info').toHaveText('Enter valid name'));
    expect(
        $('label#undefined-info').toHaveText('Enter valid mobile number'),
    );
    expect($('label#Email-info').toHaveText('Enter valid email'));
    expect($('label#Education-info').toHaveText('Enter valid education'));
  });

  it(`Should detect the focus of an 
  "Add New Patient" button element`, async () => {
    await $('.sidebar-item.patients').click();
    await $('//div[@class="patients-detail-wrapper"]').waitForDisplayed();
    const addNewPatientButton = await $('//button[text() = "Add New Patient"]');
    expect(await addNewPatientButton.isFocused()).toBe(false);
    for (let i = 0; i < 5; i++) {
      await browser.keys('Tab');
    }
    expect(await addNewPatientButton.isFocused()).toBe(true);
  });
});
