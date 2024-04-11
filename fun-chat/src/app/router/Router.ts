import { RoutesPath } from '../../types/interfaces';

export default class Router {
  private routes: RoutesPath[];

  constructor(routes: RoutesPath[]) {
    this.routes = routes;
    // window.addEventListener('DOMContentLoaded', this.locationHandler);
    window.addEventListener('hashchange', this.locationHandler);

    this.locationHandler();
  }

  private locationHandler = () => {
    let location = window.location.hash.replace('#', '');
    if (location.length === 0) {
      location = '/';
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
}
