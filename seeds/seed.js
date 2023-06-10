const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  // Sync the Sequelize models with the database and force the creation of new tables
  await sequelize.sync({ force: true });

  // Bulk create users using the userData array, with individual hooks enabled and returning the created records
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Create posts and store them in the `posts` variable
  const posts = [];
  for (const post of postData) {
    const createdPost = await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    posts.push(createdPost);
  }

  // Iterate over each comment in commentData and create a new comment 
  // with randomly assigned user_id and post_id
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
    });
  }

  // Exit the process, indicating that the database seeding is complete
  process.exit(0);
};

// Invoke the seedDatabase function to initiate the database seeding
seedDatabase();
