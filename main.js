"use strict"

// Traveler -> name (string), food (int), isHealthy (bool)
class Traveler {
    constructor(name) {
        this.name = name
        this.food = 1
        this.isHealthy = true
    }
    
    getIsHealthy = () => this.isHealthy
    getFood = () => this.food

    hunt = () => this.food += 2
    
    eat = ()  => { 
        this.food > 0 
        ? this.food -= 1 
        : this.isHealthy = false
    }
}

// Wagon -> capacity (int), passengers (array of Strings)
class Wagon {
    constructor(capacity) {
        this.capacity = capacity
        this.passengers = []
    }

    getTotalPassengers = () => this.passengers.length

    getAvailableSeatCount = () => this.capacity - this.getTotalPassengers()

    join = (traveler) => {
        this.getAvailableSeatCount() 
          ? this.passengers = this.passengers.concat(traveler)
          : console.log("No more room!")
    }

    shouldQuarantine = () => {
        if (this.getTotalPassengers() === 0) {
            return false
        }
        return !!this.passengers.reduce(
            (quarantineIndex, traveler) => 
                traveler.getIsHealthy() 
                ? quarantineIndex += 0
                : quarantineIndex += 1, 0)
    }

    totalFood = () => {
        if (this.getTotalPassengers() === 0) {
            return 0
        }
        return this.passengers.reduce(
            (totalFood, traveler) =>
              totalFood += traveler.getFood(), 0
        )
    }
}

let wagon = new Wagon(2)
// Create three travelers
let henrietta = new Traveler('Henrietta')
let juan = new Traveler('Juan')
let maude = new Traveler('Maude')
console.log(`Wagon Seat Count?: ${ wagon.getAvailableSeatCount() } – EXPECTED: 2. The wagon starts with 2 seats. We haven't added travelers to the wagon yet.`)
wagon.join(henrietta)
console.log(`Wagon Seat Count?: ${ wagon.getAvailableSeatCount() } – EXPECTED: 1. Henrietta just joined.`)
wagon.join(juan)
wagon.join(maude)  // There is no room for her!
console.log(`Wagon Seat Count?: ${ wagon.getAvailableSeatCount() } – EXPECTED: 0 – There is no room for Maude, but Juan was able to join.`)
henrietta.hunt()   // Henrietta goes in search of food.
juan.eat()         // Juan eats – as Juan does. 🤣
juan.eat()         // Juan has run out of food!
console.log(juan)
console.log(`Wagon Should Quarantine?: ${ wagon.shouldQuarantine() } – EXPECTED: true. Juan has run out of food and become unhealthy!`)
console.log(`Wagon's Total Food?: ${ wagon.totalFood() } – EXPECTED: 3.`)