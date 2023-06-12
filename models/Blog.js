// Import necessary dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create Task model by extending the Sequelize Model class
class Blog extends Model {}

// Initialize Task model with column definitions and options
Blog.init(
  {
    // Define the 'id' column
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    // Define the 'postHeader' column
    postHeader: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Define the 'postText' column  
    postText: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    // Define the 'CreatedAt' column
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    // Define the 'user_id' column as a foreign key referencing the 'id' column of the 'user' model
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
      },
    },
  },
  {
    // Provide the Sequelize connection and other configuration options
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
  }
);

// Export the Blog model
module.exports = Blog;
