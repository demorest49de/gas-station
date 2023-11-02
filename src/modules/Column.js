export class Column {
  #car = null;
  constructor(type) {
    this.type = type;
    this.speed = 5;
  }

  set car(car) {
    this.#car = car;
  }

  get car() {
    return this.#car;
  }
}
