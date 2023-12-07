import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import { Recipe } from "./recipe.entity";
import { AddRecipeDto, RemoveRecipeDto } from "src/dto";
import { ThrottlerGuard } from "@nestjs/throttler";

@Controller("recipes")
@UseGuards(ThrottlerGuard)
export class RecipesController {
	constructor(private recipesService: RecipesService) {}

	@Post()
	add(@Body() addRecipeDto: AddRecipeDto): Promise<Recipe> {
		return this.recipesService.add(addRecipeDto);
	}

	@Delete(":id")
	@HttpCode(204)
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
