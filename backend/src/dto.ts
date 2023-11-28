import { PickType } from "@nestjs/mapped-types";
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

export class AddRecipeDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@Matches(/^data:image\/(jpeg|png);base64,.+$/)
	imageBase64: string;

	@IsBoolean()
	isHomemade: boolean;

	@IsArray()
	@ArrayNotEmpty()
	@IsIn(["breakfast", "lunch", "tea", "dinner"], { each: true })
	mealTypes: string[];

	@IsString()
	@IsIn(["easy", "medium", "hard"])
	difficulty: string;

	@IsString()
	@IsIn(["short", "medium", "long"])
	cookingTime: string;

	@IsBoolean()
	isVegetarian: boolean;

	@IsNumber()
	@Min(0)
	@Max(10)
	servings: number;

	@IsArray()
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	ingredients: string[];

	@IsArray()
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	directions: string[];

	@IsNumber()
	secretCode: number;
}

export class RemoveRecipeDto extends PickType(AddRecipeDto, ["secretCode"] as const) {}
