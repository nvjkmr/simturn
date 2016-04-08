/**
  Initializing Environment
*/
var Env = new Object();
Env.x = 0; Env.z = 0;
Env.dia = toolData[toolByDefault];
Env.rapidSpeed = rapidSpeedByDefault;

/**
  Initializing variables
*/
var points = new Array(), lineNums = new Array(), tempData = new Object(), errors = false;

/**
  Declaring functions
*/
var throwExceptionsOnScreen = function (errorOrWarn, e) {
	document.getElementById(errorOrWarn).setAttribute("style", "display: block");
	document.getElementById(errorOrWarn).innerHTML += e;
};

var hideAlertBoxes = function () {
	document.getElementById('errors').setAttribute("style", "display: none");
	document.getElementById('warnings').setAttribute("style", "display: none");
	document.getElementById('errors').innerHTML = null;
	document.getElementById('warnings').innerHTML = null;	
};

var paramError = function (word) {
	throw "Error: Parameter "+ word +" is not supported/invalid for the code '"+ Env.state+"'";
};

var avoidNullState = function () {
	if (!Env.hasOwnProperty('state'))
		throw "Error: Block descriptor is undefined";
};

var eobError = function () {
	throw "Error: Unexpected End of Block code";
};

var envError = function () {
	throw "Error: Insufficient environment data! \
			Kindly set spindle speed and/or feed rate to proceed further.";
};

var checkFeed = function () {
	if(!Env.hasOwnProperty('feed'))
		envError();
	else return true;
}

var checkRpm = function () {
	if (!Env.hasOwnProperty('rpm'))
		envError();
	else return true;
}

var addPoint = function (x, z, feed, rpm, dia) {
	if (x == null || z == null || feed == null || rpm == null || dia == null) {
		throw "Error: Environment data is not set properly for the code "+ Env.state;
	}
	// convert into numbers and save the arguments
	Env.x = Number(x); Env.z = Number(z); Env.feed = Number(feed); Env.dia = Number(dia);
	points.push({
		x: Number(x),
		z: Number(z),
		feed: Number(feed),
		rpm: Number(rpm),
		dia: Number(dia)
	});
};

var resetEnv = function () {
	points = new Array(); lineNums = new Array();
	tempData = new Object(); errors = false;
	Env = new Object();
	Env.x = 0; Env.z = 0;
	Env.dia = toolData[toolByDefault];
	Env.rapidSpeed = rapidSpeedByDefault;
};

var getArcPoints = function (arc, numDivs) {
	// extract the given data into variables
	var arcCenter = arc.center; var arcStart = arc.start; var arcEnd = arc.end;
	var arcPoints = [];		// initialize an empty points array
	
	if (arc.hasOwnProperty('radius'))	// check if radius is available
		var arcRadius = arc.radius;
	else arcRadius = Math.sqrt(Math.pow((arcStart.x - arcCenter.x), 2) + Math.pow((arcStart.z - arcCenter.z), 2)).toPrecision(3);

	var startT = Math.atan2(arcStart.z - arcCenter.z, arcStart.x - arcCenter.x);
	var endT = Math.atan2(arcEnd.z - arcCenter.z, arcEnd.x - arcCenter.x);

	if (startT < 0) 
		startT = (2 * Math.PI) + startT;
	if (endT < 0)
		endT = (2 * Math.PI) + endT;

	lengthOfEachDiv = Math.abs(endT-startT)/numDivs;

	for (var i = 0; i <= numDivs; i++) {		
		if (startT > endT)
			var t = (startT - (i*lengthOfEachDiv)).toPrecision(5);
		else 
			var t = (startT + (i*lengthOfEachDiv)).toPrecision(5);

		arcPoints.push({
			// adding zero at the end to avoid '-ve' zeros returned by Math.round method
			x: (Math.round((((arcRadius * Math.cos(t)) + arcCenter.x).toPrecision(5)) * 100)/100) + 0,
			z: (Math.round((((arcRadius * Math.sin(t)) + arcCenter.z).toPrecision(5)) * 100)/100) + 0
		});
	}
	return arcPoints;
};

var handleG02nG03 = function (arcInfo) {
	var arc = new Object();
	arc.start = { x:Env.x, z:Env.z }; arc.end = { x:Number(arcInfo.x), z:Number(arcInfo.z) };
	if (arcInfo.hasOwnProperty('r')) {
		arc.radius = Number(arcInfo.r);
		// q = Math.sqrt(Math.pow((arc.end.x - arc.start.x), 2) + Math.pow((arc.end.z - arc.start.z), 2));	// distance between start & end points
		// var x3 = (arc.end.x - arc.start.x)/2, z3 = (arc.end.z - arc.start.z)/2;	// midpoint of the start and end points
		// arc.center = {
		// 	x: x3 - (Math.sqrt(Math.pow(arc.radius, 2) - Math.pow(q/2, 2)) * ((arc.start.z - arc.end.z)/q)).toPrecision(3),
		// 	z: z3 - (Math.sqrt(Math.pow(arc.radius ,2) - Math.pow(q/2, 2)) * ((arc.end.x - arc.start.x)/q)).toPrecision(3)
		// };
		// alert("center: "+ arc.center.x + ", " + arc.center.z);
	} else if(arcInfo.hasOwnProperty('i') && arcInfo.hasOwnProperty('k')) {
		arc.center = { x: (Number(arcInfo.i) + arc.start.x) , z: (Number(arcInfo.k) + arc.start.z)};
	} else throw paramError('to find the center of arc');
	var arcData = getArcPoints(arc, ARC_DIVISIONS);
	for(var i=0; i < arcData.length; i++) {
		addPoint(arcData[i].x, arcData[i].z, Env.feed, Env.rpm, Env.dia);
	}
};

var handleG90 = function (data, initial) {
	// addPoint(41, 5, 2E4, 1500, 4);

	// addPoint(31,5,70,1500,2);
	// addPoint(31,-30,70,1500,2);
	// addPoint(32,-30,70,1500,2);
	// addPoint(32,5,70,1500,2);
	// addPoint(30,5,70,1500,2);
	//for (var i = 0; 40 > i; i++) addPoint(31- .25 * i, 10, '8E3', '1500', 4), addPoint(51 - .5 * i, -50, '8E3', '1500', 4);
	//	addPoint(41, 10, '2E4', '1500', 4);

	// return;
	// set feed if doesn't exist
	if (!data.hasOwnProperty('f'))
		data.f = Env.feed;
	if(data.hasOwnProperty('z'))
		Env.endZ = Number(data.z);

	if (data.hasOwnProperty('x') && data.hasOwnProperty('z')) {
		// process data
		addPoint(data.x, Env.z, data.f, Env.rpm, Env.dia); // move in x-axis
		addPoint(Env.x, data.z, data.f, Env.rpm, Env.dia); // move in z-axis
		addPoint(initial.x, Env.z, data.f, Env.rpm, Env.dia);	// move in x axis
		addPoint(initial.x, initial.z, rapidSpeedByDefault, Env.rpm, Env.dia); // move to initial point
		Env.feed = data.f; // reset feed
	} else if (data.hasOwnProperty('z') && data.hasOwnProperty('r')) {
		// handle taper cutting
		// calculate starting and ending point
		addPoint(initial.x, initial.z, rapidSpeedByDefault, Env.rpm, Env.dia);	// go to initial point
		Env.feed = data.f; // reset feed
	} else if (data.hasOwnProperty('x')) {
		addPoint(data.x, Env.z, data.f, Env.rpm, Env.dia); // move in x axis
		addPoint(Env.x, Env.endZ, data.f, Env.rpm, Env.dia); // move in z axis
		addPoint(initial.x, Env.z, data.f, Env.rpm, Env.dia);	// move in x axis
		addPoint(initial.x, initial.z, rapidSpeedByDefault, Env.rpm, Env.dia);	// go to initial point
		Env.feed = data.f; // reset feed
	}
};

function doNothing() { return null; }

/**
  Operational code parameter handlers
*/
var opCodeParamHandlers = {
	G00 : function (param) {
		word = param[0]; tempData.f = Env.rapidSpeed;
		if (word == 'X') {
			tempData.x = param.slice(1);
		} else if (word == 'Z') {
			tempData.z = param.slice(1);
		} else if (word == 'U') {
			tempData.x = Number(Env.x) + Number(param.slice(1));
		} else if (word == 'W') {
			tempData.z = Number(Env.z) + Number(param.slice(1));
		} else paramError(word);
	},

	G01 : function (param) {	
		word = param[0];
		if (word == 'X') {
			tempData.x = param.slice(1);
		} else if (word == 'Z') {
			tempData.z = param.slice(1);
		} else if (word == 'U') {
			tempData.x = Number(Env.x) + Number(param.slice(1));
		} else if (word == 'W') {
			tempData.z = Number(Env.z) + Number(param.slice(1));
		} else if (word == 'F') {
			tempData.f = param.slice(1);
		} else paramError(word);
	},

	G02 : function (param) {
		word = param[0];
		if (word == 'X') {
			tempData.x = param.slice(1);
		} else if (word == 'Z') {
			tempData.z = param.slice(1);
		} else if (word == 'U') {
			tempData.x = Number(Env.x) + Number(param.slice(1));
		} else if (word == 'W') {
			tempData.z = Number(Env.z) + Number(param.slice(1));
		} else if (word == 'F') {
			tempData.f = param.slice(1);
		} else if(word == 'R') {
			tempData.r = param.slice(1);
		} else if(word == 'I') {
			tempData.i = param.slice(1);
		} else if(word == 'K') {
			tempData.k = param.slice(1);
		} else paramError(word);
	},

	G03 : function (param) {
		word = param[0];
		if (word == 'X') {
			tempData.x = param.slice(1);
		} else if (word == 'Z') {
			tempData.z = param.slice(1);
		} else if (word == 'U') {
			tempData.x = Number(Env.x) + Number(param.slice(1));
		} else if (word == 'W') {
			tempData.z = Number(Env.z) + Number(param.slice(1));
		} else if (word == 'F') {
			tempData.f = param.slice(1);
		} else if(word == 'R') {
			tempData.r = param.slice(1);
		} else if(word == 'I') {
			tempData.i = param.slice(1);
		} else if(word == 'K') {
			tempData.k = param.slice(1);
		} else paramError(word);
	},

	G04 : function (param) {
		word = param[0];
		if (word == 'P') {
			tempData.p = param.slice(1);
		} else if (word == 'X') {
			tempData.x = param.slice(1);
		} else paramError(word);
	},

	G28 : function (param) {
		word = param[0]; tempData.f = Env.rapidSpeed;
		if (word == 'X') {
			tempData.x = param.slice(1);
		} else if (word == 'Z') {
			tempData.z = param.slice(1);
		} else if (word == 'U') {
			tempData.x = Number(Env.x) + Number(param.slice(1));
		} else if (word == 'W') {
			tempData.z = Number(Env.z) + Number(param.slice(1));
		} else paramError(word);
	},

	G70 : function (param) {
		word = param[0];
		if (word == 'P') {
			tempData.p = param.slice(1);
		} else if (word == 'Q') {
			tempData.q = param.slice(1);
		} else paramError(word);
	},

	G71 : function (param) {
		word = param[0];
		if (word == 'P') {
			tempData.p = param.slice(1);
		} else if (word == 'Q') {
			tempData.q = param.slice(1);
		} else if (word == 'U') {
			tempData.x = Number(Env.x) + Number(param.slice(1));
		} else if (word == 'W') {
			tempData.z = Number(Env.z) + Number(param.slice(1));
		} else if (word == 'F') {
			tempData.f = param.slice(1);
		} else if(word == 'R') {
			tempData.r = param.slice(1);
		} else if(word == 'S') {
			tempData.s = param.slice(1);
		} else paramError(word);
	},

	G72 : function (param) {
		word = param[0];
		if (word == 'U') {
			tempData.x = Number(Env.x) + Number(param.slice(1));
		} else if (word == 'W') {
			tempData.z = Number(Env.z) + Number(param.slice(1));
		} else if (word == 'R') {
			tempData.r = param.slice(1);
		} else if (word == 'P') {
			tempData.p = param.slice(1);
		} else if (word == 'Q') {
			tempData.q = param.slice(1);
		} else paramError(word);
	},

	G75 : function (param) {
		word = param[0];
		if (word == 'R') {
			tempData.r = param.slice(1);
		} else if (word == 'P') {
			tempData.p = param.slice(1);
		} else if (word == 'Q') {
			tempData.q = param.slice(1);
		} else if (word == 'X') {
			tempData.x = param.slice(1);
		} else if (word == 'Z') {
			tempData.z = param.slice(1);
		} else if (word == 'F') {
			tempData.f = param.slice(1);
		} else paramError(word);
	},

	G76 : function (param) {
		word = param[0];
		if (word == 'P') {
			tempData.p = param.slice(1);
		} else if (word == 'Q') {
			tempData.q = param.slice(1);
		} else if (word == 'R') {
			tempData.r = param.slice(1);
		} else if (word == 'X') {
			tempData.x = param.slice(1);
		} else if (word == 'Z') {
			tempData.z = param.slice(1);
		} else if (word == 'F') {
			tempData.f = param.slice(1);
		} else paramError(word);
	},

	G90 : function (param) {
		word = param[0];
		if (word == 'U') {
			tempData.x = Number(Env.x) + Number(param.slice(1));
		} else if (word == 'W') {
			tempData.z = Number(Env.z) + Number(param.slice(1));
		} else if (word == 'R') {
			tempData.r = param.slice(1);
		} else if (word == 'X') {
			tempData.x = param.slice(1);
		} else if (word == 'Z') {
			tempData.z = param.slice(1);
		} else if (word == 'F') {
			tempData.f = param.slice(1);
		} else paramError(word);
	},

	M03 : function (param) {
		word = param[0];
		if (word == 'S') {
			tempData.s = param.slice(1);	// change spindle speed
		} else paramError(word);
	},

	M04 : function (param) {
		word = param[0];
		if (word == 'S') {
			tempData.s = '-'+param.slice(1);	// counter clockwise spindle speed
		} else paramError(word);
	},

	M06 : function (param) {
		word = param[0];
		if (word == 'T') {
			tempData.t = param.slice(1);
		} else paramError(word);
	}
};


/**
  Control code handlers
*/
var controlCodeHandlers = {
	G21 : function () {
		Env.state = 'G21';
	},

	G98 : function () {
		Env.state = 'G98';
	},

	M05 : function () {
		Env.state = 'M05';
	},

	M08 : function () {
		Env.coolant = true;
		Env.state = 'M08';
	},

	M09 : function () {
		Env.coolant = false;
		Env.state = 'M09';	
	},

	M30 : function () {
		Env.state = 'M30';
	},

	N : function (value) {
		lineNums.push(Number(value.slice(1)));
		Env.state = 'N';
	},

	O : function (value) {
		Env.progNum = Number(value.slice(1));
		Env.state = 'O';
	}
};

/**
  End of block handlers
*/
var eobHandlers = {
	// states and functions
	N : function (data) {
		throw "Alert: Blank numbered line found!";
	},

	O : function (data) {
		doNothing();
	},

	G21 : function (data) {
		doNothing();
	},

	G98 : function (data) {
		doNothing();
	},

	M08 : function (data) {
		doNothing();
	},

	M09 : function (data) {
		doNothing();
	},

	M30 : function (data) {
		checkFeed();
		addPoint(Env.x, Env.z, Env.feed, 0, Env.dia); // set the spindle speed to zero
	},

	M05 : function (data) {
		checkFeed();
		addPoint(Env.x, Env.z, Env.feed, 0, Env.dia);	// set spindle speed to zero
	},

	G00 : function (data) {		// modal function
		checkRpm();
		if (data.hasOwnProperty('x') && data.hasOwnProperty('z'))
			addPoint(data.x, data.z, data.f, 0, Env.dia);
		else if (data.hasOwnProperty('x'))
			addPoint(data.x, Env.z, data.f, 0, Env.dia);
		else if(data.hasOwnProperty('z'))
			addPoint(Env.x, data.z, data.f, 0, Env.dia);
		else throw "Unknown error!";
	},

	G01 : function (data) {		// modal function
		checkRpm();
		if (data.hasOwnProperty('x') && data.hasOwnProperty('z') && data.hasOwnProperty('f'))
			addPoint(data.x, data.z, data.f, Env.rpm, Env.dia);
		else if (data.hasOwnProperty('x') && data.hasOwnProperty('z') && checkFeed())
			addPoint(data.x, data.z, Env.feed, Env.rpm, Env.dia);
		else if (data.hasOwnProperty('x'))
			addPoint(data.x, Env.z, data.f, Env.rpm, Env.dia);
		else if(data.hasOwnProperty('z'))
			addPoint(Env.x, data.z, data.f, Env.rpm, Env.dia);
		else throw "Unknown error!";
	},

	G02 : function (data) {
		handleG02nG03(data);
	},

	G03 : function (data) {
		handleG02nG03(data);
	},

	G04 : function (data) {
		doNothing();
	},

	G28 : function (data) {
		addPoint(data.x, data.z, data.f, 0, Env.dia);
		addPoint(0, 0, data.f, 0, Env.dia);
	},

	G70 : function (data) {
		// body...
	},

	G71 : function (data) {
		//if (data.hasOwnProperty('s')) {
		//	Env.feed = data.f;
		//	Env.rpm = data.s;
		//} else if (data.hasOwnProperty('f')) {
		//	Env.feed = data.f;
		//} else // handle u and r
	},

	G72 : function (data) {
		// body...
	},

	G75 : function (data) {
		// body...
	},

	G76 : function (data) {
		// body...
	},

	G90 : function (data) {
		// save initial position
		var initials = new Object();
		initials.x = Env.x; initials.z = Env.z;
		// process data
		handleG90(data, initials);
	},

	M03 : function (data) {
		Env.rpm = data.s;
	},

	M04 : function (data) {
		Env.rpm = data.s;
	},

	M06 : function (data) {
		Env.dia = toolData[data.t];
	}
};

/**
  Evaluating tokens
*/
var getPoints = function (validTokens) {
	resetEnv();

	try {
		// loop through the tokens and evaluate
		for (var i = 0; i < validTokens.length; i++) {
			type = validTokens[i].type; value = validTokens[i].value;
			// parameters - PM
			if (type == 'PM') {
				// if state is null then throw error
				avoidNullState();
				// if doesn't have an entry then throw parameter error
				if (!opCodeParamHandlers.hasOwnProperty(Env.state))
					paramError(value[0]);
				opCodeParamHandlers[Env.state](value);	// handle parameters
			}
			// block descriptors - BD
			else if (type == 'BD') {
				Env.state = value;	// handle block descriptors
			}
			// end of block - EB
			else if (type == 'EB') {
				avoidNullState();	// avoid null state
				if (!eobHandlers.hasOwnProperty(Env.state))
					eobError();	// if not a property then throw error

				// check if input data is suffice
				if(!isDataSuffice(Env.state, tempData))
					throw "Data not sufficent for the state: "+ Env.state;

				eobHandlers[Env.state](tempData);	// handle end of block
				tempData = new Object();	// reset tempData

				if (Env.state == 'M30')		// if state M30 then return the points
					return points;			// and stop the program execution
			}
			// control codes : multiline support - CC
			else if (type == 'CC') {
				if (value[0] == 'O' || value[0] == 'N')		// line & program numbers
					controlCodeHandlers[value[0]](value);
				else controlCodeHandlers[value]();	// handle control codes
			} else throw "Alert: Unknown token type found!"
		}
	} catch(e) {
		if (e[0] == 'E') {
			errors = true;
			throwExceptionsOnScreen('errors', e);	// handle errors
		} else throwExceptionsOnScreen('warnings', e);	// handle warnings
	} finally {
		if (errors == false)
			return points;
		else return null;
	}
};