/* -------------------- Set Globals BEGIN -------------------- */

// Block descriptors (parameterized codes) which are supported by program
var supportedCodes = new Array("G00", "G01", "G02", "G03", "G04", 
                              "G28", "G71", "G72", "G74", "G92", 
                              "M03", "M04", "M06");

// Codes which don't have parameters
var controlCodes = new Array("G21", "G98", "M05", "M08", "M09", "M30");

/* -------------------- Set Globals  END  -------------------- */

/* -------------------------------------------------------------------------- */

/* -------------------- BEGIN Functions -------------------- */

var isDigit = function(c) { return  /[0-9]/.test(c);  };

var getLineNum = function(charNum, inputString) {
  var count = 0, i = 0;
  while(i <= charNum)
    {
      if(inputString[i] == "\n") count++;
      i++;
    }
    return count;
};

function trim (string) {
  // remove unwanted whitespaces and newlines at the beginning.

  // append '\n' to inputString if not present at last index
  var index = string.length;
  if (string[index-1] != '\n') string += '\n';
  return string;
}

function isControlCode (mode) {
  var counter = 0;
  while(counter < controlCodes.length){
    if (mode === controlCodes[counter]) return true;
    counter++;
  }
  return false;
}

function makeTwoDigit(digit) {
  if(digit.length == 2) return digit;
  else if(digit.length == 1 && isDigit(digit))
    return '0'+digit;
  else throw "Invalid Address '"+digit+"': Shouldn't be greater than 2 digits or less than 1 digit";
}

function isSupported(m) {
  var counter = 0;
  while(counter < supportedCodes.length){
    if(m === supportedCodes[counter]) return true;
    counter++;
  }
  return false;
}
/* -------------------- END Functions -------------------- */

/* -------------------------------------------------------------------------- */

/* -------------------- Begin Tokenizer -------------------- */

var tokenizer = function (input) {
  var tokens = [], c, i = 0, commentState = false, nonPara = false;
  var isWhiteSpace  = function(c) { return  /\s/.test(c); };
  var isNewline = function(c) { return /\n/.test(c); };
  var isWord = function(c) { return /(O|N|G|X|P|U|Z|W|R|F|M|S|T)/.test(c); };
  var advance = function() { return c = inputString[++i] };
  var next = function() { return inputString[i+1] };
  var addToken = function(type, value) {
    tokens.push({
        type: type,
        value: value
      });
  };

  inputString = trim(input);

  try {
    while(i < inputString.length){
      c = inputString[i];

      // Handling comments
      if (c === '(') { commentState = true; advance(); }
      else if (c === ')') {commentState = false; advance(); }
      else if(isNewline(c) && commentState) { throw "Expecting character ')' and found '\\n' at line" + getLineNum(i, inputString); }
      else if(commentState) { advance(); }

      // Handling newlines
      else if(isNewline(c)) { addToken('EB', c); advance(); }

      // Detecting Words
      else if(isWord(c)) {
        var word = c, address = "", mode = "";

        if (word === 'G' || word === 'M' || word === 'O' || word === 'N') { nonPara = true; };
        if (isWhiteSpace(next())) { advance() }
        if(next() === '-'){
          address += advance();
        }
        while(isDigit(advance())) address += c;
        if(c === '.'){
          do address += c; while (isDigit(advance()));
        }
        if(isWhiteSpace(c) || isNewline(c)){
          var newLine = false;
          if (isNewline(c)) { newLine = true; };
          mode = word+address;
          if (nonPara) {
            if (word === 'N' || word === 'O') { addToken('CC', mode); advance(); }
            else if (isControlCode(mode)) { addToken('CC', mode); advance(); }
            else {
              mode = word+makeTwoDigit(address);
              if(isSupported(mode)){
                addToken('BD', mode);
                advance();
              } else  throw "At line "+ getLineNum(i, inputString) +": Invalid or Unsupported Code "+ mode;
            }
          }
          else { addToken('PM', mode); advance(); }

          if(newLine) { addToken('EB', '\n'); newLine = false;}

          // set back to normal
          nonPara = false;
        }
      }
      else if (isWhiteSpace(c)) {
        advance();
      }
      else throw "Unexpected character '"+ c +"' at line " + getLineNum(i, inputString);

    }
  }
  catch(e) {
    document.getElementById('errors').setAttribute("style", "display: block");
    document.getElementById('errors').innerHTML = e;
  }
  finally {
    return tokens;
  }
};

/* -------------------- End Tokenizer -------------------- */
