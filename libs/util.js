var settings = require('../settings');

/**
 * authenticate mengodb
 *
 * @param db, callback
 * @returns
 */
exports.authenticateAndGo = function authenticateAndGo(db, callback) {
  db.authenticate(settings.username, settings.password, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Database user authenticated');

    callback();
  });
};