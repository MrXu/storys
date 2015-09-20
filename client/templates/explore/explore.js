Template.explore.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('storys');
  }.bind(this));
};

Template.explore.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.explore.helpers({
  storys: function(){
    return Storys.find();
  }
});
