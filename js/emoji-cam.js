// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "models/tm-my-image-model/";

let model, webcam, labelContainer, maxPredictions;

var pause = false;
var display = false;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

init(); 

async function loop() {
    webcam.update(); // update the webcam frame
    //setTimeout(() => { predict(); }, 1000);
    //setTimeout(() => { window.requestAnimationFrame(loop); }, 1000);
    window.requestAnimationFrame(loop);
}

$("#clear-button").click(async function () {
  textClear();
});

$("#enter-button").click(async function () {
  await predict();
});

var checkbox = document.querySelector("input[name=checkbox]");
checkbox.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");
    display=true;
  } else {
    console.log("Checkbox is not checked..");
    display=false;
  }
});

// run the webcam image through the image model
async function predict() {
    var classPrediction=[];
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        classPrediction[i] = prediction[i].probability.toFixed(2);
        if(display){
          labelContainer.childNodes[i].innerHTML =
          prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        }
        else {
          labelContainer.childNodes[i].innerHTML  = ""
        }
    }
    await type_emoji(classPrediction);
}

async function type_emoji(probs) {
  var max = probs[0];
  var maxIndex = 0;

  var emojis = [String.fromCodePoint(0x1F44B), String.fromCodePoint(0x1F44D),
                String.fromCodePoint(0x1F44E), String.fromCodePoint(0x270C),
                String.fromCodePoint(0x1F44C)]

  for(var i = 0; i < (probs.length-1); i++) {
    if(probs[i]>max){
      maxIndex = i;
      max = probs[i];
    }
  }

  if(max>=0.85){
    textWrite(emojis[maxIndex]);

  }

}

var textWrite = (c)=> {
  document.getElementById("text").value += c;
}
var textClear = () => {
  document.getElementById("text").value = "";
}
