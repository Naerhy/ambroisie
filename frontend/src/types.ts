import { Ref } from "vue";

export type Types = "breakfast" | "lunch" | "tea" | "dinner";

export interface Meal {
	id: number;
	name: string;
	isRecipe: boolean;
	types: Types[];
	difficulty: number;
	cookingTime: number;
	isVegetarian: boolean;
	servings: number;
	ingredients: string;
	directions: string;
	imageBase64: string;
}

export type Inputs = Omit<Meal, "id">;

export type LoadedView = "manage" | "list";

export type FormMessage = {
	level: "success" | "error";
	message: string;
} | null;

export interface Filters {
	name: string;
	types: Types[];
	difficulties: number[];
	cookingTimes: number[];
	vegetarian: boolean;
}

export interface IsAdminProvider {
	isAdmin: Ref<boolean>;
	updateIsAdmin: (bool: boolean) => void;
}

export interface MealsProvider {
	meals: Ref<Meal[]>;
	addMeal: (meal: Meal) => void;
	deleteMeal: (id: number) => void;
}
