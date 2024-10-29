import { ICommand } from '@nestjs/cqrs';

export class UpdateClienteCommand implements ICommand {
  constructor(
    public readonly codigo: number,
    public readonly password?: string,
    public readonly email?: string,
    public readonly nombreCliente?: string,
    public readonly direccion?: string,
    public readonly telefono?: string,
    public readonly ciudad?: string,
    public readonly pais?: string,
    public readonly fechaRegistro?: Date,
    public readonly estado?: string,
  ) {}
}
