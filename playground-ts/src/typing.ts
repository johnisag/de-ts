// Shape can be a circle or a square - union type
type Shape = 
    | { kind: "circle"; radius: number }
    | { kind: "square"; sideLength: number };

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
    }
}

console.log(getArea({ kind: "circle", radius: 5 })); // Output: 78.53981633974483
console.log(getArea({ kind: "square", sideLength: 4 })); // Output: 16  

//////////////////////////////////////////////////////////////////////////////////////////////

type Employee = { name:string, id:number };
type Manager = { name: string, reports: Employee[] };

// Intersection type combining Employee and Manager
type Lead = Employee & Manager;

const lead: Lead = {
    name: "Alice",
    id: 1,
    reports: [{ name: "Alice Jr.", id: 2 }]
};

console.log(lead);

//////////////////////////////////////////////////////////////////////////////////////////////

interface Bird {
    fly(): void;
    layEggs(): void;
}

interface Fish {
    swim(): void;
    layEggs(): void;
}

function getPet(): Bird | Fish {
    return Math.random() > 0.5
        ? { fly: () => console.log("Flying"), layEggs: () => console.log("Laying bird eggs") }
        : { swim: () => console.log("Swimming"), layEggs: () => console.log("Laying fish eggs") };
}

function move(pet: Bird | Fish) {
    pet.layEggs(); // Common method

    if ("fly" in pet) {
        pet.fly(); // Narrowed to Bird
    } else {
        pet.swim(); // Narrowed to Fish
    }
}

const pet = getPet();
move(pet);

//////////////////////////////////////////////////////////////////////////////////////////////

function processAny(input: any): any {
    // Perform operations without type safety
    console.log("Any input:", input);

    let x: number = input; // No error, but unsafe
}

function processUnknown(input: unknown): void {
    console.log("Unknown input:", input);

    if (typeof input === "number") {
        let x: number = input; // Safe after type check
        console.log("Number input:", x);
    } else {
        console.log("Input is not a number.");
    } 
}

function processNever(input: string): never {
    throw new Error("This function never returns");
}

function logMessage(message: string | number): void {
    if (typeof message === "string") {
        console.log("String message:", message.toUpperCase());
    } else {
        console.log("Number message:", message.toFixed(2));
    }
}   

processAny(5);
processUnknown("world");
try {
    processNever("This will throw");
} catch (e) {
    console.error(e);
}
logMessage("hello");

///////////////////////////////////////////////////////////////////////////////////////////////