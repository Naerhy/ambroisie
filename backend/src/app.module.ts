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
				DATABASE_USER: Joi.string().required(),
				DATABASE_PASSWORD: Joi.string().required()
			}),
			isGlobal: true
		}),
		ThrottlerModule.forRoot([{ ttl: 60000, limit: 20 }]),
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				host: "localhost",
				port: 5432,
				username: configService.get<string>("DATABASE_USER"),
				password: configService.get<string>("DATABASE_PASSWORD"),
				database: "ambroisie",
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
