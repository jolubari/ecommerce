import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-index-sale',
  templateUrl: './index-sale.component.html',
  styleUrls: ['./index-sale.component.scss']
})
export class IndexSaleComponent implements OnInit {
  public token;
  public url;
  public sales: any[] = [];
  public fromDate:any;
  public toDate: any;

  public page = 1;
  public pageSize = 10;

  constructor(private saleService: SaleService) {
    this.token = localStorage.getItem('token');
    this.url = environment.dbUrl;
   }

  ngOnInit(): void {
    this.getSales();
  }

  getSales(){
    this.saleService.getSales(this.fromDate, this.toDate, this.token).subscribe(
      response => {
        this.sales = response.data;
      },
      error => {

      }
    )
  }

}
