const User = require('./User');
const Comment = require('./Comment');
const Blog = require('./Blog');

//each post is associated with a single user
Blog.belongsTo (User, {
    foreignKey : 'user_id', 
} );

//each comment is associated with a single blog
Comment.belongsTo (Blog, {
    foreignKey : 'post_id'
});
//each comment is associated with a single user
Comment.belongsTo (User, {
    foreignKey : 'user_id'
});

//each user can make many posts 
User.hasMany (Blog, { 
    foreignKey: 'user_id', 
    onDelete: 'CASCADE', 
});

//each user can make many comments 
User.hasMany(Comment, {
    foreignKey: 'user_id' , 
    onDelete: 'CASCADE', 
});

//each post can have many comments 
Blog.hasMany(Comment, {
    foreignKey: 'post_id' , 
    onDelete: 'CASCADE', 
});

// Export the models
module.exports = { User, Blog, Comment };
