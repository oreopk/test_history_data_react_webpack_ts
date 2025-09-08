import type { Category } from "./types";


export const computeRange = (category: Category) => {
const years = category.items.map((i) => i.year);
return { start: Math.min(...years), end: Math.max(...years) };
};