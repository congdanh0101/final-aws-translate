
const AWS = require('aws-sdk')
const AWSconfig = AWS.config.loadFromPath('./config.json')
const fs = require('fs')
const translate = new AWS.Translate(AWSconfig)
const polly = new AWS.Polly(AWSconfig)
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

        polly.synthesizeSpeech(input, (err, data) => {
            if (err) {
                console.log('err', err)
                return
            }
            const NameOfAudio = randomNameOfAudio()
            if (data.AudioStream) {

                fs.writeFile(`${NameOfAudio}.mp3`, data.AudioStream, (err) => {

                })
                res.json(NameOfAudio);
            }
        })
    }


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