const http = require('http')
const ffi = require('ffi')
const ref = require('ref')
const pako = require('pako')

var server = http.createServer(
  function(req,res)
  {
    var body = []
    //req.url, req.method
    req.on('data', function(chunk) { body.push(chunk)} )
    .on('end', function()
      {
        res.writeHead( 200, { 'content-type':'text/plain', 'Access-Control-Allow-Origin': '*' } )
        var obj = JSON.parse(Buffer.concat(body).toString());
        if( req.url == '/turning' )
        {
          turningApp(obj, res)
        }
        else res.end();
        //console.log(req.url)
      }
    )
  }
).listen(8080)


var ptr = ref.refType(ref.types.void);
var ptrptr = ref.refType(ptr);

var libTurning = ffi.Library('turning', {
  'createWorkpiece':['pointer',[ 'pointer' ]],
  'modifyWorkpiece':['void',[ 'pointer', 'pointer' ]],
  'deleteWorkpiece':['void',['pointer']]
});

var app = new Object;

function turningApp(obj, res)
{
  var obj;

  if( obj[0] == 'createWorkpiece' )
  {
    if( app.workpiece ) { libTurning.deleteWorkpiece(app.workpiece); }
    var cin = new Buffer(16);
    for( var i = 0; i < 4; ++i ) cin.writeFloatLE(obj[1+i],4*i);

    app.workpiece= libTurning.createWorkpiece( cin );
    var NumPoints = 2*obj[3]*obj[4];
    var cout = ref.reinterpret(app.workpiece, 11*NumPoints*4, 0);
    res.end(new Buffer(pako.deflate(cout).buffer));
/*  var count = ref.reinterpret(buf3,4,0).readInt32LE(0);
    console.log( buf4.readDoubleLE(8*i) );*/
  }
  else if( obj[0] == 'modifyWorkpiece' )
  {
    var cin = new Buffer(32);
    for( var i = 0; i < 8; ++i ) cin.writeFloatLE(obj[1+i],4*i);

    libTurning.modifyWorkpiece( app.workpiece, cin );
  }
  else if( obj[0] == 'queryWorkpiece' )
  {
    var NumPoints = 2*obj[1]*obj[2];
    var cout = ref.reinterpret(app.workpiece, 6*NumPoints*4, 0);
    res.end(new Buffer(pako.deflate(cout).buffer));
  }
  res.end();
}

process.on('SIGINT', function(){
  //console.log("clearing ...");
  if(app.workpiece) libTurning.deleteWorkpiece(app.workpiece);
  //console.log("bye");
  process.exit();
});

