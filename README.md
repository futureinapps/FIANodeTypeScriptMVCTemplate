# FIANodeTypeScriptMVCTemplate
A Node.js TypeScript template with dynamic MVC pattern inside.

## Installation 
```sh
git clone https://github.com/futureinapps/FIANodeTypeScriptMVCTemplate.git
```

## Usage

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

