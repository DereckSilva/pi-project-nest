import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PersonDto } from './dto/person.dto';
import { PersonService } from './person.service';

@Controller('persons')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Get(':id')
  searchPerson(@Param() params: { id: number }) {
    return this.personService.searchPerson(params.id);
  }

  @Post()
  createPerson(@Body() person: PersonDto) {
    return this.personService.create(person);
  }
}
