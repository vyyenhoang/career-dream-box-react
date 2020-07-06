// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/

const viewPath = 'dreams';
const Dream = require('../models/Dream');
const User = require('../models/User');




exports.index = async (req, res) => {
  try {
    const dreams = await Dream
      .find()
      .populate('user')
      .sort({updatedAt: 'desc'});

    res.render(`${viewPath}/index`, {
      pageTitle: 'Dream List',
      dreams: dreams
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying the Dream List: ${error}`);
    res.redirect('/');
  }
};

exports.show = async (req, res) => {
  try {
    const dream = await Dream
      .findById(req.params.id)
      .populate('user');

    res.render(`${viewPath}/show`, {
      pageTitle: dream.title,
      dream: dream
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying this dream: ${error}`);
    res.redirect('/');
  }
};

exports.new = (req, res) => {

  
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Dream'
  });
};

exports.create = async (req, res) => {



  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    
    const dream = await Dream.create({user: user._id, ...req.body});

    req.flash('success', 'Dream created successfully');
    res.redirect(`/dreams/${dream.id}`);
  } catch (error) {
    req.flash('danger', `There was an error creating this dream: ${error}`);
    req.session.formData = req.body;
    res.redirect('/dreams/new');
  }
};

exports.edit = async (req, res) => {
  
  try {
    const dream = await Dream.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: dream.title,
      formData: dream
    });
  } catch (error) {
    req.flash('danger', `There was an error accessing this dream: ${error}`);
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    let dream = await Dream.findById(req.body.id);
    if (!dream) throw new Error('Dream could not be found');

    const attributes = {user: user._id, ...req.body};
    await Dream.validate(attributes);
    await Dream.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'The dream was updated successfully');
    res.redirect(`/dreams/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `There was an error updating this dream: ${error}`);
    res.redirect(`/dreams/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  
  try {
    await Dream.deleteOne({_id: req.body.id});
    req.flash('success', 'The dream was deleted successfully');
    res.redirect(`/dreams`);
  } catch (error) {
    req.flash('danger', `There was an error deleting this dream: ${error}`);
    res.redirect(`/dreams`);
  }
};