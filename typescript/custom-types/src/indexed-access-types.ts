interface Car {
    make: string,
    model?: string,
    year: number
}

let car: Car = {
    make: 'Toyolta',
    model: 'Camaro',
    year:  2024
}

type CarModel = Car["model"] | Car["make"];

let carName: CarModel = car.model || car.make;