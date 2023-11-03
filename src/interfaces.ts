interface _Recipe {
	title: string;
	mealType: "lunch" | "dinner" | "all";
	season: "spring" | "summer" | "autumn" | "winter" | "all";
	difficulty: "easy" | "medium" | "hard";
	cookingTime: "short" | "medium" | "long";
	vegetarian: boolean;
	servings: number;
	ingredients: string[];
	directions: string[];
}

export type Recipe = _Recipe & { filename: string };
