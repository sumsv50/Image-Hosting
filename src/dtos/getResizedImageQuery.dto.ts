import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";


export class GetResizedImageQueryDTO {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  width: number

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  height: number
}