Meteor.startup(function() {

  /**
   * clear testing data
   */

  Plots.remove({});
  Storys.remove({});

  /**
   * testing data
   * @type {*[]}
   */


  var seedStorys = [
    {
      storyName: '蝴蝶效应',
      storyBrief: '一只蝴蝶在巴西扇动翅膀，有可能会在美国的德克萨斯引起一场龙卷风。事物发展的结果，对初始条件具有极为敏感的依赖性，初始条件的极小偏差，都将可能会引起结果的极大差异。'
    },
    {
      storyName: '敲门',
      storyBrief: '当地球只剩下一个人的时候，他听见了敲门声。'
    }
  ];

  var seedPlotOne = [
    {
      prePlotAction: 'say hello',
      plotDetail: '一只蝴蝶在巴西扇动翅膀，有可能会在美国的德克萨斯引起一场龙卷风。事物发展的结果，对初始条件具有极为敏感的依赖性，初始条件的极小偏差，都将可能会引起结果的极大差异。',
      childPlot: [
        {
          plotId: 'randomid',
          actionBrief: 'random action',
          createdAt: new Date()
        },
        {
          plotId: 'randomid',
          actionBrief: 'random action',
          createdAt: new Date()
        }
      ]
    }
  ];

  var users = [
    {
      emails: [{
        address: 'nick@exygen.io',
        verified: false,
        primary: true
      }],
      profile: {
        name: 'nickw'
      },
      services: {
        'meteor-developer': {
          id: '2jefqB8rsQ2q3TuRW',
          username: 'nickw',
          emails: [{
            address: 'nick@exygen.io',
            verified: false,
            primary: true
          }]
        }
      }
    }
  ];


  /**
   * seed users
   */
  if (Meteor.users.find({}).count() === 0) {
    _(users).each(function (user) {
      Meteor.users.insert(user);
    });
  }

  var author = Meteor.users.findOne({});
  /**
   * seed story
   */
  if(Storys.find({}).count() === 0) {
    _(seedStorys).each(function(story){
      Storys.insert({
        storyName: story.storyName,
        storyBrief: story.storyBrief,
        createdAt: new Date(),
        authorId: author._id
      });
    });
  }


  /**
   * seed plot
   */
  var astory = Storys.findOne({});
  if(Plots.find({}).count() === 0) {
    _(seedPlotOne).each(function(plot){
      Plots.insert({
        storyId: astory._id,
        prePlotAction: plot.prePlotAction,
        parentPlotId: astory._id,
        authorId: author._id,
        childPlot: plot.childPlot,
        plotDetail: plot.plotDetail,
        createdAt: new Date()
      });
    });
  }

  var aplot = Plots.findOne();

  Storys.update({_id: astory._id},{$set:{'firstPlotId':aplot._id}});

});
