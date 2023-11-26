import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Recipe {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	imageBase64: string;

	@Column()
	isHomemade: boolean;

	@Column("simple-array")
	mealTypes: string[];

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
