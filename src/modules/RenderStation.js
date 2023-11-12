import {Station} from "./gasStation.js";


export class RenderStation extends Station {
  constructor(types, selectorApp) {
    super(types);
    this.selectorApp = selectorApp;
    this.initOfRender();
  }
  
  initOfRender() {
    this.wrapper = document.createElement('div');
    this.wrapper.style.cssText = `
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: minmax(100px, 1fr);
            align-items: top;
            justify-content: space-between;
        `;
    super.addColumnsToFilling();
    this.renderStation();
  }

  renderStation() {
    this.wrapper.textContent = '';
    const queueList = this.createQueue();
    const columns = this.createColumns();
    this.wrapper.append(queueList, columns);
    document.querySelector(this.selectorApp).append(this.wrapper);
  }

  createQueue() {
    const list = document.createElement('ul');
    list.classList.add('queue');
    super.queue.forEach(car => {
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
    super.filling.forEach(column => {
      const itemColumn = document.createElement('li');
      itemColumn.classList.add(column.type);

      const columnName = document.createElement('p');
      columnName.textContent = column.type;
      itemColumn.append(columnName);

      if (column.car) {
        const car = column.car;
        const fillProcess = document.createElement('span');
        fillProcess.textContent = ` filling now... ${car.nowTank} of ${car.maxTank}`;
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

