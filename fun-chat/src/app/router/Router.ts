import { RoutesPath } from '../../types/interfaces';

export default class Router {
  private routes: RoutesPath[];

  constructor(routes: RoutesPath[]) {
    this.routes = routes;
    document.addEventListener('DOMContentLoaded', () => {
      const currentPath = window.location.pathname.split('/').slice(1).join('/');
      // console.log('location after loading', currentPath);
      this.navigate(currentPath);
    });
  }

  public navigate(url: string) {
    // console.log(window.location.pathname.split('/'));
    // const pathnameApp = window.location.pathname.split('/').slice(1, this.pathSegmentsToKeep).join('/');
    // const pathnameApp = window.location.pathname;
    //   .split('/')
    //   .slice(1, this.pathSegmentsToKeep + 1)
    //   .join('/');
    // console.log(pathnameApp);
    // window.history.pushState({}, '', `/${pathnameApp}/${url}`);
    window.history.pushState({}, '', `/${url}`);
    // console.log(`${pathnameApp}/${url}`);
    // console.log(url);

    const pathParts = url.split('/');
    // console.log(pathParts);
    const route = this.routes.find((item) => item.path === pathParts[pathParts.length - 1]);
    // console.log(route);

    if (typeof route === 'undefined') {
      console.log('There are now such page');
      return;
    }

    route.callback();
  }
}

// https://github.com/MikAleinik/spa-deploy/tree/main
