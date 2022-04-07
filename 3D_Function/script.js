let X_LOW = -6;
let X_HIGH = 6

let Y_LOW=-6;
let Y_HIGH=6;

let Z_LOW = -5;
let Z_HIGH = 5;

let FUNCTION = ""
let LOG = false
function linespace(startValue, stopValue, cardinality) {
  var arr = [];
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(startValue + (step * i));
  }
  return arr;
}
function f(x, y){
  //let z = math.abs(math.gamma(math.complex(x, y)))
  let s = FUNCTION
  s=s.replaceAll("x", "("+x+")");
  s=s.replaceAll("y", "("+y+")")
  let z = (math.evaluate(s))
  if (z.type == "Complex"){
    z = z.re
  }
  if (z > Z_HIGH){
    z = Z_HIGH + 0.1
  }
  if (z < Z_LOW){
    z = Z_LOW-0.1
  }
  if (LOG){
    console.log(s)
  }
  return z
}
function performArr(x, y){
  let z = []
  for (let i=0;i<x.length;i++){
    let temp = []
    for (let j=0;j<x[i].length;j++){
      
      temp.push(f(x[i][j], y[i][j]))
    }
    z.push(temp)
  }
  return z
}

function meshgrid(x, y){
  let out = []
  let out2 = []
  for (let i=0;i<x.length;i++){
    out.push(x)
  }
  for (let i=0;i<y.length;i++){
    let temp = []
    for (let j=0;j<y.length;j++){
      temp.push(y[i])
    }
    out2.push(temp)
  }
  return [out, out2]
}


function PLOT(){
  FUNCTION = document.getElementById("func").value
  let x = linespace(X_LOW,X_HIGH,100)
  let y=linespace(Y_LOW,Y_HIGH,100)
  
  let o = meshgrid(x, y)
  let X = o[0]
  let Y = o[1]
  let Z = performArr(X, Y)
  
  var data = [{
    x:X,
    y:Y,
    z:Z,
    type: 'surface',
    colorscale: "YlGnBu"
  }];
  
  var layout = {
    title: 'Graph',
    autosize: false,
    width:1000,
    height:500,
    colorscale:"YlGnBu",
    scene: {
      aspectratio: {
       x: 1.5, y: 1.5, z: 1,
      },
      zaxis: {autorange:false, range: [Z_LOW, Z_HIGH]},
      yaxis: {autorange:false, range: [Y_LOW, Y_HIGH]}
    }
    // width: 1270,
    // height: 720,
  };
  Plotly.newPlot('graph', data, layout);
}

function updateBounds(){
  Z_LOW = parseInt(document.getElementById("z_low").value)
  Z_HIGH = parseInt(document.getElementById("z_high").value)

  Y_LOW = parseInt(document.getElementById("y_low").value)
  Y_HIGH = parseInt(document.getElementById("y_high").value)

  X_LOW = parseInt(document.getElementById("x_low").value)
  X_HIGH = parseInt(document.getElementById("x_high").value)

  //console.log(X_LOW, X_HIGH, Y_LOW, Y_HIGH, Z_LOW, Z_HIGH)
}

setInterval(updateBounds, 100)
PLOT()
