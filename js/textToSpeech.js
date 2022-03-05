let textArea = document.querySelector('textarea'),
    voiceList = document.querySelector('select'),
    speechBtn = document.querySelector('button');

let synth = speechSynthesis;
console.log(synth.speak)
isSpeaking = true;
// Function to get and set voices on the  available Device;
function voices() {
    for (let voice of synth.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`
        voiceList.insertAdjacentHTML('beforeend', option)
    }
}

synth.addEventListener('voiceschanged', voices);

function textToSpeech(text) {
    // add voice to a selected speaker;
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            utterance.voice = voice;
        }
    }
    speechSynthesis.speak(utterance);

}

speechBtn.addEventListener('click', e => {
    let text = textArea.value;
    if (textArea !== "") {
        if (!synth.speaking) { // if the speech state is false;
            textToSpeech(text);

        }
        if (text.length > 20) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech"
            } else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech"
            }
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    // speechBtn.innerText = "convert to Speech";
                    speechBtn.innerText = "Convert To Speech";
                }
            }, 100)
        } else {

            speechBtn.innerText = "Convert To Speech";
        }

    }


})