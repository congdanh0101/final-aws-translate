const AWS = require('aws-sdk')
const AWSconfig = AWS.config.loadFromPath('./config.json')
const fs = require('fs')
const translate = new AWS.Translate(AWSconfig)
const polly = new AWS.Polly(AWSconfig)
const s3 = new AWS.S3(AWSconfig)
const Blob = require('buffer')
const uuid = require('uuid')
class AwsController {

    doTranslate(req, res) {
        const param = req.body
        translate.translateText(param, (err, data) => {
            res.send(data)
        })
    }

    doSynthesizeSpeech(req, res) {
        const data = req.body
        console.log(data)
        const voiceId = doValidateLanguageCode(data.languageCode)
        if (!voiceId) return res.status(400).json({
            message: 'language'
        })
        if (!data.text) return res.status(400).json({
            message: 'blank'
        })
        const input = {
            Engine: "standard",
            OutputFormat: "mp3",
            SampleRate: "8000",
            Text: data.text,
            TextType: "text",
            VoiceId: voiceId
        }

        polly.synthesizeSpeech(input, async (err, data) => {
            if (err) {
                console.log('err', err)
                return
            }
            const NameOfAudio = randomNameOfAudio()
            if (data.AudioStream) {
                // fs.writeFile(`./mp3/${NameOfAudio}.mp3`, data.AudioStream, (err) => {
                // })
                const filename = `${NameOfAudio}.mp3`
                const bucket = 'translate-nodejs/mp3'
                const link = await uploadAudio(filename, bucket, data.AudioStream)
                console.log(link)
                res.json(NameOfAudio);
            }
        })
    }
}

function uploadAudio(filename, bucketname, file) {
    return new Promise((resolve, reject) => {
        const params = {
            Key: filename,
            Bucket: bucketname,
            Body: file,
            ContentType: 'audio/mpeg',
            ACL: 'public-read'
        }
        // const s3 = new AWS.S3({
        //     accessKeyId: "ASIAZDQBBYPZZMZD5NG7",
        //     secretAccessKey: "LRnJ6Krj1cka1YTirky2he63uNf0WhCk27FHSY3r",
        //     sessionToken: 'FwoGZXIvYXdzEMb//////////wEaDBI6bXEx3AMaEPS6wiLPAQwL2M0X+bIlByWhBc6HR7cebZdZ1+jrTuhd8UDNoknvshxTP0qbdCQ66TtbfDfHydg22vITuVwviXUUny5IR5rvRM/cLiFo5M2c3PcK1VGqNeop23l/xIjUnGY2/bHvil1auGiocGaqW3U1/b+N7jH2scv6+KdeqE7q3Tegs8MVYOFlNQ39zpcG9oZOBQzLUF1kE1MW8rlFPVdoV1V9rncWGXydhb0lRUfNJRTE5+aOSuNlC9j4b5KhdieFXJVpwt0OiJJuZrUBMuV8xLchOiie2eicBjItK2Zh9H1E8LMpP7ofxHQ8b+2ddmalAoQ+c9GmEkEEXZ8v9Dn5cEySRBnalet4'
        // })

        s3.upload(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

function doValidateLanguageCode(languageCode) {
    var voiceId;
    switch (languageCode) {
        case "ar":
            voiceId = "Zeina";
            break;
        case "da":
            voiceId = "Mads";
            break;
        case "nl":
            voiceId = "Ruben";
            break;
        case "de":
            voiceId = "Marlene";
            break;
        case "zh":
            voiceId = "Zhiyu";
            break;
        case "en":
            voiceId = "Joanna";
            break;
        case "es":
            voiceId = "Penelope";
            break;
        case "fr":
            voiceId = "Celine";
            break;
        case "pt":
            voiceId = "Vitoria";
            break;
        case "ja":
            voiceId = "Takumi";
            break;
        case "ko":
            voiceId = "Seoyeon";
            break;
        case "ru":
            voiceId = "Maxim";
            break;
        default:
            voiceId = null;
            break;
    }
    return voiceId;
}

function randomNameOfAudio() {
    return uuid.v4().split("-")[0] + uuid.v4().split("-")[4]
}


module.exports = new AwsController()
