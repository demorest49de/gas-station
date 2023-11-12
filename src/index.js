// todo for debugging
import './style.css';

import {PassengerCar, Truck} from './modules/car.js';
import {RenderStation} from "./modules/RenderStation.js";

const open = document.querySelector('.open');
const car = document.querySelector('.car');

const testArray = {
  passangerCar: [
    ['Opel', 'Crossland', 45],
    ['BMW', 'M5', 68],
    ['BMW', 'X5', 80],
    ['BMW', 'X3', 65],
    ['BMW', '5', 66],
    ['Mazda', 'cx-5', 55, 'gas'],
    ['BMW', 'X5d', 80, 'diesel'],
    ['Opel', 'Grandland X', 53, 'gas'],
  ],
  truck: [
    ['Volvo', 'FH16', 700],
    ['Volvo', 'FM', 700],
    ['Volvo', 'FMX', 540],
    ['MAN', 'TGS', 400, 'gas'],
    ['MAN', 'TGX', 300, 'gas'],
    ['Mercedes-Benz', 'Actros', 450, 'gas'],
    ['Mercedes-Benz', 'Actros L', 650, 'gas'],
  ],
};

const getRandomCar = () => {
  const typeBool = Math.random() < 0.6;
  const listCar = typeBool ? testArray.passangerCar : testArray.truck;
  const randomCar = listCar[(Math.floor(Math.random() * listCar.length))];
  return typeBool ? new PassengerCar(...randomCar) : new Truck(...randomCar);
};

const stationWithRender = new RenderStation([
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
  open.remove();
  car.style.display = 'block';
  car.addEventListener('click', () => {
    stationWithRender.addCarQueue(getRandomCar());
  });
});