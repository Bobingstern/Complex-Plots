let X_LOW = -6;
let X_HIGH = 4

let Y_LOW=-6;
let Y_HIGH=4;

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
function f(x){
  //let z = math.abs(math.gamma(math.complex(x, y)))
  let s = FUNCTION
  s=s.replaceAll("x", "("+x+")");
  let z = (math.evaluate(s))
  if (z > Z_HIGH){
    z = Z_HIGH + 0.1
  }
  if (z < Z_LOW){
    z = Z_LOW-0.1
  }
  return z
}
function performArr(x){
  let r = []
  let I = []
  for (let i=0;i<x.length;i++){
    let tempr = []
    let tempi = []
    let D = f(x[i])
    //console.log(D)
    if (D.type == "Complex"){
      r.push(D.re)
      I.push(D.im)
    }
    else{
      r.push(D)
      I.push(0)
    }
  }
  return [r, I]
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
  let x = linespace(X_LOW,X_HIGH,500)
  let evs = performArr(x)
  let yTrue = evs[1]
  
  let z = evs[0]
  let y = evs[1]
  //let z = performArr()
  let a = 0
  
  //console.log(z[0])
  // let Z = performArr(X, Y)
  
  // let o = meshgrid(x, y)
  // let X = o[0]
  // let Y = o[1]
  
  
  var data = [{
    x:x,
    y:y,
    z:z,
    type: 'scatter3d',
    mode:"lines",
    colorscale: "YlGnBu",
    line:{
      width:8
    }
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
      camera: {
          center: {
                x: 0, y: 0, z: 0 }, 
          eye: { 
                x: 0, y: -2, z: 0 }, 
           up: {
                x: 0, y: 0, z: 1 }
      },
      zaxis: {autorange:false, range: [Z_LOW, Z_HIGH], title:"Y axis"},
      yaxis: {autorange:false, range: [Y_LOW, Y_HIGH], title:"Imaginary axis"},
      //xaxis: {autorange:false, range: [X_LOW, X_HIGH], title:"X axis"}
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
