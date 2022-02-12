Webcam.set( {
    width:340,
    height:340,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach(' #camera ')

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='snapshot' src='" + data_uri + "' >"
    });
}

console.log("ml5 version - " , ml5.version );

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/QvL-zY8vh/model.json", modelLoaded);

function modelLoaded() {
    console.log("model is loaded");
}

prediction1 = "";


function speak() {
    synth = window.SpeechSynthesis;
    speak_data_1 = "the first prediction is" + prediction1;
    utter_this = new SpeechSynthesisUtterance(speak_data_1);
    utter_this.rate = 0.5;
    synth.speak(utter_this);
}

function check() {
    img = document.getElementById("snapshot");
    classifier.classify(img , gotResult);
 

}

function gotResult(error , results) {

    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        document.getElementById("result_emotion_name").innerHTML = prediction1;
        speak();
        if(prediction1 == 'ok') {
            document.getElementById('update_emoji').innerHTML = "&#128076;";
        }
        if(prediction1 == 'thumbsup') {
            document.getElementById('update_emoji').innerHTML = "&#128077;";
        }
        if(prediction1 == 'peace') {
            document.getElementById('update_emoji').innerHTML = "&#9996;";
        } 
       
    }
}