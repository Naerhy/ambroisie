export interface Recipe {
	id: number;
	name: string;
	imgPath: string;
	isHomemade: boolean;
	mealTypes: ("breakfast" | "lunch" | "tea" | "dinner")[];
	difficulty: "easy" | "medium" | "hard";
	cookingTime: "short" | "medium" | "long";
	isVegetarian: boolean;
	servings: number;
	ingredients: string[];
	directions: string[];
}
