import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import { Recipe } from "./recipe.entity";
import { AddRecipeDto, RemoveRecipeDto } from "src/dto";

@Controller("recipes")
export class RecipesController {
	constructor(private recipesService: RecipesService) {}

	@Post()
	add(@Body() addRecipeDto: AddRecipeDto): Promise<Recipe> {
		return this.recipesService.add(addRecipeDto);
	}

	@Delete(":id")
	async remove(
		@Param("id", ParseIntPipe) id: number,
		@Body() removeRecipeDto: RemoveRecipeDto
	): Promise<void> {
		await this.recipesService.remove(id, removeRecipeDto.secretCode);
	}

	@Get()
	find(): Promise<Recipe[]> {
		return this.recipesService.findAll();
	}
}
