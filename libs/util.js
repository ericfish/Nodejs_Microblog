
/**
 * authenticate mengodb
 *
 * @param db, callback
 * @returns
 */
exports.authenticateAndGo = function authenticateAndGo(db, callback) {
  db.authenticate('test_user', '1q2w3e4r', function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Database user authenticated');

    callback();
  });
};