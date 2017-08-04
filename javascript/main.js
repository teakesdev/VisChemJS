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

    if (bondType === 'secondaryAmine') {
      drawSecondaryAmine(position);
    }

    if (bondType === 'tertiaryAmine') {
      drawTertiaryAmine(position);
    }

    if (bondType === 'alcohol') {
      drawAlcohol(position);
    }

    if (bondType === 'chlorine') {
      drawHalogen(position);
    }

    if (bondType === 'fluorine') {
      drawHalogen(position);
    }

    if (bondType === 'bromine') {
      drawHalogen(position);
    }

    if (bondType === 'cyclohexane') {
      drawCyclohexane(position);
    }

    if (bondType === 'imine') {
      drawImine(position);
    }
}

function drawCyclohexane(position) {
  console.log('inthure');
  // context.beginPath();
  // context.moveTo(position.x, position.y);
  // context.lineTo(position.x + 100, position.y + 50);
  // context.lineTo(position.x + 50, position.y + 100);
  // context.lineTo(position.x + 0, position.y + 90);
  // context.closePath();
  // context.stroke();

  var numberOfSides = 6,
    size = 60,
    Xcenter = position.x,
    Ycenter = position.y;

context.beginPath();
context.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));

for (var i = 1; i <= numberOfSides;i += 1) {
    context.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));




  let ring1 = new Atom('C', 2, 0, {x: (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides)), y: (Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides)) });


  // let atom1 = [ring1, ring2, ring3, ring4, ring5, ring6];
  //
  // structure.push(...atom1);
  structure.push(ring1);
  }
  context.stroke();
    dragStopCoords = getCanvasCoordinates(event);


}
function drawHalogen(position) {
  context.beginPath();
  context.moveTo(dragStartCoords.x, dragStartCoords.y);
  context.lineTo(position.x, position.y);
  context.stroke();
}

function drawAlcohol(position) {
  context.beginPath();
  context.moveTo(dragStartCoords.x, dragStartCoords.y);
  context.lineTo(position.x, position.y);
  context.stroke();
}

function drawTertiaryAmine(position) {
  context.beginPath();
  context.moveTo(dragStartCoords.x, dragStartCoords.y);
  context.lineTo(position.x, position.y);
  context.stroke();
}

function drawSecondaryAmine(position) {
  context.beginPath();
  context.moveTo(dragStartCoords.x, dragStartCoords.y);
  context.lineTo(position.x, position.y);
  context.stroke();
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

function drawImine(position) {
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
    context.moveTo(dragStartCoords.x + 5, dragStartCoords.y + 5);
    context.lineTo(position.x + 5, position.y + 5);
    context.stroke();

    context.beginPath();
    context.moveTo(dragStartCoords.x - 5, dragStartCoords.y - 5);
    context.lineTo(position.x - 5, position.y - 5);
    context.stroke();
  }
  // context.beginPath();
  // context.moveTo(dragStartCoords.x + 5, dragStartCoords.y - 5);
  // context.lineTo(position.x + 5, position.y - 5);
  // context.stroke();
  //
  // context.beginPath();
  // context.moveTo(dragStartCoords.x - 5, dragStartCoords.y + 5);
  // context.lineTo(position.x - 5, position.y + 5);
  // context.stroke();


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
  let atom;

  if (bondType === "single") {
      atom = new Atom('C', 4, 0, position);
  }

  if (bondType === "double") {
      atom = new Atom('C', 4, 0, position);
  }

  if (bondType === "triple") {
      atom = new Atom('C', 4, 0, position);
  }

  if (bondType === 'ketone') {
    atom = new Atom('O', 1, 0, position);
  }

  if (bondType === 'primaryAmine') {
    atom = new Atom('N', 1, 0, position);
  }

  if (bondType === 'secondaryAmine') {
    atom = new Atom('N', 2, 0, position);
  }

  if (bondType === 'tertiaryAmine') {
    atom = new Atom('N', 3, 0, position);
  }

  if (bondType === 'alcohol') {
    atom = new Atom('O', 1, 0, position);
  }

  if (bondType === 'bromine') {
    atom = new Atom('Br', 1, 0, position);
  }

  if (bondType === 'chlorine') {
    atom = new Atom('Cl', 1, 0, position);
  }

  if (bondType === 'fluorine') {
    atom = new Atom('F', 1, 0, position);
  }

  if (bondType === 'cyclohexane') {
  return;
  }

  if (bondType === 'imine') {
    atom = new Atom('NH', 1, 0, position);
  }


  // atom = new Atom('C', 4, 0, position);
  structure.push(atom);
  console.log(structure);
  return atom;
}

function makeCarbon(position) {
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
  if (bondType !== 'cyclohexane') {
    if (isAtomAtPos(dragStartCoords) === false) {
      makeCarbon(dragStartCoords);
    } else {
      console.log('falsey value');
    }
  }
  if (bondType === 'cyclohexane') {
    draw(getCanvasCoordinates(event));
  } else {
  // draw(getCanvasCoordinates(event));
  takeSnapshot();
}
}


function drag(event) {

  if (dragging) {
    if (bondType !== 'cyclohexane') {
    restoreSnapshot();
    let position = getCanvasCoordinates(event);

      draw(position);
    }
  }
}


function dragStop(event) {
  dragging = false;
  if (bondType !== 'cyclohexane') {
  restoreSnapshot();
  }
  dragStopCoords = getCanvasCoordinates(event);
  let position = getCanvasCoordinates(event);
  let newAtom = makeAtom(position);
  if (bondType !== 'cyclohexane') {
    if (isAtomAtPos(dragStartCoords)) {
      newAtom.attachAtom(lastAtom);
      lastAtom.attachAtom(newAtom);
    }
  }
  if (bondType !== 'cyclohexane') {
  draw(position);
}
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

  if (bondType === 'secondaryAmine') {
    if (dragStopCoords.y >= dragStartCoords.y) {
      context.font="20px Georgia";
      context.fillText("NH",dragStopCoords.x - 13 ,dragStopCoords.y + 18);
      context.stroke();
    } else {
      context.font="20px Georgia";
      context.fillText("NH",dragStopCoords.x - 13 ,dragStopCoords.y -10);
      context.stroke();
    }
  }

  if (bondType === 'tertiaryAmine') {
    if (dragStopCoords.y >= dragStartCoords.y) {
      context.font="20px Georgia";
      context.fillText("N",dragStopCoords.x - 13 ,dragStopCoords.y + 18);
      context.stroke();
    } else {
      context.font="20px Georgia";
      context.fillText("N",dragStopCoords.x - 13 ,dragStopCoords.y -10);
      context.stroke();
    }
  }

  if (bondType === 'alcohol') {
    if (dragStopCoords.y >= dragStartCoords.y) {
      context.font="20px Georgia";
      context.fillText("OH",dragStopCoords.x - 13 ,dragStopCoords.y + 18);
      context.stroke();
    } else {
      context.font="20px Georgia";
      context.fillText("OH",dragStopCoords.x - 13 ,dragStopCoords.y -10);
      context.stroke();
    }
  }

  if (bondType === 'chlorine') {
    if (dragStopCoords.y >= dragStartCoords.y) {
      context.font="20px Georgia";
      context.fillText("Cl",dragStopCoords.x - 13 ,dragStopCoords.y + 18);
      context.stroke();
    } else {
      context.font="20px Georgia";
      context.fillText("Cl",dragStopCoords.x - 13 ,dragStopCoords.y -10);
      context.stroke();
    }
  }

  if (bondType === 'bromine') {
    if (dragStopCoords.y >= dragStartCoords.y) {
      context.font="20px Georgia";
      context.fillText("Br",dragStopCoords.x - 13 ,dragStopCoords.y + 18);
      context.stroke();
    } else {
      context.font="20px Georgia";
      context.fillText("Br",dragStopCoords.x - 13 ,dragStopCoords.y -10);
      context.stroke();
    }
  }

  if (bondType === 'fluorine') {
    if (dragStopCoords.y >= dragStartCoords.y) {
      context.font="20px Georgia";
      context.fillText("F",dragStopCoords.x - 13 ,dragStopCoords.y + 18);
      context.stroke();
    } else {
      context.font="20px Georgia";
      context.fillText("F",dragStopCoords.x - 13 ,dragStopCoords.y -10);
      context.stroke();
    }
  }

  if (bondType === 'imine') {
    console.log('im in bro');
    context.beginPath();
    //  context.arc(dragStopCoords.x, dragStopCoords.y + 10, 10, 0, 2*Math.pi);
    if (dragStopCoords.y >= dragStartCoords.y) {
      context.font="20px Georgia";
      context.fillText("NH",dragStopCoords.x - 13 ,dragStopCoords.y + 18);
      context.stroke();
    } else {
      context.font="20px Georgia";
      context.fillText("NH",dragStopCoords.x - 13 ,dragStopCoords.y -10);
      context.stroke();
    }

  }
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

    document.getElementById("secondaryAmine").addEventListener("click", function(){
        bondType = 'secondaryAmine';
    });

    document.getElementById("tertiaryAmine").addEventListener("click", function(){
        bondType = 'tertiaryAmine';
    });

    document.getElementById("alcohol").addEventListener("click", function(){
        bondType = 'alcohol';
    });

    document.getElementById("bromine").addEventListener("click", function(){
        bondType = 'bromine';
    });

    document.getElementById("chlorine").addEventListener("click", function(){
        bondType = 'chlorine';
    });

    document.getElementById("fluorine").addEventListener("click", function(){
        bondType = 'fluorine';
    });

    document.getElementById("cyclohexane").addEventListener("click", function(){
        bondType = 'cyclohexane';
    });

    document.getElementById("imine").addEventListener("click", function(){
        bondType = 'imine';
    });
}

window.addEventListener('load', init, false);
