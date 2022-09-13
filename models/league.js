const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  body: String,
}, {
  timestamps: true,
})



const leagueSchema = new Schema({
  sleeperLeagueId: { type: String, required: true},
  blogsList: [postSchema]
})


module.exports = mongoose.model('League', leagueSchema)