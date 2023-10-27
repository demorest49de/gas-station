import {Column} from "./Column";

export class Station {
    constructor(type) {
        this.type = type;
        this.queue = [];
        this.filling = [];
        this.ready = [];
    }
    
    //todo инициализация должна быть
    init() {
        for (const option of this.type) {
            for (let i = 0; i < option.count; i++) {
                this.filling.push(new Column(option.type, option.speed));
            }
        }
        
        setInterval(() => {
            this.checkQueueToFilling();
        }, 2000);
    }
    
    checkQueueToFilling() {
        if (this.queue.length) {
            for (let i = 0; i < this.queue.length; i++) {
                for (let j = 0; j < this.filling.length; j++) {
                    if (!this.filling[j].car &&
                        this.queue[i].typeFuel === this.filling.typeFuel) {
                        this.filling[j].car = this.queue.splice(i, 1)[0];
                        this.fillingGo(this.filling[j]);
                    }
                }
            }
        }
    }
    
    fillingGo(column) {
        console.log(` log: заправляем${column}`);
    }
    
    addCarQueue(car) {
    
    }
}