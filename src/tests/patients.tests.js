describe('Test suite', () => {
  before(async () => {
    await browser.url(
        'https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/dashboard',
    );
  });

  it(`Should add a new Patient`, async () => {
    await $('.sidebar-item.patients').click();
    await $('//div[@class="patients-detail-wrapper"]').waitForDisplayed();
    const addNewPatientButton = await $('//button[text() = "Add New Patient"]');
    await addNewPatientButton.click();
    expect($(`.new-patient-dialog`)).toBeDisplayed();
    await $('input[name="Name"]').setValue('Test Patient');
    const radioMale = await $('#doctorCheckMale');
    const radioFemale = await $('#doctorCheckFemale');
    expect(await radioMale.isSelected()).toBe(true);
    expect(await radioFemale.isSelected()).toBe(false);
    await radioFemale.click();
    expect(await radioMale.isSelected()).toBe(false);
    expect(await radioFemale.isSelected()).toBe(true);
    await $('//ejs-dropdownlist["@id=Blood-group"]').click();
    await $('ul[id="BloodGroup_options"]').waitForDisplayed();
    await $('//li[@data-value="B-"]').click();
    await $('#DOB_input').setValue('11/7/1995');
    await $('#PatientMobile').setValue('1234567890');
    await $('//input[@name="Email"]').setValue('test@gmail.com');
    await $('//input[@name="Symptoms"]').setValue('Fewer');
    await $('//button[text()="Save"]').click();
    expect($(`.new-patient-dialog`)).not.toBeDisplayed();
    const patients = Array.from(await $$('//tr[@role="row"]'));
    const testPatient = patients.pop();

    expect(await testPatient).toBeDisplayed();
    expect(await testPatient.$('//td[@aria-colindex = "1"]')).toHaveText(
        'Test Patient',
    );
    expect(await testPatient.$('//td[@aria-colindex = "2"]')).toHaveText(
        'Female',
    );
    expect(await testPatient.$('//td[@aria-colindex = "3"]')).toHaveText(
        'B-',
    );
    expect(await testPatient.$('//td[@aria-colindex = "4"]')).toHaveText(
        'Fewer',
    );
    expect(await testPatient.$('//td[@aria-colindex = "5"]')).toHaveText(
        '(123) 456-7890',
    );
    expect(await testPatient.$('//td[@aria-colindex = "6"]')).toHaveText(
        'test@gmail.com',
    );
  });

  it('Should filter patients', async () => {
    const patients = Array.from(await $$('//tr[@role="row"]'));
    for (const patient of patients) {
      expect(patient).toBeDisplayed();
    }
    const testPatient = patients.pop();
    await $('//input[@id="schedule_searchbar"]').setValue('Test Patient');
    for (const patient of patients) {
      expect(patient).not.toBeDisplayed();
    }
    expect(testPatient).toBeDisplayed();
  });

  it('Should delete a patient', async () => {
    await $('//span[text() = "Test Patient"]').click();
    await $('//div[@id="grid_1627125836_0_dialogEdit_wrapper"]')
        .waitForDisplayed();
    await $('//button[@id="delete"]').click();
    expect(await $('//div[@role="dialog"]')).not.toBeDisplayed();
    expect(await $('//ejs-dialog[@cssclass="break-hour-dialog"]'))
        .toBeDisplayed();
    await $('//button[text() = "Ok"]').click();
    expect(await $('//span[text() = "Test Patient"]').isExisting()).toBe(false);
  });
});
