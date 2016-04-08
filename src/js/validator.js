// data set rules for every state
stateDataSets = {
	// array of all possible accepted parameter sets
	N   : [],
	O   : [],
	G21 : [],
	G98 : [],
	M08 : [],
	M09 : [],
	M30 : [],
	M05 : [],
	G00 : ['xz', 'x', 'z'],
	G01 : ['xzf', 'xz', 'x', 'z'],
	G02 : ['xzikf', 'xzrf', 'xzik', 'xzr'],
	G03 : ['xzikf', 'xzrf', 'xzik', 'xzr'],
	G04 : ['x', 'p'],
	G28 : ['xzf'],
	G70 : ['pq'],
	G71 : ['pquwfs', 'pquwf', 'ur'],
	G72 : ['pquwfs', 'pquwf', 'wr'],
	G75 : ['xzpqf', 'r'],
	G76 : ['pqr', 'xzpqf'],
	G90 : ['xzrf', 'xzf', 'zr', 'x'],
	M03 : ['s'],
	M04 : ['s'],
	M06 : ['t']
};

/* --------------------  BEGIN - Data Checking  -------------------- */

// function to check if required set of params exist
var isDataSuffice = function (state, data) {
	if (!stateDataSets.hasOwnProperty(state))
		throw "Error: State not found for which the data is provided";
	if(stateDataSets[state].length == 0) return true;
	for(var i = 0, property = true; i < stateDataSets[state].length; i++, property = true) {
		var checkStr = stateDataSets[state][i];
		for (var j = 0; j < checkStr.length; j++) {
			if(!data.hasOwnProperty(checkStr[j]))
				property = false;
		}
		if (property) return checkStr;
	}
	return false;
};

var trailingNewlines = function (inputStr) {
	for (var i = 0; i < inputStr.length; i++) {
		if(inputStr[i] == '\n' && inputStr[i+1] == '\n')
			return i+1;
	}
};

var validateTokens = function (tokens) {
  // validate the tokens and throw exceptions if any errors
  // catch the exceptions and display errors on screen

  // return the valid tokens
  return tokens;
};

/* --------------------  END - Data Checking  -------------------- */

/* -------------------------------------------------------------------------- */

/* -------------------- BEGIN - G71 Processing -------------------- */

var processedCodes = new Array();

var convertG71Codes = function (codeBlock) {
	// var startPosition = new Object();
	// set startPosition.x and startPosition.z
	// 
};

var getG71CodeBlock = function(tokensArray) {
	return new Array();
};

var insertG01 = function () {
	// processedCodes.push({
	// type:
	// value:
	// });
}

/* --------------------  END - G71 Processing  -------------------- */