
describe('Schedule tests', () => {
  beforeEach(async () => {
    await browser.url(
        'https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#',
    );
  });

  it('Should open edit appointment window by double click', async () => {
    await browser.customClick($('//span[@title="calendar"]'));
    await browser.customDoubleClick($('div.e-time'));
    const isEditWindowDisplayedInViewPort = await $(
        'div#_dialog_wrapper',
    ).isDisplayedInViewport();
    expect(isEditWindowDisplayedInViewPort).toBe(true);
  });

  it('Should alert if selected end date before the start date', async () => {
    await browser.customClick($('//span[@title="calendar"]'));
    await browser.customClick($('div.e-time'));
    await browser.customClick($('//button[@title="Edit"]'));
    await $('div#_dialog_wrapper').waitForDisplayed();
    await $('#StartTime').setValue('10/11/23 12:00 AM');
    await $('#EndTime').setValue('10/09/23 12:00 AM');
    await $('button.e-event-save').click();
    const isAlertDisplayedInViewPort = await $(
        '#QuickDialog',
    ).isDisplayedInViewport();
    expect(isAlertDisplayedInViewPort).toBe(true);
  });

  it('Should delete an appointment', async () => {
    await browser.customClick($('//span[@title="calendar"]'));
    const appointment = await $('//div[@data-id="Appointment_1020"]');
    expect(await appointment.isDisplayed()).toBe(true);
    await browser.customClick(appointment);
    await browser.customClick($('button.e-event-delete'));
    await browser.customClick($('button.e-quick-dialog-delete'));
    expect(await $('//div[@data-id="Appointment_1020"]').isDisplayed()).toBe(
        false,
    );
  });

  it(`An appointment card should has right width
   for different page sizes`, async () => {
    await browser.customClick($('//span[@title="calendar"]'));
    let appointment = await $('//div[@data-id="Appointment_1002"]');
    await browser.setWindowSize(702, 1000);
    let appointmentWidth = await appointment.getSize('width');
    expect(appointmentWidth).toBe(33);
    await browser.setWindowSize(755, 1000);
    appointment = await $('//div[@data-id="Appointment_1002"]');
    appointmentWidth = await appointment.getSize('width');
    expect(appointmentWidth).toBe(38);
  });
});
