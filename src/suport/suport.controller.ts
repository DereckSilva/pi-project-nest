import { Controller, Get, Param, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { SuportService } from './suport.service';
import { MailerMailService } from 'src/mailer-mail/mailer-mail.service';
import { Tickets } from '@prisma/client';
import { Response } from 'express';

@Controller('suport')
export class SuportController {
    constructor(
        private readonly suportService: SuportService, 
        private readonly mailService: MailerMailService) {}

    @Get()
    async findAll() {
        return await this.suportService.findAll();
    }

    @Get(':numTicket')
    async find(@Param() params: { numTicket: number}, @Res() res: Response) {
        let ticket = await this.suportService.find(params.numTicket);

        if (ticket === null) {
            return res.status(HttpStatus.NOT_FOUND).json({mensage: 'Nenhum ticket foi encontrado'})
        }

        return res.status(HttpStatus.FOUND).json(ticket)
    }

    @Post()
    async create(@Body() suportDTO: Tickets, @Res() res: Response) {
        let ticket = await this.suportService.create(suportDTO);

        if (ticket) {
            await this.mailService.sendEmail(ticket.emailContatoTicket, 'spfc tomou 5', 'santos tomou 7')
        }

        return res.status(HttpStatus.CREATED).json({message: `Ticket Criado com sucesso e foi enviado um e-mail no endereço ${ticket.emailContatoTicket}`})
    }
}
