var ProfileCoursesModel = require("../models/profileCoursesModel");

var getCourseListForUser = function (userId) {
  return new Promise((resolve,reject) => {
    ProfileCoursesModel.findOne({userId: userId}, function (err, lectureObj) {
      if (err) {
        reject(err);
      } else {
        console.log('~~~', lectureObj.lectureList);
        resolve(lectureObj.lectureList);
      }
    });
  });
};







var addUser = function (newUser) {
  return new Promise((resolve,reject) => {
    ProfileCoursesModel.findOne({ email: newUser.email }, function (err, courseList) {
      if (courseList) {
        reject("user already exists");
      } else {
        ProfileCoursesModel.count({}, function (err, num) {
          newUser.userId = num + 1
          var mongoUser = new ProfileCoursesModel(newUser);
          mongoUser.save();
          resolve(newUser);
        });
      }
    });
  })
}

module.exports = {
  getCourseListForUser: getCourseListForUser,
  addUser: addUser
}
