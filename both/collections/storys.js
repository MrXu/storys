/**
 * Created by xuwei on 16/9/15.
 */
/**
 * Created by xuwei on 16/9/15.
 */
Storys = new Mongo.Collection('storys');

Storys.before.insert(function (userId, doc) {
    doc.createdAt = new Date();
});

Storys.helpers({
    datePosted: function () {
        return moment(this.createdAt).format('M/D');
    },
    author: function () {
        return Meteor.users.findOne({_id: this.authorId});
    }
});

RegExp.escape = function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

Storys.search = function(query) {
    if (!query) {
        return;
    }
    return Storys.find({
        name: { $regex: RegExp.escape(query), $options: 'i' }
    }, {
        limit: 20
    });
};

Storys.attachSchema(new SimpleSchema({
    storyName: {
        type: String,
        autoform: {
            'label-type': '故事名',
            placeholder: '起个牛X的故事名'
        },
        max: 300
    },
    storyBrief: {
        type: String,
        autoform: {
            'label-type': '故事梗概',
            placeholder: '长话短说，开个头就好'
        },
        max: 1200
    },
    firstPlotId: {
        type: String,
        optional: true
    },
    authorId: {
        type: String,
        autoValue: function () {
            if (this.isSet) {
                return;
            }
            if (this.isInsert) {
                return Meteor.userId();
            } else {
                this.unset();
            }
        }
    },
    createdAt: {
        type: Date
    }
}));
