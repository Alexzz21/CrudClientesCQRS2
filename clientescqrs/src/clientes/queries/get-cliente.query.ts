import { IQuery } from '@nestjs/cqrs';

export class GetClienteQuery implements IQuery {
  constructor(public readonly codigo: number) {}
}
