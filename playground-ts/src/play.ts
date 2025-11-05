const myParam: <T>(arg: T) => T = (arg) => arg;
console.log(myParam<string>('Test'));
console.log(myParam<number>(123));