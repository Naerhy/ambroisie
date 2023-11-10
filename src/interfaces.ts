interface _Recipe {
	title: string;
	homemade: boolean;
	mealTypes: ("breakfast" | "lunch" | "tea" | "dinner")[];
	difficulty: "easy" | "medium" | "hard";
	cookingTime: "short" | "medium" | "long";
	vegetarian: boolean;
	servings: number;
	ingredients: string[];
	directions: string[];
}

export type Recipe = _Recipe & { filename: string };
