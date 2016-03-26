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

var addPoint = function (x, z, feed, rpm, dia) {
	Env.x = Number(x); Env.z = Number(z); Env.feed = feed;
	points.push({
		x: x,
		z: z,
		feed: feed,
		rpm: rpm,
		dia: dia
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
		arc.center = {};
	} else if(arcInfo.hasOwnProperty('i') && arcInfo.hasOwnProperty('k')) {
		arc.center = { x: (Number(arcInfo.i) + arc.start.x) , z: (Number(arcInfo.k) + arc.start.z)};
	} else throw paramError('to find the center of arc');
	var arcData = getArcPoints(arc, ARC_DIVISIONS);
	for(var i=0; i < arcData.length; i++) {
		addPoint(arcData[i].x, arcData[i].z, Env.feed, Env.rpm, Env.dia);
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
			tempData.u = param.slice(1);
		} else if (word == 'W') {
			tempData.w = param.slice(1);
		} else if (word == 'R') {
			tempData.r = param.slice(1);
		} else if (word == 'P') {
			tempData.p = param.slice(1);
		} else if (word == 'Q') {
			tempData.q = param.slice(1);
		} else paramError(word);
	},

	G74 : function (param) {
		word = param[0];
		if (word == 'W') {
			tempData.w = param.slice(1);
		} else if (word == 'R') {
			tempData.r = param.slice(1);
		} else if (word == 'P') {
			tempData.p = param.slice(1);
		} else if (word == 'Q') {
			tempData.q = param.slice(1);
		} else if (word == 'U') {
			tempData.u = param.slice(1);
		} else if (word == 'W') {
			tempData.w = param.slice(1);
		} else if (word == 'S') {
			tempData.s = param.slice(1);
		} else if (word == 'F') {
			tempData.f = param.slice(1);
		} else paramError(word);
	},

	G92 : function (param) {
		word = param[0];
		if (word == 'X') {
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
		throw "Alert: Blank line found!";
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
		if (Env.hasOwnProperty('feed'))
			addPoint(Env.x, Env.z, Env.feed, 0, Env.dia); // set the spindle speed to zero
		else envError();
	},

	M05 : function (data) {
		if (Env.hasOwnProperty('feed'))
			addPoint(Env.x, Env.z, Env.feed, 0, Env.dia);	// set spindle speed to zero
		else envError();
	},

	G00 : function (data) {
		if (Env.hasOwnProperty('rpm'))
			addPoint(data.x, data.z, data.f, Env.rpm, Env.dia);
		else envError();
	},

	G01 : function (data) {
		if (Env.hasOwnProperty('rpm'))
			addPoint(data.x, data.z, data.f, Env.rpm, Env.dia);
		else envError();
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
		if (Env.hasOwnProperty('rpm')) {
			addPoint(data.x, data.z, data.f, Env.rpm, Env.dia);
			addPoint(0, 0, data.f, Env.rpm, Env.dia);
		} else envError();
	},

	G71 : function (data) {
		// body...
	},

	G72 : function (data) {
		// body...
	},

	G74 : function (data) {
		// body...
	},

	G92 : function (data) {
		// body...
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

			   // update the Env (x, z, feed) with tempData info
			   // if not G02 and G03 since x & y and the endpoints
				// if (Env.state != 'G02' && Env.state != 'G03') {
				//    	if(tempData.hasOwnProperty('x'))
				// 		Env.x = Number(tempData.x);
				// 	if (tempData.hasOwnProperty('z'))
				// 		Env.z = Number(tempData.z);
				// }

				// if (tempData.hasOwnProperty('f'))
				// 	Env.feed = tempData.f;

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