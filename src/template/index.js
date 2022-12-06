// const axios = require('axios')

async function doTranslate() {
    const respone = await fetch('http://localhost:3000/translate', {
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
    return param
}

function doSynthesizeSpeechhInput() {
    var text = document.getElementById('inputText').value.trim();
    var sourceDropdown = document.getElementById("sourceLanguageCodeDropdown");
    var sourceLanguageCode = sourceDropdown.options[sourceDropdown.selectedIndex].value;

    const param = {
        text: text,
        languageCode: sourceLanguageCode
    }

    doSynthesizeSpeech(param)

    // setTimeout(playAudioInput(), 1500)
}

function doSynthesizeSpeechOutput() {
    var text = document.getElementById('inputText').value.trim();
    var targetDropdown = document.getElementById("targetLanguageCodeDropdown");
    var targetLanguageCode = targetDropdown.options[targetDropdown.selectedIndex].value;

    const param = {
        text: text,
        languageCode: targetLanguageCode
    }
    return param
}

async function doSynthesizeSpeech(param) {
    const respone = await fetch('http://localhost:3000/speech', {
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
    console.log(data)
}



function playAudioInput() {
    var audioInput = document.getElementById('audioInput')
    var audioOutput = document.getElementById('audioOutput')

    if (audioOutput.duration > 0 && !audioOutput.paused) {
        audioOutput.pause();
        audioOutput.currentTime = 0;
    }

    audioInput.play()
}

function pauseAudioInput() {
    var audioInput = document.getElementById('audioInput')
    if (audioInput.duration > 0 && !audioInput.paused) {
        audioInput.pause();
        audioInput.currentTime = 0;
    }
}

function playAudioOutput() {
    var audioInput = document.getElementById('audioInput')
    var audioOutput = document.getElementById('audioOutput')

    if (audioInput.duration > 0 && !audioInput.paused) {
        audioInput.pause();
        audioInput.currentTime = 0;
    }

    audioOutput.play()
}

function pauseAudioOutput() {
    var audioOutput = document.getElementById('audioOutput')
    if (audioOutput.duration > 0 && !audioOutput.paused) {
        audioOutput.pause();
        audioOutput.currentTime = 0;
    }
}