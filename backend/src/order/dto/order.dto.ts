//TODO реализовать DTO для /orders
import {
  IsString,
  IsNumber,
  IsArray,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class TicketDto {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

export class createOrderDto {
  @IsEmail()
  email: string;
  @IsPhoneNumber()
  phone: string;
  @IsArray()
  tickets: TicketDto[];
}
