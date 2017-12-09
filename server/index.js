/*
 * Npm import
 */
import express from 'express';
import bodyParser from 'body-parser';

/*
 * Local import
 */
// import controller
import controller from './controller';

// Server
const app = express();

/*
 * Middlewares
 */
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

/*
 * Route
 */
app.use('/', controller);


// Start on :3000
app.listen(3000, () => {
  console.log('App is running');
});
