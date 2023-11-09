// todo remove .js ext everywhere
import {Column} from './Column.js';


export class Station {
  #queue = [];
  #filling = [];
  #ready = [];

  constructor(type, selectorApp = null) {
    this.stationFuelType = type;
    this.selectorApp = selectorApp;
    this.stationRender = null;
  }

  get filling() {
    return this.#filling;
  }

  get queue() {
    return this.#queue;
  }

  init() {
    setInterval(() => {
      this.checkQueueToFilling();
    }, 3000);
  }

  addColumnsToFilling() {
    for (const option of this.stationFuelType) {
      this.#filling.push(new Column(option.type, option.speed));
    }
  }

  checkQueueToFilling() {
    if (this.#queue.length) {
      for (let i = 0; i < this.#queue.length; i++) {
        for (let j = 0; j < this.#filling.length; j++) {
          if (!this.#filling[j].car &&
                        this.#queue[i].typeFuel === this.#filling[j].type) {
            this.#filling[j].car = this.#queue.splice(i, 1)[0];
            this.fillingGo(this.#filling[j]);
            this.stationRender.renderStation();
            break;
          }
        }
      }
    }
  }

  fillingGo(column) {
    const car = column.car;
    const needFuel = car.needFuel;
    console.log(' car: ', car);
    console.log(`${car.title} has now ${car.nowTank} litres of ${car.typeFuel}`);
    console.log(`you need to fuel up ${needFuel} litres`);
    console.log(`your column is ${JSON.stringify(column)}`);
    
    const timerId = setInterval(() => {
      if (car.nowTank + column.speed > car.maxTank) {
        car.nowTank += car.maxTank - car.nowTank;
      } else {
        car.nowTank += column.speed;
      }
      if (car.maxTank - car.nowTank) {
        console.log(`for ${car.title} you need fill up ${car.maxTank - car.nowTank} litres more`);
      }
      
      this.stationRender.renderStation();
      if (car.nowTank >= car.maxTank) {
        clearInterval(timerId);
        car.fillUp();
        column.car = null;
        this.leaveClient({car});
      }
    }, 1000);
  }

  leaveClient({car}) {
    this.#ready.push(car);
    this.stationRender.renderStation();
  }

  addCarQueue(car) {
    this.#queue.push(car);
    console.log(' station: ', this);
    this.stationRender.renderStation();
  }
}
