function doNothing() { return null; }

// Environment
var Env = new Object();
Env.x = null;
Env.z = null;
Env.feed = null;
Env.rpm = null;
Env.dia = toolData[2];
Env.state = null;
Env.progNum = null;
Env.tool = null;
Env.coolant = null;
Env.rapidSpeed = 8000;

var points = [], lineNums = [], tempPoints = [], tempData = new Object();

var addTempPoints = function (x, z, feed, rpm, dia) {
	tempPoints.push({
		x: x,
		z: z,
		feed: feed,
		rpm: rpm,
		dia: dia
	});
};

var addPoint = function (x, z, feed, rpm, dia) {
	points.push({
		x: x,
		z: z,
		feed: feed,
		rpm: rpm,
		dia: dia
	});
};

var isDataSuffice = function (state, data) {
	return true;
};

/* -------------------- BEGIN - Get Points -------------------- */

var getPoints = function (validTokens) {
	var i = 0;

	try{
		while(i < validTokens.length){
			
			type = validTokens[i]["type"];
			value = validTokens[i]["value"];

			// Non parameterized codes and program/line numbers
			if(type == "CONTROL_CODE"){
				if(value == 'G21')
					doNothing();	// set by default
				else if (value == 'G98')
					doNothing();	// set by default
				else if (value == 'M05')
					Simulator.addPoint(['x'], ['z'], ['feed'], 0, ['dia']);
				else if (value == 'M08')
					Env.coolant = true;
				else if (value == 'M09')
					Env.coolant = false;
				else if (value == 'M30')
					Simulator.addPoint(['x'], ['z'], ['feed'], 0, ['dia']);
				else if (value[0] == 'N')
					lineNums.push(value.slice(1));
				else if (value[0] == 'O')
					Env.progNum = value.slice(1);
			}
			// Codes with parameters
			else if(type == "BLOCK_DESC"){
				Env.state = value;
			}
			// Parameters to the block descriptors
			else if(type == "PARAMETER"){
				if(Env.state == 'G00'){
					goToStateG00(value);
				} else if(Env.state == 'G01'){
					goToStateG01(value);
				} else if(Env.state == 'G02'){
					goToStateG02(value);
				} else if(Env.state == 'G03'){
					goToStateG03(value);
				} else if(Env.state == 'G04'){
					goToStateG04(value);
				} else if(Env.state == 'G28'){
					goToStateG28(value);
				} else if(Env.state == 'G71'){
					goToStateG71(value);
				} else if(Env.state == 'G72'){
					goToStateG72(value);
				} else if(Env.state == 'G74'){
					goToStateG74(value);
				} else if(Env.state == 'G92'){
					goToStateG92(value);
				} else if(Env.state == 'M03'){
					goToStateM03(value);
				} else if(Env.state == 'M04'){
					goToStateM04(value);
				} else if(Env.state == 'M06'){
					goToStateM06(value);
				}
			}
			// Execute the block or simply do nothing
			else if(type == "EOB"){
				if (Env.state == 'G00' || Env.state == 'G01' || Env.state == 'G28') {
					if(isDataSuffice(Env.state, tempData)) {
						addPoint(tempData.x, tempData.z, Env.feed, Env.rpm, Env.dia);
						tempData = null;
					}
				} else if (Env.state=='G04' || Env.state=='M03' || Env.state=='M04' || Env.state=='M06') {
					// set appropriate environment data
				} else {
					// handle multiple points
				}
			}
			else throw "Unknown Type Error: Token type is undefined";
		i++;
		}
	}
	catch(e) {
   	document.getElementById('errors').setAttribute("style", "display: block");
   	document.getElementById('errors').innerHTML = e;
	}
	finally {
		return points;
	}
};

/* -------------------- END  -  Get Points -------------------- */

/* -------------------------------------------------------------------------- */

/* -------------------- BEGIN  -  State Functions -------------------- */

var goToStateG00 = function (param) {
	word = param[0];
	Env.feed = Env.rapidSpeed;
	if (word == 'X') {
		tempData['x'] = param.slice(1);
	}
	else if (word == 'Z') {
		tempData['z'] = param.slice(1);
	}
	else if (word == 'U') {
		tempData['x'] = points[point.length-1]['x'] + param.slice(1);
	}
	else if (word == 'W') {
		tempData['z'] = points[point.length-1]['z'] + param.slice(1);
	}
	else throw "Parameter '"+ word +"' is not supported for the code: G00";
};

var goToStateG01 = function (param) {
	// body...
};

var goToStateG02 = function (param) {
	// body...
};

var goToStateG03 = function (param) {
	// body...
};

var goToStateG04 = function (param) {
	// body...
};

var goToStateG28 = function (param) {
	// body...
};

var goToStateG71 = function (param) {
	// body...
};

var goToStateG72 = function (param) {
	// body...
};

var goToStateG74 = function (param) {
	// body...
};

var goToStateG92 = function (param) {
	// body...
};

var goToStateM03 = function (param) {
	// body...
};

var goToStateM04 = function (param) {
	// body...
};

var goToStateM06 = function (param) {
	// body...
};

/* --------------------  END   -  State Functions -------------------- */

/* -------------------------------------------------------------------------- */

/* -------------------- BEGIN - Add Points To Simulator-------------------- */

var addPointsToSimulator = function (points) {
	var i = 0;
	// Adding points to Simulator
	while(i < points.length){
		Simulator.addPoint(points[i]["x"], points[i]["z"], points[i]["feed"], points[i]["rpm"], points[i]["dia"]);
		i++;
	}
};

/* -------------------- END  -  Add Points To Simulator -------------------- */
