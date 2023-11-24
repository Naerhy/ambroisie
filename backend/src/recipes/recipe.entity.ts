import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Recipe {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	isHomemade: boolean;

	@Column("simple-array")
	mealType: string[];

	@Column()
	difficulty: string;

	@Column()
	cookingTime: string;

	@Column()
	isVegetarian: boolean;

	@Column()
	servings: number;

	@Column("simple-array")
	ingredients: string[];

	@Column("simple-array")
	directions: string[];
}
