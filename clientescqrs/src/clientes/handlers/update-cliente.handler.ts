import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateClienteCommand } from '../commands/update-cliente.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from '../cliente.entity';
import { Repository } from 'typeorm';

@CommandHandler(UpdateClienteCommand)
export class UpdateClienteHandler implements ICommandHandler<UpdateClienteCommand> {
  constructor(@InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>) {}

  async execute(command: UpdateClienteCommand): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { codigo: command.codigo } });
    if (!cliente) throw new Error('Cliente no encontrado');

    // Actualiza solo los campos proporcionados
    if (command.password) cliente.password = command.password;
    if (command.email) cliente.email = command.email;
    if (command.nombreCliente) cliente.nombreCliente = command.nombreCliente;
    if (command.direccion) cliente.direccion = command.direccion;
    if (command.telefono) cliente.telefono = command.telefono;
    if (command.ciudad) cliente.ciudad = command.ciudad;
    if (command.pais) cliente.pais = command.pais;
    if (command.fechaRegistro) cliente.fechaRegistro = command.fechaRegistro;
    if (command.estado) cliente.estado = command.estado;

    return this.clienteRepository.save(cliente);
  }
}
