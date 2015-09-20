/**
 * Created by xuwei on 16/9/15.
 */
Template.storyTile.helpers({
    //get cover picture of product: default to be the first one
    //this: reference to data context which is product
    coverPic: function(){
        if(this.pictures != null){
            if(this.pictures.length>0){
                return UploadedImages.find({_id: {$in: this.pictures}}).fetch()[0];
            }
        }
        return null;
    },
    author: function(){
        return this.author();
    },
    datePosted: function(){
        return this.datePosted();
    },
    liked: function () {

        //check login
        if(!Meteor.user()){
            return false;
        }

        var idList = Meteor.user().profile.favoriteStoryId;
        if(idList.indexOf(this._id)>=0){
            return true;
        }else{
            return false;
        }
    }
});


Template.storyTile.events({
    'click [data-action=toggle-like]': function (event, template) {
        if(Meteor.user()){
            Meteor.call("Story.like", this._id);
        }else {
            IonModal.open('signIn');
        }
    }
});