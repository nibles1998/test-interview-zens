import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as uuid from 'uuid';

export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
  collation: { locale: 'vi' },
  collection: 'users',
})
export class User {
  @Prop({ required: true, type: String, default: () => uuid.v4() })
  _id: string;

  // -------------------------------------------------------

  @Prop({ required: true })
  ip: string;

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

export const UserSchema = SchemaFactory.createForClass(User);

export const UserProvider = {
  name: User.name,
  useFactory: () => {
    const schema = UserSchema;

    schema.pre<UserDocument>('save', async function (next: any) {
      const schema = this;
      next();
    });

    return schema;
  },
};
