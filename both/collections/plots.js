/**
 * Created by xuwei on 16/9/15.
 */
Plots = new Mongo.Collection('plots');

Plots.before.insert(function (userId, doc) {
    doc.createdAt = new Date();
});

Plots.helpers({
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

Plots.search = function(query) {
    if (!query) {
        return;
    }
    return Plots.find({
        name: { $regex: RegExp.escape(query), $options: 'i' }
    }, {
        limit: 20
    });
};

Plots.attachSchema(new SimpleSchema({

    storyId: {
        type: String
    },
    prePlotAction: {
        type:String,
        max: 300
    },
    plotDetail: {
        type: String,
        autoform: {
            'label-type': 'placeholder',
            placeholder: '故事内容'
        },
        max: 3000
    },
    parentPlotId: {
        type: String
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
    childPlot: {
        type: Array,
        optional: true,
        minCount: 0
    },
    "childPlot.$": {
        type: Object,
        optional: true
    },
    "childPlot.$.plotId": {
        type: String
    },
    "childPlot.$.actionBrief": {
        type: String
    },
    "childPlot.$.createdAt": {
        type: Date
    },
    createdAt: {
        type: Date
    }
}));
