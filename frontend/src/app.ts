//import {HelloWorld} from "@aurelia2-smart-ui/plugin";
import {IRouteableComponent, IRouter, routes} from "@aurelia/router";

@routes([
  {
    path: '',
    redirectTo: 'home'
  },
  {
    path: 'admin',
    component: ()=> import('./routes/admin/admin'),
    title: ''
  },
  {
    path: 'home',
    component: ()=> import('./routes/home/home'),
    title: ''
  }
])
export class App implements IRouteableComponent {

  public message = 'Hello World!';
  constructor(@IRouter private router: IRouter) {

  }
}
