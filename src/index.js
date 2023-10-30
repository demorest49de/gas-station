//todo for debugging
import './style.css';

import {PassengerCar, Truck} from "./modules/car.js";
import {Station} from "./modules/gasStation.js";

const open = document.querySelector('.open');
const car = document.querySelector('.car');

const testArray = {
    passangerCar: [
        ['Opel', 'Crossland', 45],
        ['Opel', 'Grandland X', 53, 'gas'],
        ['Mazda', 'cx-5', 55, 'gas'],
        ['BMW', 'M5', 68, 'gas'],
        ['BMW', 'X5', 80, 'gas'],
        ['BMW', 'X5d', 80, 'diesel'],
        ['BMW', 'X3', 65],
        ['BMW', '5', 66],
    ],
    truck: [
        ['MAN', 'TGS', 400, 'gas'],
        ['MAN', 'TGX', 300, 'gas'],
        ['Mercedes-Benz', 'Actros', 450, 'gas'],
        ['Mercedes-Benz', 'Actros L', 650, 'gas'],
        ['Volvo', 'FH16', 700],
        ['Volvo', 'FM', 700],
        ['Volvo', 'FMX', 540],
    ],
};

const getRandomCar = () => {
    const typeBool = Math.random() < 0.6;
    const listCar = typeBool ? testArray.passangerCar : testArray.truck;
    const randomCar = listCar[(Math.floor(Math.random() * listCar.length))];
    return typeBool ? new PassengerCar(...randomCar) : new Truck(...randomCar);
};


const station = new Station([
    {
        type: 'petrol',
    },
    {
        type: 'diesel',
    },
    {
        type: 'gas',
    },
],
'.app');

open.addEventListener('click', () => {
    station.init();
    console.log(' station: ', station);
    open.remove();
    car.style.display = 'block';
    car.addEventListener('click', () => {
        station.addCarQueue(getRandomCar());
    });
});

