const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;
  //console.log(firstName,lastName,email);
   const data={
     members:[
       {
         email_address:email,
         status:"subscribed",
         merge_fields:{
           FNAME:firstName,
           LNAME:lastName,
         }
       }
     ]
   };

   const jsonData=JSON.stringify(data);
   const url="https://us17.api.mailchimp.com/3.0/lists/38a87a4c6c";
   const options={
     method:"POST",
     auth:"suhani:f0b9f356953e3988fd7c3925bd305175-us17",
   }
   const request=https.request(url,options,function(response){
     if(response.statusCode===200){
       res.sendFile(__dirname+"/success.html");
     }
     else{
       res.sendFile(__dirname+"/failure.html");
     }
     response.on("data",function(data){
       //console.log(JSON.parse(data));
     });
   });
   request.write(jsonData);
   request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT ||"3000",function(req,res){
  console.log("server is running on 3000");
});



//api key
//f0b9f356953e3988fd7c3925bd305175-us17

//list id
//38a87a4c6c
