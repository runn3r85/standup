var Standup = require("../models/standup.server.model.js");

// Index method
exports.list = function(req, res) {
  var query = Standup.find();

  query.sort({ createdOn: 'desc' })
       .limit(12)
       .exec(function(err, results){
          res.render('index', { title: 'Standup  - List', notes: results })
       });
}

exports.filterByMember = function(req, res) {
  var query = Standup.find();
  var filter = req.body.memberName;

  query.sort({ createdOn: 'desc' });

  if (filter.length > 0) {
    query.where({ memberName: filter });
  }

  query.exec(function(err, results){
    res.render('index', { title: 'Standup  - List', notes: results })
  });
}


// Create Method
exports.create = function(req, res) {
  var entry = new Standup({
    memberName: req.body.memberName,
    project: req.body.project,
    workYesterday: req.body.workYesterday,
    workToday: req.body.workToday,
    impediment: req.body.impediment
  });

  entry.save(function(err){
    if(err) {
      var errMsg = "Sorry, there was an error saving the stand-up meeting note. " + err;
      res.render('newnote', { title: 'Standup - New Note (error)', message: errMsg });
    } else {
      console.log('Standup meeting note was saved.')
      //rediect to home page...
      res.redirect(301, '/');
    }
  });
};

// New Method
exports.getNote = function(req, res) {
  res.render('newnote', {title: 'Standup - New Note'});
}

