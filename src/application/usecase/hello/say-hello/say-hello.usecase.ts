export interface SayHelloUseCase {
  execute(): string;
}

export const ISayHelloUseCase = Symbol('ISayHelloUseCase');
