//todo remove .js ext everywhere
import {Column} from "./Column.js";
import {RenderStation} from "./RenderStation.js";
//39-41
export class Station {
    #queue = [];
    #filling = [];
    #ready = [];
    
    constructor(type, renderApp = null) {
        this.type = type;
        this.renderApp = renderApp;
        this.renderStation = null;
    }
    
    //todo инициализация должна быть
    init() {
        for (const option of this.type) {
            for (let i = 0; i < option.count; i++) {
                this.#filling.push(new Column(option.type, option.speed));
            }
        }
        
        setInterval(() => {
            
            // console.log(' this: ', this);
            this.checkQueueToFilling();
        }, 3000);
    }
    
    checkQueueToFilling() {
        if (this.#queue.length) {
            for (let i = 0; i < this.#queue.length; i++) {
                for (let j = 0; j < this.#filling.length; j++) {
                    if (!this.#filling[j].car &&
                        this.#queue[i].typeFuel === this.#filling[j].type) {
                        this.#filling[j].car = this.#queue.splice(i, 1)[0];
                        this.fillingGo(this.#filling[j]);
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
                console.log(`you need fill up ${car.maxTank - car.nowTank} litres more`);
            }
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
        console.log(`filled ${needFuel} litres total to ${car.title}`);
    }
    
    addCarQueue(car) {
        this.#queue.push(car);
    }
}