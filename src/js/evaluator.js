// Initializing environment
var Env = new Object();
Env.feed = null;
Env.rpm = null;
Env.dia = toolData[toolByDefault];
Env.state = null;
Env.progNum = null;
Env.coolant = null;
Env.rapidSpeed = rapidSpeedByDefault;

var points = [], lineNums = [];
var tempData = new Object();

var lineNumsCheck = function (lineNumsArray) {
	return (lineNumsArray == lineNumsArray.sort())
}

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

function doNothing() { return null; }

/* -------------------- BEGIN - Get Points -------------------- */

var getPoints = function (validTokens) {
	var i = 0; points = [];

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
					Env.state = 'M05';
				else if (value == 'M08')
					Env.coolant = true;
				else if (value == 'M09')
					Env.coolant = false;
				else if (value == 'M30')
					Env.state = 'M30';
				else if (value[0] == 'N') {
					lineNums.push(value.slice(1));
					Env.state = 'LINE_NUM';
				}
				else if (value[0] == 'O') {
					Env.progNum = value.slice(1);
					Env.state = 'PROG_NUM';
				}
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
				if(Env.state == "LINE_NUM" || Env.state == "PROG_NUM")
					throw "Alert: Blank line found!";
				// if(!isDataSuffice(Env.state, tempData))
				//	throw "Not enough parameters for the code:" + Env.state;
				if (Env.state == 'M30' || Env.state == 'M05') {
					addPoint(Env.x, Env.z, Env.feed, 0, Env.dia);
				} else if (Env.state == 'G00' || Env.state == 'G01') {
					// handle single points
					addPoint(Env.x, Env.z, Env.feed, Env.rpm, Env.dia);
				} else if (Env.state == 'G02' || Env.state == 'G03') {
					//
				} else if(Env.state == 'G28') {
					// handle G28 | double points
					addPoint(Env.x, Env.z, Env.feed, Env.rpm, Env.dia);
					addPoint(0, 0, Env.feed, Env.rpm, Env.dia);
				} else if(Env.state == 'G71') {
			}
			else throw "Error: Token type is undefined";
		i++;
		}
	
		// Checking line numbers
		if(lineNumsCheck(lineNums))
			throw "Error: The line numbers are not in proper order";
	}
	catch(e) {
		if (e[0] == 'E') {
			document.getElementById('errors').setAttribute("style", "display: block");
   			document.getElementById('errors').innerHTML = e;
		} else {
			document.getElementById('warnings').setAttribute("style", "display: block");
			document.getElementById('warnings').innerHTML = e;
		}
	} finally {
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
		Env['x'] = param.slice(1);
	} else if (word == 'Z') {
		Env['z'] = param.slice(1);
	} else if (word == 'U') {
		Env['x'] = Number(Env['x']) + Number(param.slice(1));
	} else if (word == 'W') {
		Env['z'] = Number(Env['z']) + Number(param.slice(1));
	} else throw "Error: Parameter '"+ word +"' is not supported for the code '"+ Env.state+"'";
};

var goToStateG01 = function (param) {
	word = param[0];
	if (word == 'X') {
		Env['x'] = param.slice(1);
	} else if (word == 'Z') {
		Env['z'] = param.slice(1);
	} else if (word == 'U') {
		Env['x'] = Number(Env['x']) + Number(param.slice(1));
	} else if (word == 'W') {
		Env['z'] = Number(Env['z']) + Number(param.slice(1));
	} else if (word == 'F') {
		Env.feed = param.slice(1);
	} else throw "Error: Parameter '"+ word +"' is not supported for the code '"+ Env.state+"'";
};

var goToStateG02 = function (param) {
	word = param[0];
	if (word == 'X') {
		Env['x'] = param.slice(1);
	} else if (word == 'Z') {
		Env['z'] = param.slice(1);
	} else if (word == 'U') {
		Env['x'] = Number(Env.x) + Number(param.slice(1));
	} else if (word == 'W') {
		Env['z'] = Number(Env.z) + Number(param.slice(1));
	} else if (word == 'F') {
		Env.feed = param.slice(1);
	} else if(word == 'R') {
		Env.r = param.slice(1);
	} else if(word == 'I') {
		Env.i = param.slice(1);
	} else if(word == 'K') {
		Env.k = param.slice(1);
	} else throw "Error: Parameter '"+ word +"' is not supported for the code '"+ Env.state+"'";
};

var goToStateG03 = function (param) {	
	word = param[0];
	if (word == 'X') {
		Env['x'] = param.slice(1);
	} else if (word == 'Z') {
		Env['z'] = param.slice(1);
	} else if (word == 'U') {
		Env['x'] = Number(Env['x']) + Number(param.slice(1));
	} else if (word == 'W') {
		Env['z'] = Number(Env['z']) + Number(param.slice(1));
	} else if (word == 'F') {
		Env.feed = param.slice(1);
	} else if(word == 'R') {
		Env.r = param.slice(1);
	} else if(word == 'I') {
		Env.i = param.slice(1);
	} else if(word == 'K') {
		Env.k = param.slice(1);
	} else throw "Error: Parameter '"+ word +"' is not supported for the code '"+ Env.state+"'";
};

var goToStateG04 = function (param) {
	doNothing();
};

var goToStateG28 = function (param) {
	word = param[0];
	Env.feed = Env.rapidSpeed;
	if (word == 'X') {
		Env['x'] = param.slice(1);
	} else if (word == 'Z') {
		Env['z'] = param.slice(1);
	} else if (word == 'U') {
		Env['x'] = Number(Env['x']) + Number(param.slice(1));
	} else if (word == 'W') {
		Env['z'] = Number(Env['z']) + Number(param.slice(1));
	} else throw "Error: Parameter '"+ word +"' is not supported for the code '"+ Env.state+"'";
};

var goToStateG71 = function (param) {
	word = param[0];
	if (word == 'P') {
		Env['p'] = param.slice(1);
	} else if (word == 'Q') {
		Env['q'] = param.slice(1);
	} else if (word == 'U') {
		Env['x'] = Number(Env['x']) + Number(param.slice(1));
	} else if (word == 'W') {
		Env['z'] = Number(Env['z']) + Number(param.slice(1));
	} else if (word == 'F') {
		Env.feed = param.slice(1);
	} else if(word == 'R') {
		Env.r = param.slice(1);
	} else if(word == 'S') {
		Env.s = param.slice(1);
	} else throw "Error: Parameter '"+ word +"' is not supported for the code '"+ Env.state+"'";
};

var goToStateG72 = function (param) {
	word = param[0];
	if (word == 'U') {
		Env.u = param.slice(1);
	} else if (word == 'W') {
		Env['w'] = param.slice(1);
	} else if (word == 'R') {
		Env['r'] = param.slice(1);
	} else if (word == 'P') {
		Env['p'] = param.slice(1);
	} else if (word == 'Q') {
		Env['q'] = param.slice(1);
	} else throw "Error: Parameter '"+ word +"' is not supported for the code '"+ Env.state+"'";
};

var goToStateG74 = function (param) {
	word = param[0];
	if (word == 'W') {
		Env['w'] = param.slice(1);
	} else if (word == 'R') {
		Env['r'] = param.slice(1);
	} else if (word == 'P') {
		Env['p'] = param.slice(1);
	} else if (word == 'Q') {
		Env['q'] = param.slice(1);
	} else if (word == 'U') {
		Env['u'] = param.slice(1);
	} else if (word == 'W') {
		Env['w'] = param.slice(1);
	} else if (word == 'S') {
		Env['s'] = param.slice(1);
	} else if (word == 'F') {
		Env['f'] = param.slice(1);
	} else throw "Error: Parameter '"+ word +"' is not supported for the code '"+ Env.state+"'";
};

var goToStateG92 = function (param) {
	word = param[0];
	if (word == 'X') {
		Env['x'] = param.slice(1);
	} else if (word == 'Z') {
		Env['z'] = param.slice(1);
	} else if (word == 'F') {
		Env['f'] = param.slice(1);
	} else throw "Error: Parameter '"+ word +"' is not supported for the code '"+ Env.state+"'";
};

var goToStateM03 = function (param) {
	word = param[0];
	if (word == 'S') {
		// change the spindle speed
		Env.rpm = param.slice(1);
	} else throw "Error: Parameter '"+ word +"' is not supported for the code '"+ Env.state+"'";
};

var goToStateM04 = function (param) {
	word = param[0];
	if (word == 'S') {
		// change the spindle speed
		Env.rpm = '-'+param.slice(1);	// counter clockwise spindle speed
	} else throw "Error: Parameter '"+ word +"' is not supported for the code '"+ Env.state+"'";
};

var goToStateM06 = function (param) {
	word = param[0];
	if (word == 'T') {
		// change the tool if available
		Env.dia = toolData[param.slice(1)];
	} else throw "Error: Parameter '"+ word +"' is not supported for the code '"+ Env.state+"'";
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
