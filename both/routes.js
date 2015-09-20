Router.route('/', {
  name: 'explore',
  template: 'explore',
  controller: 'ExploreController'
});

Router.route('/category/:_id', {
  name: 'category',
  template: 'categoryPage',
  controller: 'CategoryController'
});







Router.route('/products/:_id', {
  name: 'productDetail',
  template: 'productsShow',
  controller: 'ProductsShowController'
});

Router.route('/users/:_id', {
  name: 'users.show'
});

Router.route('/profile', {
  name: 'profile'
});

Router.route('/newproduct', {
  name: 'productCreation',
  template: 'productCreation',
  controller: 'ProductCreationController'
});


//story
Router.route('/story/:_id', {
  name: 'story',
  template: 'story',
  controller: 'StoryController'
});

Router.route('/plotA/:_id', {
  name: 'plotA',
  template: 'plot_bypage_A',
  controller: 'PlotController'
});
Router.route('/plotB/:_id', {
  name: 'plotB',
  template: 'plot_bypage_B',
  controller: 'PlotController'
});


Router.route('/plot/:_id/new', {
  name: 'newPlot',
  template: 'newPlot',
  controller: 'NewPlotController'
});

Router.route('/favorites', {
  name: 'favorites',
  template: 'favorites',
  controller: 'FavoritesController'
});

Router.route('/createStory', {
  name: 'createStory',
  template: 'createStory',
  controller: 'CommentsController'
});

Router.route('/history', {
  name: 'history',
  template: 'history',
  controller: 'HistoryController'
});