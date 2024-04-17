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

    if (location === 'login' && userData) {
      location = 'chat';
    } else if (location === 'chat' && !userData) {
      location = 'login';
    } else if (location.length === 0) {
      location = userData ? 'chat' : 'login';
    }

    window.location.hash = location;

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
