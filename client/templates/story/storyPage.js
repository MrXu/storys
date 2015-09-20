/**
 * Created by xuwei on 16/9/15.
 */
Template.story.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('storyCompo', Router.current().params._id);
    }.bind(this));
};

Template.story.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));


};

Template.story.helpers({
    story: function () {
        return Storys.findOne({_id: Router.current().params._id});
    },
    author: function(){
        var story =  Storys.findOne({_id: Router.current().params._id});
        return Meteor.users.findOne({_id: story.authorId});
    },
    plotOneId: function(){
        var story =  Storys.findOne({_id: Router.current().params._id});
        return {_id:story.firstPlotId}
    },
    //todo
    comments: function () {
        return Comments.find({productId: Router.current().params._id}, {sort: {createdAt: -1}});
    }
});

Template.story.events({
    'click [data-action=new-comment]': function (event, template) {
        if (Meteor.user()) {
            IonModal.open('newComment', {productId: this._id});
        } else {
            IonModal.open('signIn');
        }
    },
    'click [data-action=new-storyline]': function (event, template) {
        if (Meteor.user()) {
            console.log(this);
            Meteor.call('storyline.init',this._id);
        } else {
            console.log('no storyline created.');
        }
    }
});
