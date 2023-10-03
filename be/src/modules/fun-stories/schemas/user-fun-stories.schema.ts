import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as uuid from 'uuid';

export type UserFunStoriesDocument = HydratedDocument<UserFunStories>;

@Schema({
  versionKey: false,
  collation: { locale: 'vi' },
  collection: 'user-fun-stories',
})
export class UserFunStories {
  @Prop({ required: true, type: String, default: () => uuid.v4() })
  _id: string;

  // -------------------------------------------------------

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  fun_stories_id: string;

  @Prop({ required: true })
  has_fun: boolean;

  // -------------------------------------------------------

  @Prop({ default: false })
  delete_flag: boolean;

  @Prop({ default: () => new Date() })
  created_at: Date;

  @Prop({ default: () => new Date() })
  updated_at: Date;

  @Prop({ default: null })
  created_by: string;

  @Prop({ default: null })
  updated_by: string;
}

export const UserFunStoriesSchema =
  SchemaFactory.createForClass(UserFunStories);

export const UserFunStoriesProvider = {
  name: UserFunStories.name,
  useFactory: () => {
    const schema = UserFunStoriesSchema;

    schema.pre<UserFunStoriesDocument>('save', async function (next: any) {
      const schema = this;
      next();
    });

    return schema;
  },
};
