import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meal {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	isRecipe: boolean;

	@Column("simple-array")
	types: string[];

	@Column()
	difficulty: number;

	@Column()
	cookingTime: number;

	@Column()
	isVegetarian: boolean;

	@Column()
	servings: number;

	@Column()
	ingredients: string;

	@Column()
	directions: string;

	@Column()
	imageBase64: string;
}
