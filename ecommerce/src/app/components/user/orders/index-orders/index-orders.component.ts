import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from '../../../../services/order.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-index-orders',
  templateUrl: './index-orders.component.html',
  styleUrls: ['./index-orders.component.scss']
})
export class IndexOrdersComponent implements OnInit {
  public url;
  public token;
  public idClient:any;
  public orders: any[] = [];
  public loadingData = true;
  public page = 1;
  public pageSize = 15;
  constructor(private orderService: OrderService, private loginService: LoginService) {
    this.token = this.loginService.getToken();
    this.idClient = localStorage.getItem('_id');
    this.url = environment.dbUrl;
   }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrdersClient(this.idClient, this.token).subscribe(
      response => {
          this.orders = response.data;
          this.loadingData = false;
      },
      error => {

      }
    )
  }

}
