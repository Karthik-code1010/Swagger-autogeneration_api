const express = require('express');
const app = express();
const swaggerFile = require('./autojson/swagger-output.json')
const swaggerUI = require('swagger-ui-express');
const jsonwebtoken = require("jsonwebtoken");
var cors = require('cors');

app.use(cors());

var options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: 'http://localhost:9000/books',
        name: 'Spec1'
      },
      {
        url: 'http://petstore.swagger.io/v2/swagger.json',
        name: 'Spec2'
      }
    ],
    
  }
}
// Setup express static middleware to look for files in the api directory for all requests starting with /api
app.use('/autojson', express.static('autojson') , function(req, res){
  // Optional 404 handler
  res.status(404);
  res.json({error:{code:404}})
});

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile,options));



app.get('/getjson', (req, res) => {
 // #swagger.ignore = true
  res.status(200).send(swaggerFile)
 
});


app.get('/books', (req, res) => {
 
      res.status(200).send(swaggerFile);
      
});




app.post('/books', (req, res) => {
    /* #swagger.security = [{
               "bearerAuth": []
        }] */
  
    //const data = req.body.obj
    var apph = JSON.stringify(req.headers);
    console.log('karthik',JSON.stringify(req.headers));
    console.log(1);
    console.log(apph);
    var head= JSON.parse(apph);
    console.log(head);
    console.log(2);
    if(head.authorization == undefined){
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }else{
      console.log(head["authorization"]);
   
      console.log(head.authorization);
      console.log(head["host"]);
      console.log(head.host);
      var tokenstring = head.authorization;
      var tokenarr = tokenstring.split(" ");
      console.log(tokenarr[0]);
      console.log(tokenarr[1]);
      var orgtoken = tokenarr[1];
      //const data2 = req.body.id
    if (!orgtoken) return res.status(401).send({ auth: false, message: 'No token provided.' });
          
    jsonwebtoken.verify(orgtoken,'kjkjkjkjkjjhjhjhjhjhjhlj', function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            
            res.status(200).send(swaggerFile);
          });

    }

   
 // res.status(201).send();
});
app.get("/home",async(req,res)=>{
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin, Cache-Control')
  res.header('Access-Control-Allow-Methods', 'GET')
      /* #swagger.security = [{
               "bearerAuth": []
        }] */
  
    //const data = req.body.obj
    var apph = JSON.stringify(req.headers);
    console.log('karthik',JSON.stringify(req.headers));
    console.log(1);
    console.log(apph);
    var head= JSON.parse(apph);
    console.log(head);
    console.log(2);
    if(head.authorization == undefined){
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }else{
      console.log(head["authorization"]);
   
      console.log(head.authorization);
      console.log(head["host"]);
      console.log(head.host);
      var tokenstring = head.authorization;
      var tokenarr = tokenstring.split(" ");
      console.log(tokenarr[0]);
      console.log(tokenarr[1]);
      var orgtoken = tokenarr[1];
      //const data2 = req.body.id
    if (!orgtoken) return res.status(401).send({ auth: false, message: 'No token provided.' });
          
    jsonwebtoken.verify(orgtoken,'kjkjkjkjkjjhjhjhjhjhjhlj', function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            
            res.status(200).send('home page');
          });

    }



})

app.get("/",async(req,res)=>{


  let token = await jsonwebtoken.sign({
      date: new Date
  },"kjkjkjkjkjjhjhjhjhjhjhlj",{
      expiresIn: 60
  })
  console.log(token);
  res.json({
      message: "Success",
      token
  })
})
app.get("/check/:token", async (req, res)=>{
  console.log(req.params.token);
  let token = req.params.token;
    /* #swagger.security = [{
               "bearerAuth": []
        }] */

  try{
      
  let tokenResult = await jsonwebtoken.verify(token,"kjkjkjkjkjjhjhjhjhjhjhlj")
  console.log(tokenResult);
      if(tokenResult)
      {
          res.json({
              message: "Success",
              date: new Date(tokenResult.date).getDate(),
           
          });

      }else{
          res.status(500).json({
              message: "Something Error"
          })
  
      }
      
  } catch (error){
      res.status(401).json({
          message: "error"
      })

  }



})

app.post('/definitions', (req, res) => {
   /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Add a user',
                schema: { $ref: '#/definitions/Pet' }
        } */
  res.status(201).send();
});



var server = app.listen(9000, () => {

  var host = server.address().address
  var port = server.address().port
 
  console.log("Example app listening at http://%s:%s", host, port)
 
 })

//app.listen(9000, () => console.log("listening on 9000"));
