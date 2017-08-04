# VisChemJS
[VisChemJS](https://muuuchem.github.io/VisChemJS/) is a JavaScript and HTML5 frontend web application based on molecular chemistry editors such as [Kekule](http://partridgejiang.github.io/Kekule.js/demos/demoLauncher.html?id=chemEditor)

## Structure

VisChemJS is built with HTML5 Canvas, CSS, and Vanilla JavaScript. All DOM manipulation was done without jQuery.

## Features

### Organic Chemistry Structure Drawing

Users are given the ability to draw organic chemistry molecules and add common organic functional groups. Utilizing vanilla JavaScript and HTML5 Canvas, users are allowed to click and drag bonds to their desired size.

[buttons](./images/buttons.png)


### Charge

Bonds automatically connect when within range of other atoms and the atoms internally keep up with their charge. The total molecular charge is kept up with internally and updated upon filling atoms with too many bonds.

[structure](./images/structure.png)

### In the Future

The following changes will be incrementally added to the program:

#### Structure Reading

The number of each element in a molecule will be shown.

#### More Functional Groups

The app will be expanded to allow more functional groups and elements.
