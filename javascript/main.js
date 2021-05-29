import Atom from './atom';

let canvas,
    context,
    dragging = false,
    dragStartCoords,
    dragStopCoords,
//    fillBox,
    snapshot,
    lastAtom;

let atomType = 'single';
//let atomType = 'carbon'


let structure = [];

function getStructureCharge() {
  let charge = 0;
  for (let i = 0; i < structure.length; i++) {
    structure[i].changeCharge();
    charge += structure[i].charge;
  }
  return charge;
}

function getCanvasCoordinates(event) {
  let x = event.clientX - canvas.getBoundingClientRect().left;
  let y = event.clientY - canvas.getBoundingClientRect().top;
  return {x: x, y: y};
}

function draw(position) {

  if (atomType === "single") {
      drawBond(position);
  }

  if (atomType === "double") {
    drawDoubleBond(position);
  }

  if (atomType === "triple") {
    drawTripleBond(position);
  }

  if (atomType === 'ketone') {
    drawKetone(position);
  }

  if (atomType === 'primaryAmine') {
    drawAmine(position);
  }

  if (atomType === 'secondaryAmine') {
    drawSecondaryAmine(position);
  }

  if (atomType === 'tertiaryAmine') {
    drawTertiaryAmine(position);
  }

  if (atomType === 'alcohol') {
    drawAlcohol(position);
  }

  if (atomType === 'chlorine') {
    drawHalogen(position);
  }

  if (atomType === 'fluorine') {
    drawHalogen(position);
  }

  if (atomType === 'bromine') {
    drawHalogen(position);
  }

  if (atomType === 'cyclohexane') {
    drawCyclohexane(position);
  }

  if (atomType === 'imine') {
    drawImine(position);
  }

  if (atomType === 'benzene') {
    drawBenzene(position);
  }
}

function drawBenzene(position) {

  var numberOfSides = 6,
    size = 60,
    Xcenter = position.x,
    Ycenter = position.y;

  context.beginPath();
  context.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));

  for (let i = 1; i <= numberOfSides;i += 1) {
    context.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
    let ring1 = new Atom('C', 1, 0, { 
        x: (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides)),
        y: (Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides)) 
    });
    structure.push(ring1);
  }

  context.stroke();
  context.beginPath();
  context.moveTo(
    Xcenter +  size * Math.cos(0),
    Ycenter +  size *  Math.sin(0)
  );
  context.arc(Xcenter, Ycenter, 25, 0, 2*Math.pi);
  context.fill();
  context.stroke();
  dragStopCoords = getCanvasCoordinates(event);
}

function drawCyclohexane(position) {
  var numberOfSides = 6,
    size = 60,
    Xcenter = position.x,
    Ycenter = position.y;

  context.beginPath();
  context.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));

  for (var i = 1; i <= numberOfSides;i += 1) {
    context.lineTo(
      Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides),
      Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides)
    );

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
  context.moveTo(dragStartCoords.x , dragStartCoords.y + 5);
  context.lineTo(position.x , position.y + 5);
  context.stroke();

  context.beginPath();
  context.moveTo(dragStartCoords.x, dragStartCoords.y - 5);
  context.lineTo(position.x, position.y - 5);
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

//function restructureMolecule() {}//Maybe this should be in molecule js
//Supposed to even bonds out ==> could be called redrawMolecule

function takeSnapshot() {
  snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
  context.putImageData(snapshot, 0, 0);
}

function makeAtom(position) {
  let atom;

  if (atomType === "carbon") {
    atom = new Atom('C', 4, 0, position)
  }
// To be replaced
  if (atomType === "single") {
    atom = new Atom('C', 4, 0, position);
  }

  if (atomType === "double") {
    atom = new Atom('C', 4, 0, position);
  }

  if (atomType === "triple") {
    atom = new Atom('C', 4, 0, position);
  }
//
  if (atomType === 'ketone') {
    atom = new Atom('O', 1, 0, position);
  }

  if (atomType === 'Amine') {
    atom = new Atom('N', 1, 0, position);
  }

// To also be replaced
  if (atomType === 'primaryAmine') {
    atom = new Atom('N', 1, 0, position);
  }

  if (atomType === 'secondaryAmine') {
    atom = new Atom('N', 2, 0, position);
  }

  if (atomType === 'tertiaryAmine') {
    atom = new Atom('N', 3, 0, position);
  }
//
  if (atomType === 'alcohol') {
    atom = new Atom('O', 1, 0, position);
  }

  if (atomType === 'bromine') {
    atom = new Atom('Br', 1, 0, position);
  }

  if (atomType === 'chlorine') {
    atom = new Atom('Cl', 1, 0, position);
  }

  if (atomType === 'fluorine') {
    atom = new Atom('F', 1, 0, position);
  }

  if (atomType === 'cyclohexane') {
    return;//MUST MAKE THIS
  }

  if (atomType === 'imine') {
    atom = new Atom('NH', 1, 0, position);
  }

  if (atomType === 'benzene') {
    return;//MUST MAKE THIS
  }

  structure.push(atom);
  return atom;
}

function makeCarbon(position) {
  let atom = new Atom('C', 4, 0, position);
  structure.push(atom);
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
  let positions = positionsArray()

  for (let i = 0; i < positions.length; i++) {
    if ((pos.x <= (positions[i].x + 25) && pos.x >= (positions()[i].x - 25))
    && (pos.y <= (positions[i].y + 25) && pos.y >= (positions()[i].y - 25))) {
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
  if (atomType !== 'cyclohexane' && atomType !== 'benzene') {
    if (isAtomAtPos(dragStartCoords) === false) {
      makeCarbon(dragStartCoords);
    } else {
      console.log('falsey value');
    }
  }
  if (atomType === 'cyclohexane' || atomType === 'benzene') {
    draw(getCanvasCoordinates(event));
  } else {
  // draw(getCanvasCoordinates(event));
    takeSnapshot();
  }
}

function drag(event) {

  if (dragging) {
    if (atomType !== 'cyclohexane' && atomType !== 'benzene') {
      restoreSnapshot();
      let position = getCanvasCoordinates(event);
      draw(position);
    }
  }
}

function dragStop(event) {
  dragging = false;
  if (atomType !== 'cyclohexane' && atomType !== 'benzene') {
    restoreSnapshot();
  }
  dragStopCoords = getCanvasCoordinates(event);
  let position = getCanvasCoordinates(event);
  let newAtom = makeAtom(position);
  if (atomType !== 'cyclohexane' && atomType !== 'benzene') {
    if (isAtomAtPos(dragStartCoords)) {
      newAtom.attachAtom(lastAtom);
      lastAtom.attachAtom(newAtom);
    }
  }
  if (atomType !== 'cyclohexane' && atomType !== 'benzene') {
    draw(position);
  }

  if (atomType === 'ketone') {
    console.log('im in bro');
    context.beginPath();
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
// COULD CONSOLODATE These into one just as we are gonna do bonds
  if (atomType === 'primaryAmine') {
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

  if (atomType === 'secondaryAmine') {
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

  if (atomType === 'tertiaryAmine') {
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
//
  if (atomType === 'alcohol') {
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

  if (atomType === 'chlorine') {
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

  if (atomType === 'bromine') {
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

  if (atomType === 'fluorine') {
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

  if (atomType === 'imine') {
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
  context.beginPath();
  context.fillStyle = 'white';
  context.fillRect(50, 20, 110, 100);
  context.clearRect(50, 20, 110, 100);

  context.beginPath();
  context.fillStyle = 'black';
  context.font="20px Georgia";
  context.fillText(`Charge = -${getStructureCharge()}`, 50 ,50);
  context.stroke();
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

//We should also try to add hover and bond-click event listeners here

// To Delete
    document.getElementById("single").addEventListener("click", function(){
        atomType = 'single';
    });

    document.getElementById("double").addEventListener("click", function(){
        atomType = 'double';
    });

    document.getElementById("triple").addEventListener("click", function(){
        atomType = 'triple';
    });
// 
    document.getElementById("ketone").addEventListener("click", function(){
        atomType = 'ketone';
    });

    document.getElementById("primaryAmine").addEventListener("click", function(){
        atomType = 'primaryAmine';
    });

    document.getElementById("secondaryAmine").addEventListener("click", function(){
        atomType = 'secondaryAmine';
    });

    document.getElementById("tertiaryAmine").addEventListener("click", function(){
        atomType = 'tertiaryAmine';
    });

    document.getElementById("alcohol").addEventListener("click", function(){
        atomType = 'alcohol';
    });

    document.getElementById("bromine").addEventListener("click", function(){
        atomType = 'bromine';
    });

    document.getElementById("chlorine").addEventListener("click", function(){
        atomType = 'chlorine';
    });

    document.getElementById("fluorine").addEventListener("click", function(){
        atomType = 'fluorine';
    });

    document.getElementById("cyclohexane").addEventListener("click", function(){
        atomType = 'cyclohexane';
    });

    document.getElementById("imine").addEventListener("click", function(){
        atomType = 'imine';
    });

    document.getElementById("benzene").addEventListener("click", function(){
        atomType = 'benzene';
    });
}

window.addEventListener('load', init, false);
