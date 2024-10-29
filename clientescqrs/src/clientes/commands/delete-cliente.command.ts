import { ICommand } from '@nestjs/cqrs';

export class DeleteClienteCommand implements ICommand {
  constructor(public readonly codigo: number) {}
}
