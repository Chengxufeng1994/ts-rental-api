export interface IHelloApplication {
  sayHello(): string;
}

export const IHelloApplication = Symbol('IHelloApplication');
