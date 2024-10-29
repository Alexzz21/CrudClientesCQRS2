import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Cliente } from './cliente.entity';
import { ClientesController } from './clientes.controller';

// Importamos los comandos y consultas
import { CreateClienteHandler } from './handlers/create-cliente.handler';
import { UpdateClienteHandler } from './handlers/update-cliente.handler';
import { DeleteClienteHandler } from './handlers/delete-cliente.handler';
import { GetClienteHandler } from './handlers/get-cliente.handler';
import { GetClientesHandler } from './handlers/get-clientes.handler';

// Lista de todos los handlers de CQRS
const CommandHandlers = [CreateClienteHandler, UpdateClienteHandler, DeleteClienteHandler];
const QueryHandlers = [GetClienteHandler, GetClientesHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]), // Registra la entidad Cliente con TypeORM
    CqrsModule, // Incluye el módulo de CQRS
  ],
  controllers: [ClientesController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class ClientesModule {}
