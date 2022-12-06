const AWS = require('aws-sdk')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const AWSconfig = AWS.config.loadFromPath('./config.json')

const translate = new AWS.Translate(AWSconfig)


// translate.translateText(param, (err, data) => {
//     console.log('err', err)
//     console.log('data', data)
// })

app.post('/translate', (req, res) => {
    const param = req.body
    translate.translateText(param, (err, data) => {
        res.send(data)
    })
})

app.listen(3000, () => console.log(`Server is running at port ${3000}`))