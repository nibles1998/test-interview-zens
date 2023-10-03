import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas';
import { Request } from 'express';

@Injectable()
export class UserService {
  repo: Model<UserDocument>;
  constructor(
    @InjectModel(User.name)
    readonly UserModel: Model<UserDocument>,
  ) {
    this.repo = UserModel;
  }

  async checkUser(req: Request) {
    const cookies = req.cookies;
    let ip = (req.headers['x-forwarded-for'] as string) || '';

    if (ip) {
      const arrIp = ip.split(',');
      ip = arrIp[arrIp.length - 1];
    } else {
      ip = req.ip;
    }

    let user = await this.repo.findOne({
      $or: [{ _id: cookies.sub }, { ip }],
    });

    if (!user) {
      user = await this.repo.create({
        ip,
      });
    }

    return user;
  }
}
