/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__atom__ = __webpack_require__(1);


let canvas,
    context,
    dragging = false,
    dragStartCoords,
    dragStopCoords,
    fillBox,
    snapshot,
    lastAtom,
    bondType;

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
  context.moveTo(dragStartCoords.x, dragStartCoords.y);
  context.lineTo(position.x, position.y);
  context.stroke();

  context.beginPath();
  context.moveTo(dragStartCoords.x, dragStartCoords.y + 10);
  context.lineTo(position.x, position.y + 10);
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
  let atom = new __WEBPACK_IMPORTED_MODULE_0__atom__["a" /* default */]('C', 4, 0, position);
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
}

window.addEventListener('load', init, false);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Atom {
  constructor(chemical, oxidation, bonds, position) {
    this.chemical = chemical;
    this.oxidation = oxidation;
    this.bonds = bonds || [];
    this.charge = 0;
    this.position = position;
  }

  changeCharge() {
    if (this.bonds.length >= this.oxidation) {
      this.charge = this.bonds.length - this.oxidation;
    }
  }

  attachAtom(atom) {
    this.bonds.push(atom);
    this.changeCharge();
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Atom);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map