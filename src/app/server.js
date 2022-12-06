const AWS = require('aws-sdk')
const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const router = require('./route')
app.use(express.json())
app.use(cors())
// const AWSconfig = AWS.config.loadFromPath('./config.json')

// const translate = new AWS.Translate(AWSconfig)
// const polly = new AWS.Polly(AWSconfig)

// const input={
//     Engine:"standard",
//     OutputFormat: "mp3",
//     SampleRate: "8000", 
//     Text: "Hello everybody. Today i feel so good", 
//     TextType: "text", 
//     VoiceId: "Joanna"
// }

// polly.synthesizeSpeech(input,(err,data)=>{
//     if(err) {
//         console.log('err',err)
//         return
//     }
//     if(data.AudioStream){
//         fs.writeFile('voice.mp3',data.AudioStream,(err)=>{

//         })
//     }
// })

// translate.translateText(param, (err, data) => {
//     console.log('err', err)
//     console.log('data', data)
// })

// app.post('/translate', (req, res) => {
//     const param = req.body
//     translate.translateText(param, (err, data) => {
//         res.send(data)
//     })
// })
app.use(router)

app.listen(3000, () => console.log(`Server is running at port ${3000}`))