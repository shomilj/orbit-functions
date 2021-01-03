import { Param } from "./parameter";

export enum CardCategory {
  HealthFitness = "Health & Fitness",
  FoodDrink = "Food & Drink",
  Sports = "Sports",
  Safety = "Safety",
  Navigation = "Navigation",
  Events = "Events",
}

export class CardModel {
  key: string;
  name: string;
  description: string;
  icon: string;
  category: CardCategory;
  params?: Param[];

  constructor(
    key: string,
    name: string,
    description: string,
    icon: string,
    category: CardCategory,
    params?: Param[]
  ) {
    this.key = key;
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.category = category;
    this.params = params;
  }
}
