const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

const userData = require("./userData.json");
const blogData = require("./blogData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  // Sync the Sequelize models with the database and force the creation of new tables
  await sequelize.sync({ force: true });

  // Bulk create users using the userData array, with individual hooks enabled and returning the created records
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Create blogs and store them in the `blogs` variable
  const blogs = [];
  for (const blog of blogData) {
    const createdBlog = await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    blogs.push(createdBlog);
  }

  // Iterate over each comment in commentData and create a new comment 
  // with randomly assigned user_id and post_id
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: blogs[Math.floor(Math.random() * blogs.length)].id,
    });
  }

  // Exit the process, indicating that the database seeding is complete
  process.exit(0);
};

// Invoke the seedDatabase function to initiate the database seeding
seedDatabase();
