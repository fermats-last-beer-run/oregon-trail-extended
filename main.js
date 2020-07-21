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

class Doctor extends Traveler {
    constructor(name) {
        super(name)
    }

    heal = (traveler) => {
        traveler.isHealthy = true
    }
}

class Hunter extends Traveler {
    constructor(name) {
        super(name)
        this.food = 2
    }

    hunt = () => {
        this.food += 5
    }

    eat = ()  => { 
        this.food > 0 
        ? this.food -= 2 
        : this.isHealthy = false

        if (this.food < 0) {
            this.food = 0
            this.isHealthy = false
        }
    }

    giveFood = (traveler, numOfFoodUnits) => {
        if (this.food - numOfFoodUnits >= 0) {
            this.food -= numOfFoodUnits
            traveler.food += numOfFoodUnits
        }
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

    // Create a wagon that can hold 4 people
    let wagon = new Wagon(4);
    // Create five travelers
    let henrietta = new Traveler('Henrietta');
    let juan = new Traveler('Juan');
    let drsmith = new Doctor('Dr. Smith');
    let sarahunter = new Hunter('Sara');
    let maude = new Traveler('Maude');
    console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
    wagon.join(henrietta);
    console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
    wagon.join(juan);
    wagon.join(drsmith);
    wagon.join(sarahunter);
    wagon.join(maude); // There isn't room for her!
    console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
    console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
    sarahunter.hunt(); // gets 5 more food
    drsmith.hunt();
    console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
    henrietta.eat();
    sarahunter.eat();
    drsmith.eat();
    juan.eat();
    juan.eat(); // juan is now hungry (sick)
    console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
    console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
    drsmith.heal(juan);
    console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
    sarahunter.giveFood(juan, 4);
    sarahunter.eat(); // She only has 1, so she eats it and is now sick
    console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
    console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);