Webcam.set({
    width: 350,
height: 300,
img_format: 'png',
png_quality : 90
});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="' + data_uri + '" >';
    });
};

console.log("ml5version" , ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/JdKjTPYMZ/model.json" , modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth=window.speechSynthesis;
    var utterThis=new SpeechSynthesisUtterance("testing the speech code... rum pum pum parey. rum rum pum pum parey! la la la ley la la la, lay lay!");
    synth.speak(utterThis);
}

speak();
var prediction_1 = "";

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if (prediction_1 == "Like") {
            document.getElementById("update_emoji").innerHTML = "&#128077";
        }
        if (prediction_1 == "Dislike") {
            document.getElementById("update_emoji").innerHTML = "&#128078";
        }
        if (prediction_1 == "Victory") {
            document.getElementById("update_emoji").innerHTML = "&#9996";
        }
        if (prediction_1 == "Amazing") {
            document.getElementById("update_emoji").innerHTML = "&#128076"
        }
    }
}