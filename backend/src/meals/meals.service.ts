import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Meal } from "./meal.entity";
import { Repository } from "typeorm";
import { AddMealDto } from "src/dto";

@Injectable()
export class MealsService {
	constructor(
		@InjectRepository(Meal) private mealsRepository: Repository<Meal>
	) {}

	add(addMealDto: AddMealDto): Promise<Meal> {
		const newMeal = this.mealsRepository.create(addMealDto);
		return this.mealsRepository.save(newMeal);
	}

	async remove(id: number): Promise<void> {
		const meal = await this.mealsRepository.findOneBy({ id });
		if (meal !== null) {
			await this.mealsRepository.remove(meal);
		}
	}

	findOne(id: number): Promise<Meal | null> {
		return this.mealsRepository.findOneBy({ id })
	}

	findAll(): Promise<Meal[]> {
		return this.mealsRepository.find();
	}
}
