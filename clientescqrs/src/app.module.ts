import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'clientescqrsdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CqrsModule,
    ClientesModule,
  ],
})
export class AppModule {}
