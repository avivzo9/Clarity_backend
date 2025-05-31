import { Expose, Transform } from "class-transformer";

export class CategoryDto {

    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    color: string;

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: string;
}