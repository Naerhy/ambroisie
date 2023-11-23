import type { Recipe } from "./validate";

export type RecipeFN = Recipe & { filename: string };
