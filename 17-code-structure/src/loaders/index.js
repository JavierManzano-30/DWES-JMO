// Loaders
import expressLoader from './express-loader.js';

export function init(app, config) {
  expressLoader(app, config);
  console.log('Loaders initialized');
}