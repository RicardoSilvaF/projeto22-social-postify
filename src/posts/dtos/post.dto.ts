import { IsNotEmpty, IsOptional, IsString, IsUrl} from "class-validator";

export class PostDto {
    @IsString()
    @IsNotEmpty({ message: "All fields are required!" })
    title: string;

    @IsString()
    @IsNotEmpty({ message: "All fields are required!" })
    text: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    image: string;
}