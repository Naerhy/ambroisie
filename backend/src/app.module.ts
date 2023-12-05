import { Module } from "@nestjs/common";
import { RecipesModule } from "./recipes/recipes.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Recipe } from "./recipes/recipe.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				BACKEND_PORT: Joi.number().required(),
				SECRET_CODE: Joi.number().required(),
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
				entities: [Recipe]
			}),
			inject: [ConfigService]
		}),
		RecipesModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
