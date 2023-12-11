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
import { AuthGuard } from "src/auth/auth.guard";

@Controller("meals")
@UseGuards(ThrottlerGuard)
export class MealsController {
	constructor(private mealsService: MealsService) {}

	@UseGuards(AuthGuard)
	@Post()
	add(@Body() addMealDto: AddMealDto): Promise<Meal> {
		return this.mealsService.add(addMealDto);
	}

	@UseGuards(AuthGuard)
	@Delete(":id")
	@HttpCode(204)
	async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
		await this.mealsService.remove(id);
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number): Promise<Meal | null> {
		return this.mealsService.findOne(id);
	}

	@Get()
	find(): Promise<Meal[]> {
		return this.mealsService.findAll();
	}
}
