import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Post,
	Put,
	UseGuards
} from "@nestjs/common";
import { MealsService } from "./meals.service";
import { Meal } from "./meal.entity";
import { AddMealDto, UpdateMealDto } from "src/dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("meals")
export class MealsController {
	constructor(private mealsService: MealsService) {}

	@UseGuards(AuthGuard)
	@Post()
	add(@Body() addMealDto: AddMealDto): Promise<Meal> {
		return this.mealsService.add(addMealDto);
	}

	@UseGuards(AuthGuard)
	@Put(":id")
	async update(@Param("id", ParseIntPipe) id: number, @Body() updateMealDto: UpdateMealDto): Promise<Meal> {
		if ((await this.mealsService.findOne(id)) === null) {
			throw new BadRequestException("id is invalid");
		} else if (Object.keys(updateMealDto).length === 0) {
			throw new BadRequestException("update meal cannot be empty");
		} else {
			return this.mealsService.update(id, updateMealDto);
		}
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
