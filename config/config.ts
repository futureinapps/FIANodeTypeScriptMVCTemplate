import * as Path from 'path';

const rootPath = Path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

export class IConfig {
  root: string;
  app: { name: string };
  port: Number | string;
}
class Config implements IConfig {

  private static instance: Config;
  root: string;
  app: { name: string };
  port: Number | string;

  static getInstance() {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance
  }

  private constructor() {
    this[env]()
    global['rootPath'] = this.root
  }

  private development() {
    this.root = rootPath;
    this.app = { name: 'ntsmvc-template-development' };
    this.port = process.env.PORT || 3000
  }

  private production() {
    this.root = rootPath;
    this.app = { name: 'ntsmvc-template-production' };
    this.port = process.env.PORT || 3000
  }

  private test() {
    this.root = rootPath;
    this.app = { name: 'ntsmvc-template-test' };
    this.port = process.env.PORT || 3000
  }
}

const instance = Config.getInstance()

export default instance;
