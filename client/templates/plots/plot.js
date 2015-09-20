/**
 * Created by xuwei on 16/9/15.
 */
Template.plot.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('plotCompo', Router.current().params._id);
    }.bind(this));
};

Template.plot.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};

Template.plot.helpers({
    plot: function(){
        return Plots.findOne({_id: Router.current().params._id});
    },
    options: function(){
        //console.log(this);
        if(this.childPlot.length>0){
            var plotList = [];
            for(i=0;i<this.childPlot.length;i++){
                var temp = {
                    plotId:{_id:this.childPlot[i].plotId},
                    actionBrief: this.childPlot[i].actionBrief,
                    createdAt: this.childPlot[i].createdAt
                }
                plotList.push(temp);
            }
            //console.log(plotList);
            return plotList;
        }
    }
});