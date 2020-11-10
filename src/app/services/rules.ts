export class Rules {

  constructor() {
    this.zapRules = new ZapRules();
    this.vivaRealRules = new VivaRealRules();
  }

  public zapRules: ZapRules;
  public vivaRealRules: VivaRealRules;
}

class ZapRules {

  public RENTAL_MIN_VALUE_TOTAL_PRICE = 3500;
  public SALE_MIN_VALUE_PRICE = 600000;
  public SALE_MIN_VALUE_PRICE_BOUNDING_BOX = this.SALE_MIN_VALUE_PRICE - ((this.SALE_MIN_VALUE_PRICE / 100) *10)
  public MIN_USABLE_AREAS_VALUE = 3500;
  
}

class VivaRealRules {
  
  public RENTAL_MIN_VALUE_TOTAL_PRICE = 4000;
  public SALE_MIN_VALUE_PRICE = 700000;
  public PERCENTAGE_RATE_CONDO_FEE = 30;
  public PERCENTAGE_RATE_CONDO_FEE_BOUNDING_BOX = 50;
}

export class BoundingBox {
  public MINLON = -46.693419;
  public MINLAT = -23.568704;
  public MAXLON = -46.641146;
  public MAXLAT = -23.546686;
}
