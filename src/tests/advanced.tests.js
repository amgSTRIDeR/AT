describe('Advanced tests', () => {
  beforeEach(async () => {
    await browser.url(
        'https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#',
    );
  });

  it('Should add a new appointment in recent activities field', async () => {
    await browser.customClick($('//a[@routerlink="/calendar"]'));
    await browser.customDoubleClick($(`tbody tr[role="row"]
     td[role="gridcell"]`));
    await $('div#_dialog_wrapper').waitForDisplayed();
    await browser.execute(() => {
      const patientName = document.getElementById('PatientName');
      const symptoms = document.querySelector('textarea.e-description.e-field');

      patientName.value = 'Richa';
      symptoms.value = 'Headache';
    });
    await browser.pause(100);
    await browser.customClick($('.e-event-save'));
    await browser.customClick($('//span[@title="dashboard"]'));
    const activityTitle = await $('div span.type-name').getText();
    const activityMessage = await $(
        '//div[@class="activity-message"]/span[2]',
    ).getText();
    expect(activityTitle).toBe('Added New Appointment');
    expect(activityMessage).toBe('Richa for Headache');
  });

  it('Should show right schedule for a doctor', async () => {
    await browser.customClick($('//a[@routerlink="/calendar"]'));
    await browser.customClick($('#specialist'));
    await $('//div[@id="specialist_popup"]').waitForDisplayed();
    await $('//li[@data-value="4"]').waitForDisplayed();
    await browser.customClick($('//li[@data-value="4"]'));

    const eAppointmentDetails = await $(`div.e-appointment-details
     div.e-subject`);
    await eAppointmentDetails.waitUntil(
        async function() {
          return (await eAppointmentDetails.getText()) === 'Richa';
        },
        {
          timeout: 5000,
          timeoutMsg: 'expected text to be different after 5s',
        },
    );

    const eTime = await $('div.e-appointment-details div.e-time');
    await eTime.waitUntil(
        async function() {
          return (await eTime.getText()) === '10:00 AM - 11:00 AM';
        },
        {
          timeout: 5000,
          timeoutMsg: 'expected text to be different after 5s',
        },
    );
  });

  it('Should show appointments for the previous week', async () => {
    await browser.action('pointer').move(100, 325).down().perform();

    await $('span.e-btn-icon.e-icon-prev.e-icons').waitForDisplayed();

    await browser.action('pointer').move(320, 100).down().perform();

    const target = await $('//div[@data-id="Appointment_1011"]');

    await browser
        .action('pointer')
        .move({duration: 0, origin: target})
        .down()
        .pause(10)
        .perform();

    expect(await $('div.e-event-popup').isDisplayed()).toBe(true);
    await browser.pause(2000);
  });

  it('Should set right cookies for page open counting', async () => {
    const startPageCount = +(await browser.getCookies('_pageCount'))[0].value;

    const refreshCount = 5;

    for (let i = 0; i < refreshCount; i++) {
      await browser.refresh();
    }

    const endPageCount = +(await browser.getCookies('_pageCount'))[0].value;
    expect(startPageCount === endPageCount - refreshCount).toBe(true);
  });
});
