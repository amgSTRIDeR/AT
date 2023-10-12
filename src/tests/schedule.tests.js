/**
 * Clicks on an element after waiting for it to be displayed.
 * @param {WebdriverIO.Element} element - The element to click on.
 */
async function customClick(element) {
  await element.waitForDisplayed();
  element.click();
}

/**
 * DoubleClicks on an element after waiting for it to be displayed.
 * @param {WebdriverIO.Element} element - The element to click on.
 */
async function customDoubleClick(element) {
  await element.waitForDisplayed();
  element.doubleClick();
}

describe('Schedule tests', () => {
  beforeEach(async () => {
    await browser.url(
        'https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#',
    );
  });

  it('Should open edit appointment window by double click', async () => {
    await customClick($('//span[@title="calendar"]'));
    await customDoubleClick($('div.e-time'));
    const isEditWindowDisplayedInViewPort = await $(
        'div#_dialog_wrapper',
    ).isDisplayedInViewport();
    expect(isEditWindowDisplayedInViewPort).toBe(true);
  });

  it('Should alert if selected end date before the start date', async () => {
    await customClick($('//span[@title="calendar"]'));
    await customClick($('div.e-time'));
    await customClick($('//button[@title="Edit"]'));
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
    await customClick($('//span[@title="calendar"]'));
    const appointment = await $('//div[@data-id="Appointment_1020"]');
    expect(await appointment.isDisplayed()).toBe(true);
    await customClick(appointment);
    await customClick($('button.e-event-delete'));
    await customClick($('button.e-quick-dialog-delete'));
    expect(await $('//div[@data-id="Appointment_1020"]').isDisplayed()).toBe(
        false,
    );
  });

  it(`An appointment card should has right width
   for different page sizes`, async () => {
    await customClick($('//span[@title="calendar"]'));
    let appointment = await $('//div[@data-id="Appointment_1002"]');
    await browser.setWindowSize(702, 1000);
    let appointmentWidth = await appointment.getSize('width');
    expect(appointmentWidth).toBe(33);
    await browser.setWindowSize(755, 1000);
    appointment = await $('//div[@data-id="Appointment_1002"]');
    appointmentWidth = await appointment.getSize('width');
    expect(appointmentWidth).toBe(38);
  });

  // Could not implement
  //   it('Should change date and time of an appointment by drag and drop',
  //       async () => {
  //         await customClick($('//span[@title="calendar"]'));
  //  const firstAppointment = await $('//div[@data-id="Appointment_1002"]');
  //  const secondAppointment = await $('//div[@data-id="Appointment_1015"]');

  // Doesn't work
  // await firstAppointment.dragAndDrop(secondAppointment);

  // Doesn't work also
  // await browser.action('pointer')
  //     .move({duration: 0, firstAppointment, x: 0, y: 0})
  //     .down({button: 0})
  //     .pause(10)
  //     .move({duration: 0, origin: secondAppointment})
  //     .up({button: 0})
  //     .perform();

  //     await customClick(firstAppointment);
  //     await $('.e-event-popup').waitForDisplayed();
  //     expect(await $('div.duration-text').getText())
  //         .toBe('August 6, 2020(12:00 PM-1:00 PM)');
  //     await browser.pause(3000);
  //   });

  // Could not implement
  //   it('Should change waiting list order by drag and drop',
  //       async () => {
  //         await customClick($('//span[@title="calendar"]'));
  //  const firstAppointment = await $('//div[text() = "Milka"]');
  //  const secondAppointment = await $('//div[text() = "Laura"]');
  //  const firstBeforeChange = await $('//div[@id="waitlist"]').getText();

  // Doesn't work
  //   await firstAppointment.dragAndDrop(secondAppointment);

  // Doesn't work also
  //   await browser.action('pointer')
  //       .move({duration: 0, firstAppointment, x: 0, y: 0})
  //       .down({button: 0})
  //       .pause(10)
  //       .move({duration: 0, origin: secondAppointment})
  //       .up({button: 0})
  //       .perform();

  //     const firstAfterChange = await $('//div[@id="waitlist"]').getText();
  //     expect(firstAfterChange).toBe(firstBeforeChange);
  //   });
});
