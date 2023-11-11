import { z } from "zod";

const Recipe = z.object({
	title: z.string().min(1),
	homemade: z.boolean(),
	mealTypes: z.array(
		z.union(
			[z.literal("breakfast"), z.literal("lunch"), z.literal("tea"), z.literal("dinner")]
		)
	).nonempty(),
	difficulty: z.union([z.literal("easy"), z.literal("medium"), z.literal("hard")]),
	cookingTime: z.union([z.literal("short"), z.literal("medium"), z.literal("long")]),
	vegetarian: z.boolean(),
	servings: z.number(),
	ingredients: z.array(z.string()),
	directions: z.array(z.string())
});

export type Recipe = z.infer<typeof Recipe>;

export function parseJsonRecipe(obj: any): Recipe | null {
	const result = Recipe.safeParse(obj);
	if (result.success) {
		return result.data;
	}
	return null;
}
