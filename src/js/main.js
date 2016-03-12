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

/* -------------------- MAIN PROGRAM BEGIN -------------------- */
function startEval (input) {
  // Hide all previous errors...
  document.getElementById('errors').setAttribute('style', 'display: none');

  // Process the input string
  var tokens = tokenizer(input);

  // Validate the tokens
  var validTokens = validateTokens(tokens);

  // Get array of points
  var pointsArray = getPoints(validTokens);

  // Initialize simulator
  // Simulator.init();

  // Add initial point
  // Simulator.addPoint(x, z, feed, rpm, dia);

  // Add points to simulator
  // addPointsToSimulator(pointsArray);

  // Run the simulator
  // Simulator.run();

  // Show the output over the screen  -- Dev
  alert(JSON.stringify(tokens));
  // alert(tokens.length)
  // alert(tokens[0]["type"])
  alert(JSON.stringify(pointsArray));
}

/* -------------------- MAIN PROGRAM END -------------------- */
