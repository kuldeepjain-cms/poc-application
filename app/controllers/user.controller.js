const User  =   require('../models/user.model');

exports.fetch   =   function (req, res) {
    User.find({}, (err, records) => {
        if( !isEmpty(records) ) res.status(200).json(records);
        else res.status(404).json( { message: "no records avaialble.." } )
        
    })
    
};

exports.userDetails =   function(req, res) {
    User.findById(req.params.id, function (err,user) {
        if (err) return next(err);
        if( !isEmpty(user) ) res.status(200).send(user);
        else res.status(404).json( { message: "no records avaialble.." } )
    })
};

exports.create  =   function (req, res, next) {
   
    let newUser = new User(
        {
            name    : req.body.name,
            age     : req.body.age,
            mobile  : req.body.mobile
        }
    );

    newUser.save(function (err) {
        if (err) {
            res.status(404).json( { message: "Error in validation" });
            return false;
           
        }
        res.status(200).json( { message: "User added successfully" } )
    })
};

exports.update  =   function (err, req, res, next) {

    User.findOneAndReplace(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.status(200).json( { message: "User detail updated successfully" } )
    });
};

exports.delete  =   function (req, res, next) {
    User.findOneAndDelete(req.params.id, function (err) {
        if (err) return next(err);
        res.status(200).json( { message: "User deleted successfully" } )
    })
};

// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}