const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
  title: String,
  content: String,
}, {
  timestamps: true,
})



const leagueSchema = new Schema({
  sleeperLeagueId: { type: String, required: true},
  blogs: [blogSchema]
})


module.exports = mongoose.model('League', leagueSchema)