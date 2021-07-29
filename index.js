require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path');

const router = require('./routes/index')


const app = express()



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('combined'))
app.use(express.static(path.resolve(__dirname, "client", "build")));

app.use(router)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})

async function start () {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(process.env.PORT, () => {
      console.log(`Сервер запущен... на порте ${process.env.PORT}`)
    })
  } catch (e) {
    console.log(e.message)
  }
}

start()