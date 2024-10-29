import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetClienteQuery } from '../queries/get-cliente.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from '../cliente.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetClienteQuery)
export class GetClienteHandler implements IQueryHandler<GetClienteQuery> {
  constructor(@InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>) {}

  async execute(query: GetClienteQuery): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { codigo: query.codigo } });
    if (!cliente) throw new Error('Cliente no encontrado');
    
    return cliente;
  }
}
