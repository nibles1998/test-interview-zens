import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFunStoriesDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  secret_key: string;
}
