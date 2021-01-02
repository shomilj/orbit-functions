export enum ParamType {
  SingleSelect = "SINGLE_SELECT",
  MultiSelect = "MULTI_SELECT",
  Text = "TEXT",
}

export class Param {
  key: string;
  name: string;
  type: ParamType;
  options: any;

  constructor(key: string, name: string, type: ParamType, options: any) {
    this.key = key;
    this.name = name;
    this.type = type;
    this.options = options;
  }
}
