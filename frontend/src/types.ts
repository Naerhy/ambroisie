import { Ref } from "vue";

export interface Meal {
	id: number;
	name: string;
	isRecipe: boolean;
	types: number[];
	difficulty: number;
	cookingTime: number;
	isVegetarian: boolean;
	servings: number;
	ingredients: string;
	directions: string;
	imageBase64: string;
}

type State = "loading" | "loaded" | "error";

export interface Meals {
	data: Meal[];
	state: State;
}

export type Inputs = Omit<Meal, "id">;

export type FormMessage = {
	level: "success" | "error";
	message: string;
} | null;

export interface Filters {
	name: string;
	types: number[];
	difficulties: number[];
	cookingTimes: number[];
	vegetarian: boolean;
}

export interface MealsProvider {
	meals: Ref<Meals>;
	addMeal: (meal: Meal) => void;
	modifyMeal: (meal: Meal) => void;
	deleteMeal: (id: number) => void;
}

export interface IsAdminProvider {
	isAdmin: Ref<boolean>;
	updateIsAdmin: (bool: boolean) => void;
}
