type Human = {
  name: string;
  greet: () => string;
};

const john: Human = {
  name: "John",
  greet() {
    return `Hello, my name is ${this.name}`;
  },
};

console.log(john.greet() satisfies string);
