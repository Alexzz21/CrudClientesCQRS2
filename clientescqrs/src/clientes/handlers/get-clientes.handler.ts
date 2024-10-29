import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetClientesQuery } from '../queries/get-clientes.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from '../cliente.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetClientesQuery)
export class GetClientesHandler implements IQueryHandler<GetClientesQuery> {
  constructor(@InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>) {}

  async execute(query: GetClientesQuery): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }
}
