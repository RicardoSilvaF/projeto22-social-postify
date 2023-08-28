import { IsDateString, IsNotEmpty, IsNumber} from "class-validator";

export class PublicationDto {
    @IsNumber()
    @IsNotEmpty({ message: "All fields are required!" })
    mediaId: number;

    @IsNumber()
    @IsNotEmpty({ message: "All fields are required!" })
    postId: number;

    @IsDateString()
    @IsNotEmpty({ message: "All fields are required!" })
    date: Date;
}