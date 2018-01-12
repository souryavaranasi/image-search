var express= require('express');
var mongoose=require('mongoose');
var bodyParser=require("body-parser");
var cors=require("cors");
mongoose.connect('mongodb://localhost/search_db',{useMongoClient:true});
var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.set('view engine','ejs');
app.use(express.static(__dirname+"/public"));
var Search= require('./models/search');
const Bing=require('node-bing-api')({accKey:'db68144fbe8b481f9e484fcba3f9bbb3'});
//routes
app.get('/api/imagesearch',(req,res)=>{
    res.render('index');
});
app.post('/api',(req,res)=>{
    var searchval={searchterm:req.body.search.term};
    console.log(searchval);
    //create db entry
    Search.create(searchval,function(err,newterm){
        if(err){
            console.log(err);
        }else{
            res.redirect('/api/imagesearch/'+newterm.searchterm);
        }
    })
    
})

app.get('/api/imagesearch/:searchterm',(req,res)=>{
    var searchterm=req.params.searchterm;
    console.log(searchterm);
    Bing.images(searchterm, {
  count: 15,   // Number of results (max 50) 
  offset: 3    // Skip first 3 result 
  }, function(error, response, body){
    console.log(body);
  });
})
app.listen(process.env.PORT,process.env.IP,function(){
    console.log('server started');
});