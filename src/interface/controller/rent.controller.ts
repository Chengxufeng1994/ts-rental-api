import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { StartRentRequestDto } from './dto/start-rent.request.dto';

import { IRentApplication } from '../../application/service/interfaces/rent.service.interface';
import { StartRentDto } from '../../application/dto/start-rent.dto';
import { CompleteRentDto } from '../../application/dto/complete-rent.dto';

import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { ActiveRentalError } from '../../domain/errors/active-rental.error';

import { ApiResponse } from '../../infrastructure/core/api-response';

@Controller('rent')
export class RentController {
  constructor(
    @Inject(IRentApplication)
    private readonly rentApplication: IRentApplication,
  ) {}

  @Post('start')
  async startRent(
    @Body() startRentRequestDto: StartRentRequestDto,
    @Res() res: Response,
  ) {
    try {
      const startRentDto = new StartRentDto(
        startRentRequestDto.userId,
        startRentRequestDto.scooterId,
      );
      await this.rentApplication.startRent(startRentDto);
      res.status(HttpStatus.OK).send(new ApiResponse(HttpStatus.OK, 'Success'));
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof ActiveRentalError) {
        throw new BadRequestException(error.message);
      }

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Put('complete/:userId')
  async endRent(@Param('userId') rentId: string, @Res() res: Response) {
    try {
      const completeRentDto = new CompleteRentDto(rentId);
      await this.rentApplication.completeRent(completeRentDto);
      res.status(HttpStatus.OK).send(new ApiResponse(HttpStatus.OK, 'Success'));
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error);
    }
  }
}
