// Class decorator that wraps constructors to log creation
function LogCreation<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);
            console.log(`Created instance of ${constructor.name}`);
        }
    };
}

@LogCreation
class User {
    constructor(public name: string, public age: number) {}

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

let user1 = new User("John", 30);
user1.greet();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Property decorator with logging settter and getter
function LogProperty(target: any, propertyKey: string) {
    let value = target[propertyKey];
    Object.defineProperty(target, propertyKey, {
        get: () => {
            console.log(`Getting value of ${propertyKey}: ${value}`);
            return value;
        },
        set: (newValue) => {
            console.log(`Setting value of ${propertyKey} to: ${newValue}`);
            value = newValue;
        },
        configurable: true,
        enumerable: true
    });
}

// Method decorator to log method calls and return values
function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log(`Calling ${propertyKey} with arguments: ${JSON.stringify(args)}`);
        const result = originalMethod.apply(this, args);
        console.log(`Result of ${propertyKey}: ${JSON.stringify(result)}`);
        return result;
    };
    return descriptor;
}

class Calculator {
    @LogProperty
    public precision: number = 2;

    @LogMethod
    add(x: number, y: number): number {
        return Number((x + y).toFixed(this.precision));
    }

    @LogMethod
    multiply(x: number, y: number): number {
        return Number((x * y).toFixed(this.precision));
    }
}

let calc = new Calculator();
calc.precision = 3;
console.log(calc.add(1.2345, 2.3456));
console.log(calc.multiply(1.2345, 2.3456));


////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Logger decorator factory to log method calls with customizable prefix
function Logger(prefix: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            console.log(`${prefix} Calling ${propertyKey} with arguments: ${JSON.stringify(args)}`);
            const result = originalMethod.apply(this, args);
            console.log(`${prefix} Result of ${propertyKey}: ${JSON.stringify(result)}`);
            return result;
        };
        return descriptor;
    };
}

// Class with methids decorated for logging
class Service {
    private dataCache: Record<number, string> = {};

    @Logger("[ServiceLogger]")
    fetchData(id: number): string {
        if (!this.dataCache[id]) {
            console.log(`Fetching data for ID: ${id} from source...`);

            // Simulate data fetching
            this.dataCache[id] = `Data for ID: ${id}`;
        }
        return this.dataCache[id];
    }

    @Logger("[ServiceLogger]")
    clearCache(id?: number): void {
        if (id !== undefined) {
            delete this.dataCache[id];
            console.log(`Cleared cache for ID: ${id}`);
        } else {
            this.dataCache = {};
            console.log("Cleared entire cache");
        }
    }
}

let service = new Service();
console.log(service.fetchData(1));
console.log(service.fetchData(2));
service.clearCache(1);
console.log(service.fetchData(1));
service.clearCache();
