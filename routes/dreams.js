const { new: _new, index, show, create, edit, update, delete: _delete } = require('../controllers/DreamsController');

// Step 1: Write an authentication function to identify if a request is authenticated
function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}

// Step 2: Add the authentication function to all the routes below

module.exports = router => {
  router.get('/dreams', index);
  router.get('/dreams/new', auth, _new);
  router.post('/dreams', auth, create); 
  router.post('/dreams/update', auth, update); 
  router.post('/dreams/delete', auth, _delete); 
  router.get('/dreams/:id/edit', auth, edit); 
  router.get('/dreams/:id', show);
};