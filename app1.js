 var http=require('http');
var mysql = require('mysql'); //mysql 
var express=require('express');   //localhost connections
var bodyParser=require('body-parser'); // used in post function

var urlParser=bodyParser.urlencoded({extended:false});
var app=express();
var name="";
app.use(express.static(__dirname +'/public'));
var cart = {};

app.get('/',function(req,res){ 
    res.render('firstPage.ejs');
})
.get("/login", (req, res) => {
	res.render("login.ejs");
})
.get('/register', (req,res) => {
    res.render("register.ejs");
})
.get('/index', (req,res) => {
    res.render("index.ejs",{name:name});
})
.get('/ni', (req,res) => {
    res.render("ni.ejs");
})
.get('/si', (req,res) => {
    res.render("si.ejs");
})
.get('/chinese', (req,res) => {
    res.render("chinese.ejs");
})
.get('/snacks', (req,res) => {
    res.render("snacks.ejs");
})
.get('/combo', (req,res) => {
    res.render("combo.ejs");
})
.get('/desert', (req,res) => {
    res.render("desert.ejs");
})
.get('/cart', (req,res) => {
	var sql="select * from food";
	con.query(sql,function(err,result,fields){
       if(err) throw err;
       if(result.length>0)
       {
       	// console.log(result[0]);
       	dict={};
       	for(var i=0;i<result.length;i++)
       		dict[result[i].foodName]=result[i].foodPrice;
       	//console.log("cart:",cart);
       	//console.log("db:",dict);
       	res.render("cart.ejs",{cart:cart,price:dict});
       }
	});
    
})
.get('/lastPage', (req,res) => {
    res.render("lastPage.ejs",{name:name});
})

.post('/login',urlParser,function(req,res){

    var sql='select name from customers where emailId=? and password=?';
    con.query(sql,[req.body.emailId,req.body.password],function(err,result,fields)
    {
        
        if(err) throw err;
        if(result.length>0)
        {
        	name=result[0].name;
            res.redirect('/index');
        }
        else
        {
            res.render('login.ejs',{status:"Invalid Username or Password"});            
        }
    });
})

.post('/register',urlParser,function(req,res)
{

    var sql="insert into customers(name,emailId,password) values(?,?,?)"
    var values=[req.body.name,req.body.emailId,req.body.password]
    con.query(sql,values,function(err,result,fields){
        if(err) throw err;

    res.redirect('/login')

    })
    //console.log(req.body);
})
.get("/add_cart",urlParser,function(req,res){
	console.log(req.query);
	if(cart[req.query.item]>=0)
		cart[req.query.item]+=1;
	else
		cart[req.query.item]=1;
	//console.log(cart);

	res.redirect("/index");
})	


.listen(8080);



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "adeeb",
  database:"mydb"
});



con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});