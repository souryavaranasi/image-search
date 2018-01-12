var mongoose=require('mongoose');
var searchSchema= new mongoose.Schema({
  searchterm:String,
  created_at:{type: Date, default:Date.now}
});
module.exports=mongoose.model('Search',searchSchema);