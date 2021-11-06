import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../../services/coupon.service';
import { IziToast } from 'izitoast';
declare const iziToast: IziToast;
declare let jQuery: any;
declare let $: any;

@Component({
  selector: 'app-index-coupon',
  templateUrl: './index-coupon.component.html',
  styleUrls: ['./index-coupon.component.scss']
})
export class IndexCouponComponent implements OnInit {
  public coupons: Array<any> = new Array<any>();
  public loadingData = true;
  public page = 1;
  public pageSize = 10;
  public filter = '';
  public token;
  constructor(private couponService: CouponService) {
    this.token = localStorage.getItem('token');
   }

  ngOnInit(): void {
    this.getCoupons();
  }

  getCoupons(){
    this.couponService.getCoupons(this.token).subscribe(
      response => {
        this.coupons = response.data
        this.loadingData = false;
      },
      error => {

      }
    )
  }

  getFilteredCoupons(){
    this.couponService.getFilteredCoupons(this.filter, this.token).subscribe(
      response => {
        this.coupons = response.data
        this.loadingData = false;
      },
      error => {

      }
    )
  }
  filterCoupons(){
    this.getFilteredCoupons();
  }

  deleteCoupon(id: any) {
    this.couponService.deleteCoupon(id, this.token).subscribe(
      () => {
        iziToast.show({
          title: 'SUCCESS',
          class: 'text-success',
          position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
          message: 'Se eliminó correctamente el cliente',
          titleColor: '#1DC74C',
          color: '#FFF',
          zindex: 2,
        });
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.getCoupons();
      },
      error => {

      }
    )
  }

}
