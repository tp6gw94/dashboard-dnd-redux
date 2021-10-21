import { CardTypes } from '../consts/cardTypes';
import { CwbDisplayType } from '../consts/cwbDisplayType';

export type Card = {
  id: string;
  displayType: CwbDisplayType;
  cardType: CardTypes;
};
