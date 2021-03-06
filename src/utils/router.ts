import authController from '../controllers/authController';
import { IProps } from '../types/Types';
import Route from './route';

export default class Router {
  private routes: Route<IProps>[];

  private history: History;

  private currentRoute: Route<IProps> | null;

  private static routerInstance: Router | null;

  private defaultRoute: Route<IProps>;

  private constructor() {
    this.history = window.history;
    this.currentRoute = null;
    this.routes = [];
  }

  public static getInstance() {
    if (!Router.routerInstance) {
      Router.routerInstance = new Router();
    }
return Router.routerInstance;
  }

  use<TProps extends IProps>(route: Route<TProps>) {
    this.routes.push(route);
    return this;
  }

  useDefault(route: Route<IProps>) {
    this.defaultRoute = route;
    return this;
  }

start() {
    window.onpopstate = () => {
      setTimeout(()=>{
        this.onRoute(window.location.pathname);
      }, 0)
    };
    this.onRoute(window.location.pathname);
  }

  private onRoute(pathname: string) {
    if (pathname !== '/' && pathname !== '/sign-up') {
      authController.getUser().then((response) => {
        if (response.isSignedIn) {
          this.onRouteReal(pathname);
        } else {
          this.go('/');
        }
      });
    } else {
      this.onRouteReal(pathname);
    }
  }

  private onRouteReal(pathname: string) {
    let route = this.getRoute(pathname);

    if(!route){
      route = this.defaultRoute;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    if (route) {
      route.render();
    }
  }

  go(pathname: string) {
    this.history.pushState({ page: typeof this.currentRoute, shallow: true }, '', pathname);
    this.onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    const foundRoutes = this.routes.find((route) => route.isMatch(pathname));
    return foundRoutes ?? null;
  }
}
