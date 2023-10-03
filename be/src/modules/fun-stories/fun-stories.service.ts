import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FunStories,
  FunStoriesDocument,
  UserFunStories,
  UserFunStoriesDocument,
} from './schemas';
import { CreateFunStoriesDto, VoteFunStoriesDto } from './dto';
import { Request, Response } from 'express';
import { configuration } from '../../config';
import { UserService } from '../users';

@Injectable()
export class FunStoriesService {
  repoFunStories: Model<FunStoriesDocument>;
  repoUserFunStories: Model<UserFunStoriesDocument>;
  constructor(
    @InjectModel(FunStories.name)
    readonly funStoriesModel: Model<FunStoriesDocument>,
    @InjectModel(UserFunStories.name)
    readonly userFunStoriesModel: Model<UserFunStoriesDocument>,
    private readonly userService: UserService,
  ) {
    this.repoFunStories = funStoriesModel;
    this.repoUserFunStories = userFunStoriesModel;
  }

  async create(data: CreateFunStoriesDto) {
    if (data.secret_key !== configuration().secretKey) {
      throw new ForbiddenException({
        error_code: 'SECRET_KEY_INCORRECT',
        error_message: 'SecretKey incorrect!',
      });
    }

    return this.repoFunStories.create(data);
  }

  async getFunStory(req: Request, res: Response) {
    const user = await this.userService.checkUser(req);

    const readListFunStories = await this.repoUserFunStories.find({
      user_id: user._id,
    });

    const funStory = await this.repoFunStories.findOne({
      _id: { $nin: readListFunStories.map((x) => x.fun_stories_id) },
      delete_flag: false,
    });

    if (!funStory) {
      return {
        message: "That's all the jokes for today! Come back another day!",
      };
    }

    res.cookie('sub', user._id);

    return funStory;
  }

  async vote(req: Request, data: VoteFunStoriesDto) {
    const user = await this.userService.checkUser(req);

    const funStory = await this.repoFunStories.findOne({ _id: data._id });

    if (!funStory) {
      throw new NotFoundException({
        error_code: 'FUN_STORIES_NOT_FOUND',
        error_message: 'Fun Stories not found!',
      });
    }

    await this.repoUserFunStories.create({
      user_id: user._id,
      fun_stories_id: data._id,
      has_fun: data.has_fun,
    });

    return {
      _id: data._id,
      has_vote: true,
    };
  }
}
