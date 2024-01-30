import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Meal } from "./meal.entity";
import { Repository } from "typeorm";
import { AddMealDto, UpdateMealDto } from "src/dto";

@Injectable()
export class MealsService {
	private readonly logger = new Logger(MealsService.name);

	constructor(@InjectRepository(Meal) private mealsRepository: Repository<Meal>) {}

	add(addMealDto: AddMealDto): Promise<Meal> {
		const newMeal = this.mealsRepository.create(addMealDto);
		this.logger.log(`Added new meal {${newMeal.name}}`);
		return this.mealsRepository.save(newMeal);
	}

	async update(id: number, updateMealDto: UpdateMealDto): Promise<Meal> {
		await this.mealsRepository.update(id, updateMealDto);
		const meal = await this.findOne(id) as Meal;
		this.logger.log(`Updated meal {${meal.name}}`);
		return meal;
	}

	async remove(id: number): Promise<void> {
		const meal = await this.mealsRepository.findOneBy({ id });
		if (meal !== null) {
			await this.mealsRepository.remove(meal);
			this.logger.log(`Deleted meal {${meal.name}}`);
		}
	}

	findOne(id: number): Promise<Meal | null> {
		return this.mealsRepository.findOneBy({ id });
	}

	findAll(): Promise<Meal[]> {
		return this.mealsRepository.find();
	}
}
