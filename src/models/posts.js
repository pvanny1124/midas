//To be implemented

module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define('comments', {
        text: {
            type: DataTypes.STRING
        },
        author: {
           //
        }
    });

        return Post;
}