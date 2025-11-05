// Base Interface
interface Person {
  id: number;
  name: string;
  age: number;
  email: string;
}

// Mapped Type
type ReadonlyPerson = {
    readonly [K in keyof Person]: Person[K];
}

// All properties are now readonly
const person: ReadonlyPerson = {
    id: 1,
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com"
};

console.log(person);
