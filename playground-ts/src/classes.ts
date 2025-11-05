// Class with constructor and method
class Car {
    brand: string= "DefaultBrand";
    year: number= 2000;
    
    constructor(brand?: string, year?: number) {
        if (brand) {
            this.brand = brand;
        }
        if (year) {
            this.year = year;
        }
    }

    displayInfo(): void {
        console.log(`Brand: ${this.brand}, Year: ${this.year}`);
    }
}

let car1 = new Car("Toyota", 2021);
car1.displayInfo(); // Output: Brand: Toyota, Year: 2021

// Class with static members and accessors
class Student {
    static counter: number = 0;
    static schoolName: string = "ABC High School";
    private _marks: number;
    name: string;

    constructor(name: string, marks: number) {
        this.name = name;
        this._marks = marks;
        Student.counter++;
    }

    get marks(): number {
        return this._marks;
    }

    set marks(value: number) {
        if (value < 0 || value > 100) {
            console.log("Invalid marks. Please enter a value between 0 and 100.");
        } else {
            this._marks = value;
            console.log(`Marks updated to ${this._marks}`);
        }
    }           

    displayStudent(): void {
        console.log(`Name: ${this.name}, Marks: ${this._marks}`);
    }
}

let student1 = new Student("Alice", 85);
student1.displayStudent(); // Output: Name: Alice, Marks: 85
student1.marks = 95; // Output: Marks updated to 95
student1.displayStudent(); // Output: Name: Alice, Marks: 95
console.log(`School Name: ${Student.schoolName}`);
console.log(`Total Students: ${Student.counter}`);

// Class with inheritance
class Vehicle {
    brand: string;

    constructor(brand: string) {
        this.brand = brand;
    }

    displayInfo(): void {
        console.log(`Brand: ${this.brand}`);
    }
}

class RoadCar extends Vehicle {
    model: string;

    constructor(brand: string, model: string) {
        super(brand);
        this.model = model;
    }

    displayInfo(): void {
        super.displayInfo();
        console.log(`Model: ${this.model}`);
    }
}
let myCar = new RoadCar("Honda", "Civic");
myCar.displayInfo(); // Output: Brand: Honda, Model: Civic  

// Abstract class and method implementation
abstract class Animal {
    abstract makeSound(): void;
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Woof! Woof!");
    }
}

class Cat extends Animal {
    makeSound(): void {
        console.log("Meow!");
    }
}
let dog = new Dog();
dog.makeSound(); // Output: Woof! Woof!
let cat = new Cat();
cat.makeSound(); // Output: Meow!

// Interface implementation in class
interface Shape {
    area(): number;
    perimeter(): number;
}

class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}

    area(): number {
        return this.width * this.height;
    }

    perimeter(): number {
        return 2 * (this.width + this.height);
    }
}
let rectangle = new Rectangle(10, 5);
console.log(`Area: ${rectangle.area()}`); // Output: Area: 50
console.log(`Perimeter: ${rectangle.perimeter()}`); // Output: Perimeter: 30
