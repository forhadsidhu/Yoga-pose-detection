
let video;
// Create a KNN classifier
let knnClassifier = ml5.KNNClassifier();
let poseNet;
let poses = [];
let canvas;
let width = 750;
let height = 750;
let ctx;
var fr =1;

function setup() {
 

  frameRate(fr); // Attempt to refresh at starting FPS
  let cnv=createCanvas(750, 750);

  cnv.position(500, 50);

  video = createVideo(videofile,onLoad);
  video.size(width, height);

  console.log('video file created');
   // Hide the video element, and just show the canvas
   video.hide();

   // Create the UI buttons
   createButtons();


   // Create a new poseNet method with a single detection
   poseNet = ml5.poseNet(video, modelReady);
   // This sets up an event that fills the global variable "poses"
   // with an array every time new poses are detected
   poseNet.on('pose', function(results) {
     poses = results;
   });
   
   requestAnimationFrame(draw)

}


// Add the current frame from the video to the classifier
function addExample(label) {
    // Convert poses results to a 2d array [[score0, x0, y0],...,[score16, x16, y16]]
    const poseArray = poses[0].pose.keypoints.map(p => [p.score, p.position.x, p.position.y]);
  
    // Add an example with a label to the classifier
    knnClassifier.addExample(poseArray, label);
    updateCounts();
  }



function onLoad() {     // This function is called when the video loads
//  print("start auto play after load");
   video.play();
  print("mouse click to start");
}

function modelReady() {
  console.log('model ready');
}

//Pose Net 
function gotPoses(poses) {
   console.log(poses);
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}
//=======Draw skeleton and keypoints ===/

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {


   if(poses.length>0){
     console.log("yes");
   }
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.1) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);

        
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    // For every skeleton, loop through all body connections
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}


//======End skeleton ============/
function mousePressed() {
  

  print("set loop mode");
  video.play();
  //video.loop(); // set the video to loop mode ( and start )
  

}

// Update the example count for each label	
function updateCounts() {
  const counts = knnClassifier.getCountByLabel();

  document.querySelector('#exampleA').textContent = counts['A'] || 0;
  document.querySelector('#exampleB').textContent = counts['B'] || 0;
  document.querySelector('#exampleC').textContent = counts['C'] || 0;

  document.querySelector('#exampleD').textContent = counts['D'] || 0;
  document.querySelector('#exampleE').textContent = counts['E'] || 0;
  document.querySelector('#exampleF').textContent = counts['F'] || 0;
  document.querySelector('#exampleG').textContent = counts['G'] || 0;

}



function clasi(){
  knnClassifier.save();
  console.log('Model is savved');
  video.stop();

}

  // A util function to create UI buttons
function createButtons() {
  // When the A button is pressed, add the current frame
  // from the video with a label of "A" to the classifier
  buttonA = document.querySelector('#addClassA');
  buttonA.addEventListener('click', function() {
    addExample('A');
  });

  // When the B button is pressed, add the current frame
  // from the video with a label of "B" to the classifier
  buttonB = document.querySelector('#addClassB');
  buttonB.addEventListener('click',function() {
    addExample('B');
  });

  // When the B button is pressed, add the current frame
  // from the video with a label of "B" to the classifier
  buttonC = document.querySelector('#addClassC');
  buttonC.addEventListener('click',function() {
    addExample('C');
  });

  buttonD = document.querySelector('#addClassD');
  buttonD.addEventListener('click',function() {
    addExample('D');
  });

  buttonE = document.querySelector('#addClassE');
  buttonE.addEventListener('click',function() {
    addExample('E');
  });
  
  buttonF = document.querySelector('#addClassF');
  buttonF.addEventListener('click',function() {
    addExample('F');
  });

  buttonG = document.querySelector('#addClassG');
  buttonG.addEventListener('click',function() {
    addExample('G');
  });


  save_button = document.querySelector('#save_model');
  save_button.addEventListener('click',clasi);

}


