//To be implemented

module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define('comments', {
        text: {
            type: DataTypes.STRING
        },
        author: {
            type: 
        }
    });

        return Comment;
}