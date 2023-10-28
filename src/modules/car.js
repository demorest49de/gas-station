export class Car {
    #maxTank;
    constructor(brand, model, maxTank) {
        this.#maxTank = maxTank;
        this.brand = brand;
        this.model = model;
        this.nowTank = Math.floor(Math.random() * this.#maxTank);
    }
    
    get title() {
        return `${this.brand} ${this.model}`;
    }
    
    setModel(model) {
        this.model = model;
    }
    
    get needFuel() {
        return this.#maxTank - this.nowTank;
    }
    
    fillUp() {
        this.nowTank = this.maxTank;
    }
    
    get maxTank() {
        return this.#maxTank;
    }
    
    static string = 'Новый автомобиль';
    
    static logger(str) {
        console.log(' str: ', str);
    }
    
    static from = function ({brand, model, maxTank}) {
        const car = new Car(brand, model, maxTank);
        Car.logger(Car.string + JSON.stringify(car));
        return car;
    };
}

export class PassengerCar extends Car {
    constructor(brand, model, maxTank, typeFuel = 'petrol') {
        super(brand, model, maxTank);
        this.typeFuel = typeFuel;
        this.typeCar = 'passenger';
    }
}


export class Truck extends Car {
    constructor(brand, model, maxTank, typeFuel = 'diesel') {
        super(brand, model, maxTank);
        this.typeFuel = typeFuel;
        this.typeCar = 'truck';
    }
}


