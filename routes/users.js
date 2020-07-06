const { new: _new, create } = require('../controllers/UsersController');

module.exports = router => {
  // Step 1: Setup the necessary routes for new and create
  router.get('/register', _new);
  router.post('/users', create);

};