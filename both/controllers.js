AppController = RouteController.extend({
  layoutTemplate: 'appLayout'
});

ExploreController = AppController.extend({});

CategoryController = AppController.extend({});

RecentController = AppController.extend({});

ProductsShowController = AppController.extend({});

FavoritesController = AppController.extend({});

BookingsController = AppController.extend({});

UsersShowController = AppController.extend({});

NotificationsController = AppController.extend({});

ProfileController = AppController.extend({});

ProductCreationController = AppController.extend({});

// story

StoryController = AppController.extend({});

PlotController = AppController.extend({
  layoutTemplate: 'blankLayout'
});

NewPlotController = AppController.extend({
  layoutTemplate: 'blankLayout'
});

CommentsController = AppController.extend({});

HistoryController = AppController.extend({});