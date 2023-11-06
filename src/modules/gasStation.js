// todo remove .js ext everywhere
import {Column} from './Column.js';

// 39-41
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
    this.addColumnsToFilling();
    this.createRender();
    setInterval(() => {
      this.checkQueueToFilling();
    }, 3000);
  }

  addColumnsToFilling() {
    for (const option of this.stationFuelType) {
      this.#filling.push(new Column(option.type, option.speed));
    }
  }

  createRender() {
    if (this.selectorApp) {
      this.stationRender = new RenderStation(this.selectorApp, this);
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
        this.leaveClient({car, needFuel});
      }
    }, 1000);
  }

  leaveClient({car, needFuel}) {
    this.#ready.push(car);
    this.stationRender.renderStation();
  }

  addCarQueue(car) {
    this.#queue.push(car);
    console.log(' station: ', this);
    this.stationRender.renderStation();
  }
}

export class RenderStation extends Station{
  constructor(app, station) {
    super(station.stationFuelType, app);
    this.app = app;
    this.station = station;
    this.init();
  }
  
  init() {
    this.wrapper = document.createElement('div');
    this.wrapper.style.cssText = `
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: minmax(100px, 1fr);
            align-items: top;
            justify-content: space-between;
        `;
    
    this.renderStation();
  }
  
  renderStation() {
    this.wrapper.textContent = '';
    const queueList = this.createQueue();
    const columns = this.createColumns();
    this.wrapper.append(queueList, columns);
    document.querySelector(this.app).append(this.wrapper);
  }
  
  createQueue() {
    const list = document.createElement('ul');
    this.station.queue.forEach(car => {
      const item = document.createElement('li');
      item.textContent = `${car.title}`;
      item.classList.add(car.typeCar);
      list.append(item);
    });
    return list;
  }
  
  createColumns() {
    const columns = document.createElement('ul');
    columns.classList.add('columns');
    this.station.filling.forEach(column => {
      const itemColumn = document.createElement('li');
      itemColumn.classList.add(column.type);
      
      const columnName = document.createElement('p');
      columnName.textContent = column.type;
      itemColumn.append(columnName);
      
      if (column.car) {
        const car = column.car;
        const fillProcess = document.createElement('span');
        fillProcess.textContent = ` filling now... ${car.nowTank} of ${car.maxTank}`;
        //   fillProcess.style.cssText = `
        //   visibility: hidden;
        //   opacity: 0;
        // `;
        columnName.append(fillProcess);
        
        const itemCar = document.createElement('p');
        itemCar.textContent = car.title;
        itemCar.classList.add(car.typeCar);
        itemColumn.append(itemCar);
      }
      columns.append(itemColumn);
    });
    return columns;
  }
}

