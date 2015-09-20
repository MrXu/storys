Meteor.users.before.insert(function (userId, doc) {
    doc.profile.votedStoryId = [];
    doc.profile.favoriteStoryId = [];
    doc.profile.ownStoryId = [];
    doc.profile.storyHistory = [];
});

Meteor.users.helpers({
    votedProducts: function () {
        return Storys.find({_id: {$in: this.profile.votedStoryId}});
    },
    favortiteProducts: function (){
        return Storys.find({_id: {$in: this.profile.favoriteStoryId}});
    }
});
