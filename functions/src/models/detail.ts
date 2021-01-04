import * as hash from "object-hash";

export class DetailModel {
  cardKey: string;
  params: any;
  detailRef: string;
  node: any;

  constructor(cardKey: string, params: any, detailRef: string, node: any) {
    this.cardKey = cardKey;
    this.params = params;
    this.detailRef = detailRef;
    this.node = node;
  }

  documentId = (): string => {
    return hash({
      cardId: this.cardKey,
      params: this.params,
      detailRef: this.detailRef,
    });
  };
}
