import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Recipe } from "./recipe.entity";
import { Repository } from "typeorm";

@Injectable()
export class RecipesService {
	constructor(@InjectRepository(Recipe) private recipesRepository: Repository<Recipe>) {}

	add(): string {
		return "add service has been called from recipes controller";
	}

	remove(id: number): string {
		return "remove service has been called from recipes controller";
	}

	findAll(): string {
		return "findAll service has been called from recipes controller";
	}
}
