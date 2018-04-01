
import * as Express from 'express';
import Config from './config/config';
import ExpressConfig from './config/express';
const app = Express();

new ExpressConfig(app, Config)

app.listen(Config.port, () => {
  console.log('Express server listening on port ' + Config.port);
});