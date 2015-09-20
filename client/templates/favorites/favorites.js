Template.favorites.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('storys');
  }.bind(this));
};

Template.favorites.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));


  if (!Meteor.loggingIn() && !Meteor.user()) {
    IonModal.open('signIn');
  }

};

Template.favorites.helpers({
  storys: function () {
    if(Meteor.user()){
      if(Meteor.user().profile.favoriteStoryId){
        return Storys.find({_id: {$in:Meteor.user().profile.favoriteStoryId}}, {sort: {createdAt: -1, name: -1}});
      }
    }
  }
});
