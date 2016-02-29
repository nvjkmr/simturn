/* -------------------- BEGIN - Execution Time -------------------- */

var getPoints = function (validTokens) {
	var points = [], i = 0;
	var addPoint = function (x, z, feed, rpm, dia) {
		points.push({
			x: x,
			z: z,
			feed: feed,
			rpm: rpm,
			dia: dia
		});
	}

	// Environment variables
	var x, z, feed, rpm, dia, state, lineNum, progNum, tool, coolant;

	try{
		while(i < validTokens.length){
			// Non parameterized codes and program/line numbers
			if(validTokens[i]["type"] == "CONTROL_CODE"){
				// body
			}
			// Codes with parameters
			else if(validTokens[i]["type"] == "BLOCK_DESC"){
				state = validTokens[i]["value"];
			}
			// Parameters to the block descriptors
			else if(validTokens[i]["type"] == "PARAMETER"){
				// body
			}
			// Execute the block or simply do nothing
			else if(validTokens[i]["type"] == "EOB"){
				// body
			}
			else throw "Unknown Type Error: Token type is undefined";
		}
	}
	catch(e) {
   	document.getElementById('errors').setAttribute("style", "display: block");
   	document.getElementById('errors').innerHTML = e;
	}
	finally {
		return points;
	}
}

/* -------------------- END  -  Execution Time -------------------- */

/* -------------------------------------------------------------------------- */

/* -------------------- BEGIN - Add Points -------------------- */

var addPointsToSimulator = function (points) {
	var i = 0;
	// Adding points to Simulator
	while(i < points.length){
		Simulator.addPoint(points[i]["x"], points[i]["z"], points[i]["feed"], points[i]["rpm"], points[i]["dia"]);
	}
}

/* -------------------- END  -  Add Points -------------------- */
