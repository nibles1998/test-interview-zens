import { Logger, Controller, Get, Req, Body, Post, Res } from '@nestjs/common';
import { FunStoriesService } from './fun-stories.service';
import { Request, Response } from 'express';
import { CreateFunStoriesDto, VoteFunStoriesDto } from './dto';

@Controller('fun-stories')
export class FunStoriesController {
  private readonly logger = new Logger(FunStoriesController.name);
  constructor(private readonly funStoriesService: FunStoriesService) {}

  @Post()
  async create(@Body() body: CreateFunStoriesDto) {
    this.logger.log('Create fun story');
    return this.funStoriesService.create(body);
  }

  @Post('/vote')
  async vote(@Req() req: Request, @Body() body: VoteFunStoriesDto) {
    this.logger.log('Vote fun story');
    return this.funStoriesService.vote(req, body);
  }

  @Get()
  async getFunStory(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.log('Get fun story');
    return this.funStoriesService.getFunStory(req, res);
  }
}
