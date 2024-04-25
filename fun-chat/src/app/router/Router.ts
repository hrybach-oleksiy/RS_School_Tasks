import { RoutesPath, User } from '../../types/interfaces';
import { RouteHash } from '../../types/enums';

export default class Router {
  private routes: RoutesPath[];

  constructor(routes: RoutesPath[]) {
    this.routes = routes;
    window.addEventListener('hashchange', this.locationHandler);

    this.locationHandler();
  }

  private locationHandler = () => {
    const userData = Router.getUserData();
    let location = window.location.hash.replace('#', '');

    if (location === RouteHash.LOGIN && userData) {
      location = RouteHash.CHAT;
    } else if (location === RouteHash.CHAT && !userData) {
      location = RouteHash.LOGIN;
    } else if (location.length === 0) {
      location = userData ? RouteHash.CHAT : RouteHash.LOGIN;
    }

    window.location.hash = location;

    const route = this.routes.find((item) => item.path === location);

    if (typeof route === 'undefined') {
      console.log('There are no such page');
      const notFoundRoute = this.routes[this.routes.length - 1];

      notFoundRoute.render();
      return;
    }

    route.render();
  };

  static getUserData = (): User | null => {
    const userDataJSON = sessionStorage.getItem('userData');

    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);

      return userData;
    }

    return null;
  };
}
