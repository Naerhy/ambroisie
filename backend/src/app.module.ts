import { Module } from "@nestjs/common";
import { RecipesModule } from "./recipes/recipes.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Recipe } from "./recipes/recipe.entity";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "sqlite",
			database: "db.sqlite",
			entities: [Recipe],
			// TODO: remove true in production
			synchronize: true
		}),
		RecipesModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
