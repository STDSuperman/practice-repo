import { Controller, Get, Post, Body, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ApiBody, ApiResponse } from '@nestjs/swagger'
import { CatFilter } from './cats.filter';

@Controller('cats')
@UseFilters(CatFilter)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @ApiBody({description: '创建一个CatDTO'})
  @ApiResponse({
    status: 200,
    description: 'OK'
  })
  async create(@Body() createCatDto: Cat) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('/exception')
  async getException() {
    throw new HttpException({
      status: HttpStatus.EXPECTATION_FAILED,
      error: '这是一个错误'
    }, HttpStatus.EXPECTATION_FAILED)
  }
}