/**
 * Created by xuwei on 17/9/15.
 */
Template.newPlot.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('plotCompo', Router.current().params._id);
    }.bind(this));
};

Template.newPlot.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};

Template.newPlot.helpers({
    plot: function(){
        return Plots.findOne({_id: Router.current().params._id});
    }
});

Template.newPlot.events({
    "submit #newPlotForm": function(event){
        event.preventDefault();

        if (!Meteor.user()) {
            IonModal.open('signIn');
            return;
        }

        //get value
        var plotAction = event.target.plotAction.value;
        var plotDetail = event.target.plotDetail.value;
        console.log(plotAction + ' ' + plotDetail);

        //validation
        if(plotAction==="" || plotDetail==="") return;

        //call function
        Meteor.call("newPlot",Router.current().params._id,plotAction,plotDetail,function(err,data){
            if(err){
                console.log("Add new plot failed");
            }
            if(data){
                console.log("Add success " + data);
                Router.go('plotA', {_id: data});
            }
            else{
                Router.go('plotA', {_id: Router.current().params._id});
            }

        });

    }
});