import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateFunStoriesDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  secret_key: string;
}
