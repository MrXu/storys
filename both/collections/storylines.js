/**
 * Created by xuwei on 19/9/15.
 */
/**
 * Created by xuwei on 16/9/15.
 */
Storylines = new Mongo.Collection('storylines');

Storylines.before.insert(function (userId, doc) {
    doc.createdAt = new Date();
});

Storylines.helpers({
    datePosted: function () {
        return moment(this.createdAt).format('M/D');
    },
    author: function () {
        return Meteor.users.findOne({_id: this.userId});
    }
});

RegExp.escape = function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

Storylines.attachSchema(new SimpleSchema({

    storyId: {
        type: String
    },
    userId: {
        type: String
    },
    plotList: {
        type: [String],
        optional: true,
        defaultValue: []
    },
    createdAt: {
        type: Date
    }
}));
