# AMBROISIE

...

## Description

...

## Interface of recipes

The recipes JSON must respect the following interface.

```ts
interface Recipe {
	title: string;
	homemade: boolean;
	mealTypes: ("breakfast" | "lunch" | "tea" | "dinner")[];
	difficulty: "easy" | "medium" | "hard";
	cookingTime: "short" | "medium" | "long";
	vegetarian: boolean;
	servings: number;
	ingredients?: string[];
	directions?: string[];
}
```
