import { RoutesPath, UserData } from '../../types/interfaces';

export default class Router {
  private routes: RoutesPath[];

  constructor(routes: RoutesPath[]) {
    this.routes = routes;
    // window.addEventListener('DOMContentLoaded', this.locationHandler);
    window.addEventListener('hashchange', this.locationHandler);

    this.locationHandler();
  }

  private locationHandler = () => {
    const userData = Router.getUserData();
    let location = window.location.hash.replace('#', '');

    if (location.length === 0 && !userData) {
      location = '/';
      console.log(window.location.href);
    } else if (location.length === 0 && userData) {
      location = 'chat';
      console.log(window.location.href);
    }

    if (userData) {
      location = 'chat';
      console.log(window.location.pathname);
    } else {
      location = '/';
      console.log(window.location);
    }

    const route = this.routes.find((item) => item.path === location);

    if (typeof route === 'undefined') {
      console.log('There are now such page');
      const notFoundRoute = this.routes[this.routes.length - 1];

      notFoundRoute.render();
      return;
    }

    route.render();
  };

  static getUserData = (): UserData | null => {
    const userDataJSON = sessionStorage.getItem('userData');

    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);

      return userData;
    }

    return null;
  };
}
