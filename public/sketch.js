var socket;


function setup() {
  // put setup code here
  createCanvas(500,500);
  background(50);
  socket = io.connect('http://localhost:3000');//create the socket and connect to the server
  socket.on('mouse', newDrawing);//set the socket to listen message in
}

function newDrawing(data){
  noStroke();
  fill(255,180,180);
  ellipse(data.x, data.y, 36, 36);

}

function mouseDragged(){
  console.log("sending:"+mouseX+","+mouseY);
  var data ={
    x:mouseX,
    y:mouseY
  }
  //emit the message with the name "mouse"
  socket.emit('mouse', data);

  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 36, 36);
}


function draw() {
  // put drawing code here
}


function keyPressed(){
  nounProject.getIconsByTerm('goat', function (err, data) {
    if (!err) {
        console.log(data.icons);
    } else {
      console.log(err)
    }
});
}
