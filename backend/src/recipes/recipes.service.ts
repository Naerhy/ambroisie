import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Recipe } from "./recipe.entity";
import { Repository } from "typeorm";
import { AddRecipeDto } from "src/dto";

@Injectable()
export class RecipesService {
	constructor(@InjectRepository(Recipe) private recipesRepository: Repository<Recipe>) {}

	add(addRecipeDto: AddRecipeDto): Promise<Recipe> {
		const newRecipe = this.recipesRepository.create(addRecipeDto);
		return this.recipesRepository.save(newRecipe);
	}

	async remove(id: number): Promise<void> {
		const recipe = await this.recipesRepository.findOneBy({ id });
		if (recipe !== null) {
			await this.recipesRepository.remove(recipe);
		}
	}

	findAll(): Promise<Recipe[]> {
		return this.recipesRepository.find();
	}
}
