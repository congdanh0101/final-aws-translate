// const axios = require('axios')

// AWS.config.region = 'us-east-1'; // Region
// AWS.config.credentials = new AWS.Credentials("AKIAVONMUA2J7QLZUT5W", "XTajl2OGK+gbqZP997lQqIxg7HYU8MOy+wTTyfIZ");
// var polly = new AWS.Polly();

const URL_SERVER = `https://3.94.8.37:3000`
//const URL_SERVER = `http://localhost:3000`

async function doTranslate() {
    const respone = await fetch(`${URL_SERVER}/translate`, {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(getParamTranslate())
    })
    // console.log(res)
    const data = await respone.json()
    var outputTextArea = document.getElementById('outputText');
    outputTextArea.value = data.TranslatedText;
}

function getParamTranslate() {
    var inputText = document.getElementById('inputText').value;
    if (!inputText) {
        var outputText = document.getElementById('outputText');
        outputText.value = ""
    }
    var sourceDropdown = document.getElementById("sourceLanguageCodeDropdown");
    var sourceLanguageCode = sourceDropdown.options[sourceDropdown.selectedIndex].value;
    var targetDropdown = document.getElementById("targetLanguageCodeDropdown");
    var targetLanguageCode = targetDropdown.options[targetDropdown.selectedIndex].value;
    const param = {
        SourceLanguageCode: sourceLanguageCode,
        TargetLanguageCode: targetLanguageCode,
        Text: inputText
    }
    console.log(param)
    return param
}

var countDoSynthesizeSpeech = 0;

async function doSynthesizeSpeechInput() {

    var text = document.getElementById('inputText').value.trim();
    var sourceDropdown = document.getElementById("sourceLanguageCodeDropdown");
    var sourceLanguageCode = sourceDropdown.options[sourceDropdown.selectedIndex].value;

    const param = {
        text: text,
        languageCode: sourceLanguageCode
    }

    const src = await doSynthesizeSpeech(param)
    if (src === 'blank') {
        alert("Vui lòng nhập văn bản bạn muốn dịch");
        exit();
    }
    else if (src === 'language') {
        alert("Hiện tại chưa hỗ trợ giọng nói cho ngôn ngữ \"" + param.languageCode + "\"");
        exit();
    }
    else playAudioInput(src)
    countDoSynthesizeSpeech++;
    console.log(countDoSynthesizeSpeech)
}

async function doSynthesizeSpeechOutput() {
    var text = document.getElementById('outputText').value.trim();
    var targetDropdown = document.getElementById("targetLanguageCodeDropdown");
    var targetLanguageCode = targetDropdown.options[targetDropdown.selectedIndex].value;

    const param = {
        text: text,
        languageCode: targetLanguageCode
    }
    console.log(param)

    const src = await doSynthesizeSpeech(param)
    if (src === 'blank') {
        alert("Vui lòng nhập văn bản bạn muốn dịch");
        exit();
    }
    else if (src === 'language') {
        alert("Hiện tại chưa hỗ trợ giọng nói cho ngôn ngữ \"" + param.languageCode + "\"");
        exit();
    }
    else playAudioOutput(src)

}

async function doSynthesizeSpeech(param) {
    const respone = await fetch(`${URL_SERVER}/speech`, {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(param)
    })
    const data = await respone.json()
    if (data.message === 'language') return data.message
    else if (data.message === 'blank') return `blank`
    else return data
}



function playAudioInput(src) {
    addSrcToAudioInput(src)
    var audioInput = document.getElementById('audioInput')
    audioInput.play()
}


function playAudioOutput(src) {
    addSrcToAudioOutput(src)
    var audioOutput = document.getElementById('audioOutput')
    audioOutput.play()
}


function addSrcToAudioInput(src) {
    document.getElementById('audioInput').setAttribute('src', `../../mp3/${src}.mp3`)
}

function addSrcToAudioOutput(src) {
    document.getElementById('audioOutput').setAttribute('src', `../../mp3/${src}.mp3`)
}



function clearInput() {
    document.getElementById('inputText').value = "";
    document.getElementById('outputText').value = "";
}
function download(value) {
    function dataUrl(data) { return "data:x-application/text;charset=utf-8," + encodeURIComponent(data) }
    window.open(dataUrl(value))
}

function swap() {
    var input = document.getElementById('inputText')
    var output = document.getElementById('outputText')
    var targetDropdown = document.getElementById("targetLanguageCodeDropdown");
    var sourceDropdown = document.getElementById("sourceLanguageCodeDropdown");

    if (sourceDropdown.options[sourceDropdown.selectedIndex].value === 'auto') {
        alert(`Can not swap with language auto`)
        exit()
    }

    var inputValue = input.value
    var outputValue = output.value
    input.value = outputValue
    output.value = inputValue


    var temp;
    temp = sourceDropdown.value
    sourceDropdown.value = targetDropdown.value
    targetDropdown.value = temp

    // doTranslate()
}

function addSrcToAudio(src) {
    document.getElementById('audioInput').setAttribute('src', `../../mp3/${src}.mp3`)
}


function clearInput() {
    document.getElementById('inputText').value = "";
    document.getElementById('outputText').value = "";
}
function download(value) {
    function dataUrl(data) { return "data:x-application/text," + escape(data) }
    window.open(dataUrl(value))
}

function swap() {
    var input = document.getElementById('inputText')
    var output = document.getElementById('outputText')
    var targetDropdown = document.getElementById("targetLanguageCodeDropdown");
    var sourceDropdown = document.getElementById("sourceLanguageCodeDropdown");

    if (sourceDropdown.options[sourceDropdown.selectedIndex].value === 'auto') {
        alert(`Can not swap with language auto`)
        exit()
    }

    var inputValue = input.value
    var outputValue = output.value
    input.value = outputValue
    output.value = inputValue


    var temp;
    temp = sourceDropdown.value
    sourceDropdown.value = targetDropdown.value
    targetDropdown.value = temp

    // doTranslate()
}
