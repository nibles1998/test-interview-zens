import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class VoteFunStoriesDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsBoolean()
  @IsDefined()
  has_fun: boolean;
}
