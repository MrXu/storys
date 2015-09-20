Meteor.methods({
  'Products.vote': function (_id) {
    if (!Meteor.user()) {
      return;
    }

    if (_(Meteor.user().profile.votedProductIds).include(_id)) {
      return;
    }

    Products.update({_id: _id}, {$inc: {numberOfVotes: 1}, $addToSet: {voterIds: this.userId}});
    Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.votedProductIds': _id}});
  },


  'Story.like': function (_id) {
    if (!Meteor.user()) {
      return;
    }
    if (_(Meteor.user().profile.favoriteStoryId).include(_id)) {
      Meteor.users.update({_id: Meteor.user()._id},{$pull: {'profile.favoriteStoryId': _id}});
    }else{
      Meteor.users.update({_id: Meteor.user()._id},{$addToSet: {'profile.favoriteStoryId': _id}});
    }
  },


  'newPlot': function(plotId,plotAction,plotDetail){

    if(!Meteor.user()) {
      console.log('no user');
      return null;
    }

    if(plotId==="" || plotAction==="" || plotDetail==="") {
      console.log('empty');
      return null;
    }

    var parentPlot = Plots.findOne({_id:plotId});
    if(!parentPlot){
      console.log('no parent found');
      return null;
    }

    var newPlot = {
      storyId: parentPlot.storyId,
      prePlotAction: plotAction,
      plotDetail: plotDetail,
      parentPlotId: parentPlot._id,
      authorId: Meteor.user()._id,
      createdAt: new Date()
    };


    //insert new plot
    var PlotId = Plots.insert(newPlot, function(err, result){

      if(err) {
        console.log(err);
        return null;
      }

      //new child plot for the parent
      var newChildForParent = {
        "plotId": result,
        "actionBrief": plotAction,
        "createdAt": new Date()
      };

      console.log(newChildForParent);

      var newPlotId = result;
      var future = new Future();

      //update parent plot
      var theId = Plots.update({_id:parentPlot._id},{$push: {'childPlot':newChildForParent}},function(err,result){

        if(err) {
          console.log(err);
          return null;
        }

        console.log('newplotid: '+newPlotId);
        console.log(result);

        future["return"](newPlotId);

        return future.wait();

      });

      return future.wait();

    });


  },


  'storyline.init': function(storyId){

    if(!Meteor.user()) {
      console.log('no user');
      return null;
    }

    if(storyId==="") {
      console.log('empty');
      return null;
    }

    var story = Storys.findOne({_id:storyId});
    if(!story){
      console.log('null story');
      return null;
    }

    var newStoryline = {
      storyId: storyId,
      userId: Meteor.user()._id,
      plotList: [],
      createdAt: new Date()
    };

    Storys.insert(newStoryline,function(err,result){

      if(err){
        console.log(err);
        return null;
      }

      if(result){
        return result;
      }

    });

  }


});
