const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')

const router = require('./routes/index')

const cors = require('cors')


const app = express()
const {port, url} = require('./config/index')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('combined'))
app.use(router)



async function start () {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(port, () => {
      console.log(`Сервер запущен... на порте ${port}`)
    })
  } catch (e) {
    console.log(e.message)
  }
}

start()