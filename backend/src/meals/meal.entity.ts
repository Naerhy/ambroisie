import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meal {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	isRecipe: boolean;

	@Column("smallint", { array: true })
	types: number[];

	@Column("smallint")
	difficulty: number;

	@Column("smallint")
	cookingTime: number;

	@Column()
	isVegetarian: boolean;

	@Column("smallint")
	servings: number;

	@Column("text")
	ingredients: string;

	@Column("text")
	directions: string;

	@Column("text")
	imageBase64: string;
}
