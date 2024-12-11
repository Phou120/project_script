import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('indexs')
  @Render('index') // Renders views/index.hbs
  getIndex() {
    return { title: 'NestJS Template Example' };
  }

  @Get('sign-up')
  @Render('sign-up') // Renders views/index.hbs
  signup() {
    return { title: 'NestJS Template Example' };
  }

  @Get('sign-in')
  @Render('sign-in') // Renders views/index.hbs
  signIn() {
    return { title: 'NestJS Template Example' };
  }

  @Get('dashboard')
  @Render('dashboard') // Renders views/index.hbs
  dashboard() {
    return { title: 'NestJS Template Example' };
  }

  @Get('list-users')
  @Render('dashboard') // Renders views/index.hbs
  getUsers() {
    return { title: 'NestJS Template Example' };
  }

  @Get('user')
  @Render('dashboard') // Renders views/index.hbs
  getUser() {
    return { title: 'NestJS Template Example' };
  }

  @Get('update-users')
  @Render('dashboard') // Renders views/index.hbs
  PutUsers() {
    return { title: 'NestJS Template Example' };
  }


  // reserve table
  @Get('reserve-table')
  @Render('index') // Renders views/index.hbs
  ReserveTable() {
    return { title: 'NestJS Template Example' };
  }
}
