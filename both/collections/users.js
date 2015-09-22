Meteor.users.before.insert(function (userId, doc) {
    doc.profile.votedStoryId = [];
    doc.profile.favoriteStoryId = [];
    doc.profile.ownStoryId = [];
    doc.profile.storyHistory = [];
});

//Meteor.users.helpers({
//    favortiteProducts: function (){
//        if(this.profile.favoriteStoryId){
//            if(this.profile.favoriteStoryId.length>0){
//                return Storys.find({_id: {$in: this.profile.favoriteStoryId}});
//            }
//        }
//    }
//});
