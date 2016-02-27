/* -------------------- BEGIN Functions -------------------- */
var getLineNum = function(charNum, inputString) {
  var count = 1, i = 0;
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
  var controlCodes = new Array("G21", "G98", "G99", "M05", "M08", "M09", "M30");
  var counter = 0;
  while(counter < controlCodes.length){
    if (mode === controlCodes[counter]) { return true; };
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
  var isDigit = function(c) { return  /[0-9]/.test(c);  };
  var isWord = function(c) { return /(O|N|G|X|P|U|Z|W|R|F|M|S|T)/.test(c); };
  var advance = function() { return c = inputString[++i] };
  var next = function() { return inputString[i+1] };
  var addToken = function(type, value) {
    tokens.push(
      {
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
      else if(isNewline(c)) { addToken('EOB', c); advance(); }

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
            if (word === 'N' || word === 'O') { addToken('CONTROL_CODE', mode); advance(); }
            else if (isControlCode(mode)) { addToken('CONTROL_CODE', mode); advance(); }
            else { addToken('BLOCK_DESC', mode); advance(); }
          }
          else { addToken('PARAMETER', mode); advance(); }

          if(newLine) { addToken('EOB', '\n'); newLine = false;}

          // set back to normal
          nonPara = false;
        }
      }
      else if (isWhiteSpace(c)) {
        advance();
      }
      else throw "Unexpected character '"+ c +"' at line" + getLineNum(i, inputString);

    }
  }
  catch(e) {
    document.getElementById('errors').setAttribute("style", "display: block");
    document.getElementById('errors').innerHTML = e;
  }
  finally {
    return tokens;
  }
}

/* -------------------- End Tokenizer -------------------- */
