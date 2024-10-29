import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteClienteCommand } from '../commands/delete-cliente.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from '../cliente.entity';
import { Repository } from 'typeorm';

@CommandHandler(DeleteClienteCommand)
export class DeleteClienteHandler implements ICommandHandler<DeleteClienteCommand> {
  constructor(@InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>) {}

  async execute(command: DeleteClienteCommand): Promise<void> {
    const cliente = await this.clienteRepository.findOne({ where: { codigo: command.codigo } });
    if (!cliente) throw new Error('Cliente no encontrado');
    
    await this.clienteRepository.remove(cliente);
  }
}
