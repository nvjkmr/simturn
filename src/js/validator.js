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
	G00 : ['xz'],
	G01 : ['xzf'],
	G02 : ['xzr', 'xzik', 'xzrf', 'xzikf'],
	G03 : ['xzr', 'xzik', 'xzrf', 'xzikf'],
	G04 : ['x', 'p'],
	G28 : ['xzf'],
	G71 : ['ur', 'pquwf', 'pquwfs'],
	G72 : ['wr', 'pquwf', 'pquwfs'],
	G74 : ['r', 'zqf', 'zqfs'],
	G92 : ['xzf'],
	M03 : ['s'],
	M04 : ['s'],
	M06 : ['t']
};

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
		if (property) return true;
	}
	return false;
};

function validateTokens (tokens) {
  // validate the tokens and throw exceptions if any errors
  // catch the exceptions and display errors on screen

  // return the valid tokens
  return tokens;
}
