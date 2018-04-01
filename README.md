# FIANodeTypeScriptMVCTemplate
A Node.js TypeScript template with dynamic MVC pattern inside.

## Installation 
```sh
git clone https://github.com/futureinapps/FIANodeTypeScriptMVCTemplate.git
```

## Usage

### Controller 
```javascript
import { Controller, Route, Decorators, Enums } from 'nts-mvc';
import * as Express from 'express';

export default class Home extends Controller {
  constructor(app) {
    //initialize app & parent routing path
    super(app, '/');
  }

  //route decorator
  @Decorators.RenderRoute('/', Enums.RouterMethods.GET)
  //if route decorator type Rendering, then name of the next fucntion is the name of view file in ${ControllerName} directory
  //for example /views/home/home.jade or /views/home/superhome.jade, where first home is a controller name, second home is the controller method name
  home(router: Express.Router, req: Express.Request, next: Function): Route {
    return {
      title: 'Title'
    }
  }
}
```
### Type of Routes inside Controller
#### Rendering route
```javascript
@Decorators.RenderRoute('/', Enums.RouterMethods.GET)
home(router: Express.Router, req: Express.Request, next: Function): Route {
  return {
    title: 'Заголовок'
  }
}
```
#### Sending route
```javascript
@Decorators.SendRoute('/send', Enums.RouterMethods.GET)
send(router: Express.Router, req: Express.Request, next: Function): Route {
  return {
    message: 'Hello Wordl!'
  }
}
```
#### Redirecting route
```javascript
@Decorators.RedirectRoute('/redirect', Enums.RouterMethods.GET)
redirect(router: Express.Router, req: Express.Request, next: Function): Route {
  return {
    code:301,
    path: '/redirectpath'
  }
}
```
#### Custom route
```javascript
@Decorators.CustomRoute('/custom', Enums.RouterMethods.GET)
custom(router: Express.Router, req: Express.Request, next: Function, res:Express.Response): Route {
  //Your logic here
}
```

## Commands

### Start project for development
```sh
gulp
```

### Start project for production with pm2
```sh
npm start
```

