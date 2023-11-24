import { Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import { Recipe } from "./recipe.entity";

@Controller("recipes")
export class RecipesController {
	constructor(private recipesService: RecipesService) {}

	@Post()
	add(): string {
		return this.recipesService.add();
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number): string {
		return this.recipesService.remove(id);
	}

	@Get()
	findAll(): string {
		return this.recipesService.findAll();
	}
}
