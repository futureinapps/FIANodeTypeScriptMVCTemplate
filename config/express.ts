import * as Express from 'express';
import * as Glob from 'glob';
import * as Favicon from 'serve-favicon';
import * as Logger from 'morgan';
import * as CookieParser from 'cookie-parser';
import * as BodyParser from 'body-parser';
import * as Compress from 'compression';
import * as MethodOverride from 'method-override';
import { IConfig } from './config';

class ExrpessConfig {

  private config: IConfig;
  private app: any;

  constructor(app, config: IConfig) {
    this.config = config
    this.app = app
    this.initConfig()
  }

  initConfig() {
    this.initLocals();
    this.initViewEngine();
    this.initLogger();
    this.initParsers();
    this.initControllers();
    this.initMiddleware();
  }

  initLocals() {
    const env = process.env.NODE_ENV || 'development';
    this.app.locals.ENV = env;
    this.app.locals.ENV_DEVELOPMENT = env == 'development';
  }

  initViewEngine() {
    this.app.set('views', this.config.root + '/app/views');
    this.app.set('view engine', 'jade');
  }

  initLogger() {
    this.app.use(Logger('dev'));
  }

  initParsers() {
    this.app.use(BodyParser.json());
    this.app.use(BodyParser.urlencoded({
      extended: true
    }));
    this.app.use(CookieParser());
  }

  initMiddleware() {
    this.app.use(Compress());
    this.app.use(Express.static(this.config.root + '/public'));
    this.app.use(MethodOverride());
    this.app.use((req, res, next) => {
      let err = new Error('Not Found');
      err['status'] = 404;
      next(err);
    });
    if (this.app.get('env') === 'development') {
      this.app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err,
          title: 'error'
        });
      });
    }
    this.app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
    });
  }

  initControllers() {
    let controllers = Glob.sync(this.config.root + '/app/controllers/*.js');
    controllers.forEach((file: any) => {
      let Controller = require(file).default;
      new Controller(this.app);
    });
  }
}

export default ExrpessConfig