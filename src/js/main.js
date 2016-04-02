/* -------------------- Begin File Reader -------------------- */

function startRead() {
    // disable the form
    //  obtain  input element through DOM
    var file  = document.getElementById('gcode-file').files[0];
    if(file){
        getAsText(file);
    }
}

function getAsText(readFile) {

    var reader  = new FileReader();

    //  Read  file  into  memory  as  UTF-8
    reader.readAsText(readFile, "UTF-8");
    reader.onprogress = updateProgress;
    reader.onload = loaded;
  }

function loaded (evt) {
  var fileString = evt.target.result;

  // Start evaluation
  startEval(fileString);
}

function updateProgress(evt) {
  if (evt.lengthComputable) {
    var loaded = (evt.loaded/evt.total);
    if(loaded <= 1)
    document.getElementById('progressBar').setAttribute("style", "width: " + loaded*100 + "%");
  }
}

/* -------------------- End File Reader -------------------- */

/* -------------------------------------------------------------------------- */

/* -------------------- Begin Globals -------------------- */

// Set of tools and their width of cut -- nothing at zero
var toolData = new Array(null, '.25', '.5', '1', '2', '4');

// set default tool and rapid speed
var toolByDefault = 2, rapidSpeedByDefault = 8000;

// number of divisions to divide the G02 & G03 arc
var ARC_DIVISIONS = 5;

/* -------------------- End Globals -------------------- */

/* -------------------------------------------------------------------------- */

/* -------------------- MAIN PROGRAM BEGIN -------------------- */
function startEval (input) {
  // Hide all previous errors...
  hideAlertBoxes();

  // Process the input string
  var tokens = tokenizer(input);

  // Validate the tokens
  var validTokens = validateTokens(tokens);

  // Get array of points
  var pointsArray = getPoints(validTokens);

  // Add initial point
  // Simulator.addPoint(x, z, feed, rpm, dia);
    // pointsArray = [];
    // for (i = 0; 40 > i; ++i) pointsArray.push({x:31-.25 * i, z:10, feed:8E3, rpm:1500, dia:4}), 
    //   pointsArray.push({x:51 - .5 * i, z:-50, feed:8E3, rpm:1500, dia:4});

    alert(JSON.stringify(pointsArray));

  window.loadJob = function() {
    for(var i = 0; i < pointsArray.length; ++i)
      window.addStep(pointsArray[i].x, 
        pointsArray[i].z, pointsArray[i].feed, 
        pointsArray[i].rpm, pointsArray[i].dia);
  };

  window.runSimulation();

  // Add points to simulator
  // addPointsToSimulator(pointsArray);

  // Run the simulator
  // Simulator.run();

  // Show the output over the screen  -- Dev
  // alert(JSON.stringify(tokens));
  // alert(JSON.stringify(pointsArray));
}

/* -------------------- MAIN PROGRAM END -------------------- */

/** Arcs defined for testing purpose */
// arc1 = new Object();
// arc1.center = { x:0 , z:0 };
// arc1.start = { x:2 , z:0 };
// arc1.end = { x:0 , z:2 };

// arc2 = new Object();
// arc2.center = { x:0 , z:0 };
// arc2.start = { x:0 , z:-2 };
// arc2.end = { x:-2 , z:0 };

// arc3 = new Object();
// arc3.center = { x:2, z:2 };
// arc3.start = { x:2 , z:0 };
// arc3.end = { x:0 , z:2 };