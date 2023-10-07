describe('Test suite', () => {
  beforeEach(async () => {
    await browser.url(
        'https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/dashboard',
    );
  });

  it('Open modal window for adding a new doctor', async () => {
    await $('.sidebar-item.doctors').click();
    await $('.specialization-types button.e-control').click();
    await expect($('.new-doctor-dialog')).toBeDisplayed();
  });

  it('Add a new doctor', async () => {
    await $('.sidebar-item.doctors').click();
    await $('.specialization-types button.e-control').click();
    await $('.new-doctor-dialog').waitForDisplayed();
    await $('[name="Name"]').setValue('John Wick');
    await $('#DoctorMobile').setValue('9995554433');
    await $('[name="Email"]').setValue('1@gmail.com');
    await $('[name="Education"]').setValue('A good one');
    await $('.e-footer-content button.e-primary').click();
    await expect($('.new-doctor-dialog')).not.toBeDisplayed();
    const newDoctorName = await $('//div[contains(text(), "Dr. John Wick")]');
    const newDoctor = await newDoctorName.$(
        '../../../*[contains(@class, "specialist-item")]',
    );
    expect(newDoctor.$('.name')).toHaveText('Dr. John Wick');
    expect(newDoctor.$('.education')).toHaveText('A good one', {
      ignoreCase: true,
    });
  });

  it('Close a modal window for adding a new doctor', async () => {
    await $('.sidebar-item.doctors').click();
    await $('.specialization-types button.e-control').click();
    await $('.new-doctor-dialog').waitForDisplayed();

    const cancelButton = await $('//button[contains(text(), "Cancel")]');
    await cancelButton.click();

    expect($('.new-doctor-dialog')).not.toBeDisplayed();
  });

  it(`Show error messages for required 
  fields for adding a new doctor modal`, async () => {
    await $('.sidebar-item.doctors').click();
    await $('.specialization-types button.e-control').click();
    await $('.new-doctor-dialog').waitForDisplayed();
    await $('.e-footer-content button.e-primary').click();
    expect($('.new-doctor-dialog')).toBeDisplayed();
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
