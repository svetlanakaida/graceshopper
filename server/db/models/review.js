const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      is: /[1-5]/i
    }
  }
});

module.exports = Review;