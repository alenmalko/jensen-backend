const credentials = {secretuser:"user" , secretpassword:"password"}
const cors = require("cors")
const express = require("express")
const app = express()    
process.env.PORT = 3000


app.use(cors())
app.get("/", (req ,res)=>{
  const encodedauth = (req.headers.authorization || '')
    .split('')[1] || '' // getting the part after basic

const [user, password] = Buffer.from(encodedauth, 'base64')
   .toString().split(':')
   if(user===credentials.secretuser && password===credentials.secretpassword){
      res.status(200).send({"STATUS":"SUCCESS"})
   }else{
         res.set('www-authenticate', 'basic realm="access to index"')
         res.status(401).send("unauthorrised access")
   }
})

app.listen(3000 , ()=>{
    console.log('STARTED LISTENING ON PORT ${process.env.PORT}')
});