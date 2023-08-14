class Person {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public sayHello(): void {
    console.log(`Hello, my name is ${this.name}. This is a sea urchin.`);
  }
}

const person = new Person("John Doe");
person.sayHello();
