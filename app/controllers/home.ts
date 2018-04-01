import { Controller, Route, Decorators, Enums } from 'nts-mvc';
import * as Express from 'express';

export default class Home extends Controller {
  constructor(app) {
    super(app, '/');
  }

  @Decorators.RenderRoute('/', Enums.RouterMethods.GET)
  home(router: Express.Router, req: Express.Request, next: Function): Route {
    return {
      title: 'Заголовок'
    }
  }
}