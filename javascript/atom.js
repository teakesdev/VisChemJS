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

export default Atom;
