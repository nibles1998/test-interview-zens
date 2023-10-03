import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as uuid from 'uuid';

export type FunStoriesDocument = HydratedDocument<FunStories>;

@Schema({
  versionKey: false,
  collation: { locale: 'vi' },
  collection: 'fun-stories',
})
export class FunStories {
  @Prop({ required: true, type: String, default: () => uuid.v4() })
  _id: string;

  // -------------------------------------------------------

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

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

export const FunStoriesSchema = SchemaFactory.createForClass(FunStories);

export const FunStoriesProvider = {
  name: FunStories.name,
  useFactory: () => {
    const schema = FunStoriesSchema;

    schema.pre<FunStoriesDocument>('save', async function (next: any) {
      const schema = this;
      next();
    });

    return schema;
  },
};
