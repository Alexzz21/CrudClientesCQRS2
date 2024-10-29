import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { CreateClienteCommand } from './commands/create-cliente.command';
import { UpdateClienteCommand } from './commands/update-cliente.command';
import { DeleteClienteCommand } from './commands/delete-cliente.command';
import { GetClienteQuery } from './queries/get-cliente.query';
import { GetClientesQuery } from './queries/get-clientes.query';

@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createCliente(@Body() createClienteDto: CreateClienteDto) {
    return this.commandBus.execute(
      new CreateClienteCommand(
        createClienteDto.password,
        createClienteDto.email,
        createClienteDto.nombreCliente,
        createClienteDto.direccion,
        createClienteDto.telefono,
        createClienteDto.ciudad,
        createClienteDto.pais,
        createClienteDto.fechaRegistro,
        createClienteDto.estado,
      ),
    );
  }

  @Get(':codigo')
  async getCliente(@Param('codigo') codigo: number) {
    return this.queryBus.execute(new GetClienteQuery(codigo));
  }

  @Get()
  async getClientes() {
    return this.queryBus.execute(new GetClientesQuery());
  }

  @Put(':codigo')
  async updateCliente(
    @Param('codigo') codigo: number,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    return this.commandBus.execute(
      new UpdateClienteCommand(
        codigo,
        updateClienteDto.password,
        updateClienteDto.email,
        updateClienteDto.nombreCliente,
        updateClienteDto.direccion,
        updateClienteDto.telefono,
        updateClienteDto.ciudad,
        updateClienteDto.pais,
        updateClienteDto.fechaRegistro,
        updateClienteDto.estado,
      ),
    );
  }

  @Delete(':codigo')
  async deleteCliente(@Param('codigo') codigo: number) {
    return this.commandBus.execute(new DeleteClienteCommand(codigo));
  }
}
