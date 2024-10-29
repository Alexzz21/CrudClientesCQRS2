import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  nombreCliente: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  ciudad: string;

  @Column()
  pais: string;

  @Column()
  fechaRegistro: Date;

  @Column()
  estado: string;
}
