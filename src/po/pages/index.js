import DashboardPage from './dashboard.page.js';
import DoctorsPage from './doctors.page.js';

/**
 * Returns the page object based on the name provided
 * @param {string} name - The name of the page ('dashboard' or 'doctors')
 * @return {DashboardPage | DoctorsPage}
 */
function pages(name) {
  const items = {
    dashboard: new DashboardPage(),
    doctors: new DoctorsPage(),
  };
  return items[name.toLowerCase()];
}

export {DashboardPage, DoctorsPage, pages};
