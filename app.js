const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.listen(4000, ()=>{
  console.log("Server is running on http:localhost:4000");
})