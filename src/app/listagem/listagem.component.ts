import {
  Component,
  OnInit
} from '@angular/core';
import {
  ListService
} from './listagem.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {
  results: Object;
  validList: any;
  ArrZp: any;
  ArrViva: any;
  showVivaResults: boolean = false;
  showZapResults: boolean = false;

  bBox = {
    minlon: -46.693419,
    minlat: -23.568704,
    maxlon: -46.641146,
    maxlat: -23.546686
  }

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.validList = [];
    this.ArrViva = [];
    this.ArrZp = [];
    this.getList();
  }

  getList() {
    this.listService.search().subscribe(data => {
      if (data) {
        this.results = data;
        console.log(this.results);
      }
    });
  }

  getZap() {
    this.checkResponses(this.results);
    this.zapBusinessRules(this.results);
    console.log(this.ArrZp, 'ZAP');
    this.showZapResults = true;
  }
  getViva() {
    this.checkResponses(this.results);
    this.vivaBusinessRules(this.results);
    console.log(this.ArrViva, 'VIVA');
    this.showVivaResults = true;
  }

  checkResponses(res) {
    res.forEach(item => {
      if (item.address.geoLocation.location.lat != 0 && item.address.geoLocation.location.lon != 0) {
        this.validList.push(item)
      }
    })
    // sessionStorage.setItem('detalhes-imoveis', JSON.stringify(this.validList));    
  }


  zapBusinessRules = (arrayImoveisValidos) => {
 
    arrayImoveisValidos.forEach(item => {
      if (item.pricingInfos.businessType === 'RENTAL') {
        if (item.pricingInfos.rentalTotalPrice >= 3500) {
          this.ArrZp.push(item)
        }
      }
      if (item.pricingInfos.businessType === 'SALE') {
        if ((item.pricingInfos.price) >= 540000 &&
          (this.calculaValorMetroQuadrado(item.pricingInfos.price, item.usableAreas) > 3500)) {
          if (this.checkCG(this.bBox.minlon, this.bBox.minlat, this.bBox.maxlon, this.bBox.maxlat, item.address.geoLocation.location.lon, item.address.geoLocation.location.lat) &&
            (item.pricingInfos.price) < 599999) {
            this.ArrZp.push(item)
          }
          if ((item.pricingInfos.price) >= 600000) {
            this.ArrZp.push(item)
          }
        }
      }
    })
  }

  calculaValorMetroQuadrado = (valorImovel: number, areaUtil: number) => {
    let valorMetroQuad =(valorImovel / areaUtil);
    return valorMetroQuad;
  }

  checkCG = (x1, y1, x2, y2, x, y) => {
    if ((x > x1 && x < x2) && (y > y1 && y < y2)) {
      return true;
    } else {
      return false;
    }
  }


 vivaBusinessRules = (arrayImoveisValidos) => {
    arrayImoveisValidos.forEach(item => {
      if (item.pricingInfos.businessType === 'SALE') {
        if (item.pricingInfos.price <= 700000) {
          this.ArrViva.push(item)
        }
      }
      if (
        (typeof item.pricingInfos.monthlyCondoFee != undefined) &&
        (parseInt(item.pricingInfos.monthlyCondoFee, 10) > 0)
        ) {
        if (item.pricingInfos.businessType === 'RENTAL') {
          if (this.checkCG(this.bBox.minlon, this.bBox.minlat, this.bBox.maxlon, this.bBox.maxlat, item.address.geoLocation.location.lon, item.address.geoLocation.location.lat) &&
            (item.pricingInfos.rentalTotalPrice) <= 6000) {

            // VALIDAÇÃO SE VALOR DO CONDOMINIO É MAIOR INFERIOR A 30% DO ALUGUEL 
            if (this.percentValorRent(item.pricingInfos.monthlyCondoFee, item.pricingInfos.rentalTotalPrice)) {
              this.ArrViva.push(item)
            }
          }
          // Fora da exceção o valor MÁXIMO volta a ser R$ 4.000,00
          if ((item.pricingInfos.rentalTotalPrice) <= 4000) {

            // VALIDAÇÃO SE VALOR DO CONDOMINIO É MAIOR INFERIOR A 30% DO ALUGUEL 
            if (this.percentValorRent(item.pricingInfos.monthlyCondoFee, item.pricingInfos.rentalTotalPrice)) {
              this.ArrViva.push(item)
            }
          }
        }
      }

    })
  }

  percentValorRent = (txCondo, rentValor) => {
    let valorApurado = 100 * (txCondo / rentValor);
    if (valorApurado < 30) {
      return true
    } else {
      return false;
    }
  }

}
