import Atom from './atom';

let canvas,
    context,
    dragging = false,
    dragStartCoords,
    dragStopCoords,
    fillBox,
    snapshot,
    lastAtom;

let bondType = 'single';

let structure = [];

function getCanvasCoordinates(event) {
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;

        return {x: x, y: y};
}

// function drawHitCircle(position) {
//   //position = dragStopCoords
//   let circleCtx = context.getContent('2d');
//   let midX = (position.x + dragStartCoords.x)/2;
//   let midY = (position.y + dragStartCoords.y)/2;
//   let radius = Math.sqrt(Math.pow((position.x - midX), 2) + Math.pow((position.y - midY), 2));
//   circleCtx.strokeStyle = 'black';
//   circleCtx.fillStyle = 'black';
//   circleCtx.lineWidth = 4;
//   circleCtx.lineCap = 'round';
//   circleCtx.arc(midX, midY, radius, 0, 2*Math.pi);
//   circleCtx.stroke();
// }

function draw(position) {

    if (bondType === "single") {
        drawBond(position);
    }

    if (bondType === "double") {
        drawDoubleBond(position);
    }

    if (bondType === "triple") {
        drawTripleBond(position);
    }

    if (bondType === 'ketone') {
      drawKetone(position);
    }

    if (bondType === 'primaryAmine') {
      drawAmine(position);
    }
}

function drawAmine(position) {
  context.beginPath();
  context.moveTo(dragStartCoords.x, dragStartCoords.y);
  context.lineTo(position.x, position.y);
  context.stroke();
}

function drawKetone(position) {
  context.beginPath();
  context.moveTo(dragStartCoords.x, dragStartCoords.y);
  context.lineTo(position.x, position.y);
  context.stroke();

  context.beginPath();
  context.moveTo(dragStartCoords.x - 10, dragStartCoords.y);
  context.lineTo(position.x - 10, position.y);
  context.stroke();

}

function drawTripleBond(position) {

  context.beginPath();
  context.moveTo(dragStartCoords.x, dragStartCoords.y);
  context.lineTo(position.x, position.y);
  context.stroke();

  context.beginPath();
  context.moveTo(dragStartCoords.x, dragStartCoords.y + 10);
  context.lineTo(position.x, position.y + 10);
  context.stroke();

  context.beginPath();
  context.moveTo(dragStartCoords.x, dragStartCoords.y - 10);
  context.lineTo(position.x, position.y - 10);
  context.stroke();

}

function drawDoubleBond(position) {
  context.beginPath();
  context.moveTo(dragStartCoords.x + 5, dragStartCoords.y - 5);
  context.lineTo(position.x + 5, position.y - 5);
  context.stroke();

  context.beginPath();
  context.moveTo(dragStartCoords.x - 5, dragStartCoords.y + 5);
  context.lineTo(position.x - 5, position.y + 5);
  context.stroke();
}

function drawBond(position) {
  context.beginPath();
  context.moveTo(dragStartCoords.x, dragStartCoords.y);
  context.lineTo(position.x, position.y);
  context.stroke();
}

function takeSnapshot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    context.putImageData(snapshot, 0, 0);
}

function makeAtom(position) {
  // if (!isAtomAtPos(start)) {
  //   let startAtom = new Atom('carbon', 4, 0, start);
  // }
  let atom = new Atom('C', 4, 0, position);
  structure.push(atom);
  console.log(structure);
  return atom;
}

function positionsArray() {
  let positions = [];
  structure.forEach((element) => {
    positions.push(element.position);
  });
  return positions;
}

function isAtomAtPos(pos) {

  for (let i = 0; i < positionsArray().length; i++) {
    if ((pos.x <= (positionsArray()[i].x + 25) && pos.x >= (positionsArray()[i].x - 25))
    && (pos.y <= (positionsArray()[i].y + 25) && pos.y >= (positionsArray()[i].y - 25))){
      console.log('made it');
      lastAtom = structure[i];
      dragStartCoords = positionsArray()[i];
      return true;
    }
  }

  return false;
}

function dragStart(event) {
  dragging = true;
  dragStartCoords = getCanvasCoordinates(event);
  if (isAtomAtPos(dragStartCoords) === false) {
    makeAtom(dragStartCoords);
  } else {
    console.log('falsey value');
  }

  takeSnapshot();
}

function drag(event) {

  if (dragging) {
    restoreSnapshot();
    let position = getCanvasCoordinates(event);
    draw(position);
  }
}

function dragStop(event) {
  dragging = false;
  restoreSnapshot();
  dragStopCoords = getCanvasCoordinates(event);
  let position = getCanvasCoordinates(event);
  let newAtom = makeAtom(position);
  if (isAtomAtPos(dragStartCoords)) {
    newAtom.attachAtom(lastAtom);
    lastAtom.attachAtom(newAtom);
  }
  draw(position);

  console.log(bondType);

  if (bondType === 'ketone') {
    console.log('im in bro');
    context.beginPath();
    //  context.arc(dragStopCoords.x, dragStopCoords.y + 10, 10, 0, 2*Math.pi);
    if (dragStopCoords.y >= dragStartCoords.y) {
      context.font="20px Georgia";
      context.fillText("O",dragStopCoords.x - 13 ,dragStopCoords.y + 18);
      context.stroke();
    } else {
      context.font="20px Georgia";
      context.fillText("O",dragStopCoords.x - 13 ,dragStopCoords.y -10);
      context.stroke();
    }

  }

  if (bondType === 'primaryAmine') {
    if (dragStopCoords.y >= dragStartCoords.y) {
      context.font="20px Georgia";
      context.fillText("NH2",dragStopCoords.x - 13 ,dragStopCoords.y + 18);
      context.stroke();
    } else {
      context.font="20px Georgia";
      context.fillText("NH2",dragStopCoords.x - 13 ,dragStopCoords.y -10);
      context.stroke();
    }
  }
  // drawHitCircle(position);
}

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.lineWidth = 4;
    context.lineCap = 'round';
    fillBox = document.getElementById("fillBox");

    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);

    document.getElementById("single").addEventListener("click", function(){
        bondType = 'single';
    });

    document.getElementById("double").addEventListener("click", function(){
        bondType = 'double';
    });

    document.getElementById("triple").addEventListener("click", function(){
        bondType = 'triple';
    });

    document.getElementById("ketone").addEventListener("click", function(){
        bondType = 'ketone';
    });

    document.getElementById("primaryAmine").addEventListener("click", function(){
        bondType = 'primaryAmine';
    });
}

window.addEventListener('load', init, false);
