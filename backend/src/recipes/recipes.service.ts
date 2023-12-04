import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Recipe } from "./recipe.entity";
import { Repository } from "typeorm";
import { AddRecipeDto } from "src/dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RecipesService {
	constructor(
		@InjectRepository(Recipe) private recipesRepository: Repository<Recipe>,
		private configService: ConfigService
	) {}

	add(addRecipeDto: AddRecipeDto): Promise<Recipe> {
		if (addRecipeDto.secretCode !== this.configService.get<number>("SECRET_CODE")) {
			throw new ForbiddenException("invalid secret code");
		}
		const newRecipe = this.recipesRepository.create(addRecipeDto);
		return this.recipesRepository.save(newRecipe);
	}

	async remove(id: number, secretCode: number): Promise<void> {
		if (secretCode !== this.configService.get<number>("SECRET_CODE")) {
			throw new ForbiddenException("invalid secret code");
		}
		const recipe = await this.recipesRepository.findOneBy({ id });
		if (recipe !== null) {
			await this.recipesRepository.remove(recipe);
		}
	}

	findAll(): Promise<Recipe[]> {
		return this.recipesRepository.find();
	}
}
