//#region Type Checking Examples
function processInput(input: string | number | boolean) {
    if (typeof input === "string") {
        console.log("Processing string:", input);
    } else if (typeof input === "number") {
        console.log("Processing number:", input);
    } else if (typeof input === "boolean") {
        console.log("Processing boolean:", input);
    }
}

processInput("Hello");
processInput(42);
processInput(true);
//#endregion

//#region Custom Type Guard
interface Animal {
    species: string;
}

function isAnimal(obj: unknown): obj is Animal {
    return (
        typeof obj === "object" &&
        obj !== null &&
        'species' in obj &&
        typeof obj.species === 'string'
    )
}

const unknownObj: any = { species: "Dog" };
console.log("Is Animal:", isAnimal(unknownObj));
//#endregion

