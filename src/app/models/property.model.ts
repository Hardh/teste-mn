import { Adress } from './adress.mode';
import { PricingInfos } from './pricing-infos.model';

export class Property {
  usableAreas?: number;
  listingType?: string;
  createdAt?: string;
  listingStatus?: string
  id?: string;
  parkingSpaces?: number;
  updatedAt?: string;
  owner?: boolean;
  images?: string[];
  address?: Adress;
  bathrooms?: number;
  bedrooms?: number;
  pricingInfos?: PricingInfos;
}