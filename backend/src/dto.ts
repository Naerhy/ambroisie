import {
	ArrayNotEmpty,
	IsArray,
	IsBoolean,
	IsIn,
	IsNotEmpty,
	IsNumber,
	IsString,
	Matches,
	Max,
	Min
} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class AddMealDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsBoolean()
	isRecipe: boolean;

	@IsArray()
	@ArrayNotEmpty()
	@IsIn(["breakfast", "lunch", "tea", "dinner"], { each: true })
	types: string[];

	@IsNumber()
	@Min(1)
	@Max(3)
	difficulty: number;

	@IsNumber()
	@Min(1)
	@Max(4)
	cookingTime: number;

	@IsBoolean()
	isVegetarian: boolean;

	@IsNumber()
	@Min(0)
	@Max(12)
	servings: number;

	@IsString()
	ingredients: string;

	@IsString()
	directions: string;

	@IsString()
	@Matches(/^data:image\/(jpeg|png);base64,.+$/)
	imageBase64: string;
}

export class UpdateMealDto extends PartialType(AddMealDto) {}

export class PasswordDto {
	@IsString()
	password: string;
}
