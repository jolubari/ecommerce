import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IziToast } from 'izitoast';
import { CouponService } from '../../../services/coupon.service';
declare const iziToast: IziToast;
@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.scss']
})
export class CreateCouponComponent implements OnInit {
  public coupon:any = {
    type:''
  };
  public btnDisabled = false;
  public token: any;
  constructor(private couponService: CouponService, private router: Router) {
    this.token = localStorage.getItem('token');
   }

  ngOnInit(): void {
  }

  registerCoupon(form:any) {
    if (form.valid) {
      this.btnDisabled = true;
      this.couponService.registerCoupon(this.coupon, this.token).subscribe(
        () => {
          iziToast.show({
            title: 'SUCCESS',
            class: 'text-success',
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            message: 'Se registro correctamente el cupon',
            titleColor: '#1DC74C',
            color: '#FFF',
            zindex: 2,
          });
          this.btnDisabled = false;
          this.router.navigate(['/panel/coupons']);
        },
        error => {
          this.btnDisabled = false;
        }
      )
    } else {
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        message: 'Los datos del formulario no son válidos',
        titleColor: '#FF0000',
        color: '#FFF',
        zindex: 2,
      });
    }
  }

}
