'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    content: DataTypes.STRING
  });
    // classMethods: {
    //   associate: function(models) {
    //     // associations can be defined here
    //   }
  Comment.associate = function(models){
      Comment.belongsTo(models.Pet);
  };
    return Comment;
};
