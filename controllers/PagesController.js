const viewPath = 'pages';

exports.home = (req, res) => {
  res.render(`${viewPath}/home`, {
    pageTitle: 'VyHoang - 200408803 | Home'
  });
};