import { Param } from "./parameter";
import * as hash from "object-hash";

export const ORBIT_API_BASE =
  "https://us-central1-orbit-000.cloudfunctions.net/orbit_api";

export enum CardCategory {
  HealthFitness = "Health & Fitness",
  FoodDrink = "Food & Drink",
  Sports = "Sports",
  Safety = "Safety",
  Navigation = "Navigation",
  Events = "Events",
  News = "News",
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

  documentId = (): string => {
    return hash({
      key: this.key,
    });
  };
}
