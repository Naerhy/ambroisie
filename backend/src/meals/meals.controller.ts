import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Post,
	UseGuards
} from "@nestjs/common";
import { MealsService } from "./meals.service";
import { Meal } from "./meal.entity";
import { AddMealDto } from "src/dto";
import { ThrottlerGuard } from "@nestjs/throttler";

@Controller("meals")
@UseGuards(ThrottlerGuard)
export class MealsController {
	constructor(private mealsService: MealsService) {}

	@Post()
	add(@Body() addMealDto: AddMealDto): Promise<Meal> {
		return this.mealsService.add(addMealDto);
	}

	@Delete(":id")
	@HttpCode(204)
	async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
		await this.mealsService.remove(id);
	}

	@Get()
	find(): Promise<Meal[]> {
		return this.mealsService.findAll();
	}
}
