//storys
Meteor.publishComposite('user', function(_id) {
  return {
    find: function() {
      return Meteor.users.find({_id: _id});
    }
  };
});

Meteor.publish('storys',function(){
  return Storys.find();
});
Meteor.publishComposite('storyCompo', function (_id) {
  return {
    find: function(){
      return Storys.find({_id: _id});
    },
    children: [
      {
        find: function(story){
          return Meteor.users.find({_id: story.authorId});
        }
      }
    ]
  }
});
Meteor.publish('storySearch', function(query) {
  check(query, String);

  if (_.isEmpty(query)) {
    return this.ready();
  }

  return Storys.search(query);
});
Meteor.publishComposite('plotCompo',function(_id){
  return {
    find: function(){
      return Plots.find({_id: _id});
    },
    children: [
      {
        find: function(plot){
          return Plots.find({_id: plot.parentPlotId});
        }
      },
      {
        find: function(plot){
          return Storys.find({_id:plot.storyId});
        }
      }
    ]
  }
});
//storys end










Meteor.publish('products', function() {
  return Products.find();
});

Meteor.publish('productsSearch', function(query) {
  check(query, String);

  if (_.isEmpty(query)) {
    return this.ready();
  }

  return Products.search(query);
});

Meteor.publishComposite('product', function(_id) {
  return {
    find: function() {
      return Products.find({_id: _id});
    },
    children: [
      {
        find: function(product) {
          return Meteor.users.find({_id: product.userId});
        }
      },
      {
        find: function(product) {
          return Meteor.users.find({_id: product.voterIds});
        }
      },
      {
        find: function(product) {
          return Comments.find({productId: product._id});
        },
        children: [
          {
            find: function(comment) {
              return Meteor.users.find({_id: comment.userId});
            }
          }
        ]
      }
    ]
  };
});


