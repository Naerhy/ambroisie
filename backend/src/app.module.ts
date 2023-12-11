import { Module } from "@nestjs/common";
import { MealsModule } from "./meals/meals.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Meal } from "./meals/meal.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				BACKEND_PORT: Joi.number().required(),
				ADMIN_PASSWORD: Joi.string().required(),
				POSTGRES_USER: Joi.string().required(),
				POSTGRES_PASSWORD: Joi.string().required(),
				POSTGRES_DB: Joi.string().required()
			}),
			isGlobal: true
		}),
		ThrottlerModule.forRoot([{ ttl: 60000, limit: 20 }]),
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				host: "database",
				port: 5432,
				username: configService.get<string>("POSTGRES_USER"),
				password: configService.get<string>("POSTGRES_PASSWORD"),
				database: configService.get<string>("POSTGRES_DB"),
				entities: [Meal],
				synchronize: true
			}),
			inject: [ConfigService]
		}),
		MealsModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
