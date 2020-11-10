import { Injectable } from '@angular/core';
import { BusinessType } from '../models/enuns/business-type.enum';
import { Property } from '../models/property.model';
import { BoundingBox, Rules } from './rules';

@Injectable({
  providedIn: 'root',
})
export class RulesIteratorService {

  private rules: Rules;
  private boundingBox: BoundingBox 

  constructor() { 
    this.rules = new Rules();
    this.boundingBox = new BoundingBox();
  }

  getZapElegibleProperts(propertys: Property[]) {

    // Regras existentes
    const zapElegible = [
      ...propertys.filter(item =>
        item.pricingInfos &&
        item.pricingInfos.businessType === BusinessType.RENTAL &&
        item.pricingInfos &&
        item.pricingInfos.rentalTotalPrice &&
        Number(item.pricingInfos.rentalTotalPrice) >= this.rules.zapRules.RENTAL_MIN_VALUE_TOTAL_PRICE
      ),
      ...propertys.filter(item =>
        item.pricingInfos &&
        item.pricingInfos.businessType === BusinessType.SALE &&
        item.pricingInfos &&
        item.pricingInfos.price &&
        Number(item.pricingInfos.price) >= this.rules.zapRules.SALE_MIN_VALUE_PRICE
      )
    ]

    // Novas regras
    const listSaleAndUsableAreas = zapElegible.filter(item => item.usableAreas !== 0 && item.pricingInfos && item.pricingInfos.businessType === BusinessType.SALE);

    const listBoundBoxAcepted = listSaleAndUsableAreas.filter(item =>
      item &&
      item.address &&
      item.address.geoLocation &&
      item.address.geoLocation.location &&
      item.address.geoLocation.location.lon &&
      item.address.geoLocation.location.lat &&
      this.checkBoundingBox(
        this.boundingBox.MINLON,
        this.boundingBox.MINLAT,
        this.boundingBox.MAXLON,
        this.boundingBox.MAXLAT,
        item.address.geoLocation.location.lon,
        item.address.geoLocation.location.lat
      ) &&
      item.pricingInfos &&
      item.pricingInfos.price &&
      (Number(item.pricingInfos.price) / item.usableAreas) > this.rules.zapRules.SALE_MIN_VALUE_PRICE_BOUNDING_BOX
    )

    const list = listSaleAndUsableAreas.filter(item => 
      !listBoundBoxAcepted.some(property => property.id === item.id) && 
      item.pricingInfos &&
      item.pricingInfos.price &&
      (Number(item.pricingInfos.price) / item.usableAreas) > this.rules.zapRules.MIN_USABLE_AREAS_VALUE
    );

    return [...listBoundBoxAcepted, ...list];
  }

  getVivaElegiblePropertis(propertys: Property[]) {

    // Regras existentes
    const vivaElegible = [
      ...propertys.filter(item =>
        item.pricingInfos &&
        item.pricingInfos.businessType === BusinessType.RENTAL &&
        item.pricingInfos &&
        item.pricingInfos.rentalTotalPrice &&
        Number(item.pricingInfos.rentalTotalPrice) <= this.rules.vivaRealRules.RENTAL_MIN_VALUE_TOTAL_PRICE
      ),
      ...propertys.filter(item =>
        item.pricingInfos &&
        item.pricingInfos.businessType === BusinessType.SALE &&
        item.pricingInfos &&
        item.pricingInfos.price &&
        Number(item.pricingInfos.price) <= this.rules.vivaRealRules.SALE_MIN_VALUE_PRICE
      )
    ]

    // Novas Regras
    const listRental = vivaElegible.filter(item => item.pricingInfos && item.pricingInfos.businessType === BusinessType.RENTAL);

    const listRentalValueValid = listRental.filter(item =>
      item.pricingInfos &&
      item.pricingInfos.monthlyCondoFee &&
      item.pricingInfos.rentalTotalPrice &&
      this.elegibleVivaRentalValue(
        Number(item.pricingInfos.rentalTotalPrice),
        Number(item.pricingInfos.monthlyCondoFee),
        this.rules.vivaRealRules.PERCENTAGE_RATE_CONDO_FEE
      )
    )

    const listRentalValueValidBoundBox = listRental.filter(item =>
      item.pricingInfos &&
      item.pricingInfos.monthlyCondoFee &&
      item.pricingInfos.rentalTotalPrice &&
      item.address &&
      item.address.geoLocation &&
      item.address.geoLocation.location &&
      item.address.geoLocation.location.lon &&
      item.address.geoLocation.location.lat &&
      !listRentalValueValid.some(property => property.id === item.id) &&
      this.checkBoundingBox(
        this.boundingBox.MINLON,
        this.boundingBox.MINLAT,
        this.boundingBox.MAXLON,
        this.boundingBox.MAXLAT,
        item.address.geoLocation.location.lon,
        item.address.geoLocation.location.lat
      ) &&
      this.elegibleVivaRentalValue(
        Number(item.pricingInfos.rentalTotalPrice),
        Number(item.pricingInfos.monthlyCondoFee),
        this.rules.vivaRealRules.PERCENTAGE_RATE_CONDO_FEE_BOUNDING_BOX
      )
    )

    return [...listRentalValueValid, ...listRentalValueValidBoundBox]
  }

  private checkBoundingBox = (x1, y1, x2, y2, x, y) => {
    if ((x >= x1 && x <= x2) && (y >= y1 && y <= y2)) {
      return true;
    } else {
      return false;
    }
  }

  private elegibleVivaRentalValue(rentalPrice: number, condoFeePrice: number, percentageRate: number) {
    const percentPrice: number = ((rentalPrice / 100) * percentageRate);
    const returnValue = condoFeePrice >= percentPrice;
    return !returnValue;
  }

}
