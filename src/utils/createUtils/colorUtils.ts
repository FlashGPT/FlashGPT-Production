import { CategoryFetch } from "../../model/sanityFetchTypings";

export function getDarkColor() {
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  return color;
}

export function getCategoryToColorsMap(categories: CategoryFetch[]) {
  const categoryToColorsMap: Map<string, string> = new Map();
  categories.forEach((category) => {
    categoryToColorsMap.set(category.name, getDarkColor());
  });
  return categoryToColorsMap;
}
