const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//each post is associated with a single user
Post.belongsTo (User, {
    foreignKey : 'user_id', 
} );

//each comment is associated with a single user
Comment.belongsTo (Post, {
    foreignKey : 'post_id'
});

//each user can make many posts 
User.hasMany (Post, { 
    foreignKey: 'user_id', 
    onDelete: 'CASCADE', 
});

//each user can make many comments 
User.hasMany(Comment, {
    foreignKey: 'user_id' , 
    onDelete: 'CASCADE', 
});

//each post can have many comments 
Post.hasMany(Comment, {
    foreignKey: 'post_id' , 
    onDelete: 'CASCADE', 
});