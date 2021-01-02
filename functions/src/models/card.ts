import { Param } from "./parameter";

export enum CardGroup {
  AllCards = "All Cards",
  Food = "Food Items",
}

export class CardModel {
  name: string;
  description: string;
  icon: string;
  groups: [CardGroup];
  params?: Param[];

  constructor(
    name: string,
    description: string,
    icon: string,
    groups: [CardGroup],
    params?: Param[]
  ) {
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.groups = groups;
    this.params = params;
  }
}
