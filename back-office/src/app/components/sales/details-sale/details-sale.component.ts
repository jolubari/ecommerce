import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from '../../../services/login.service';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-details-sale',
  templateUrl: './details-sale.component.html',
  styleUrls: ['./details-sale.component.scss']
})
export class DetailsSaleComponent implements OnInit {
  public url;
  public token;
  public idOrder:any;
  public detailsOrder: any[] = [];
  public loadingData = true;
  public order: any = {};
  public starProductEvaluation = 5;
  constructor(private loginService: LoginService, private route: ActivatedRoute, public saleService: SaleService) {
    this.token = this.loginService.getToken();
    this.url = environment.dbUrl;
    this.getIdSale();
   }

  ngOnInit(): void {
  }

  getIdSale(){
    this.route.params.subscribe(
      params => {
        this.idOrder = params['id'];
        this.getDetailsOrder();
      }
    )
  }

  getDetailsOrder(){
    this.saleService.getDetailsOrderClient(this.idOrder, this.token).subscribe(
      response => {
        if (response.data) {
          this.order = response.data;
          this.detailsOrder = response.details;
          this.loadingData = false;
        } else {
          this.order = undefined;
        }
      },
      error => {

      }
    )
  }

}
