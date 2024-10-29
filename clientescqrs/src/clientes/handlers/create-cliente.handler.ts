import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateClienteCommand } from '../commands/create-cliente.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from '../cliente.entity';
import { Repository } from 'typeorm';

@CommandHandler(CreateClienteCommand)
export class CreateClienteHandler implements ICommandHandler<CreateClienteCommand> {
  constructor(@InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>) {}

  async execute(command: CreateClienteCommand): Promise<Cliente> {
    const cliente = this.clienteRepository.create({
      password: command.password,
      email: command.email,
      nombreCliente: command.nombreCliente,
      direccion: command.direccion,
      telefono: command.telefono,
      ciudad: command.ciudad,
      pais: command.pais,
      fechaRegistro: command.fechaRegistro,
      estado: command.estado,
    });
    return this.clienteRepository.save(cliente);
  }
}
