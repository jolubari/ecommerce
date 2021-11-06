import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponService } from 'src/app/services/coupon.service';
import { IziToast } from 'izitoast';
declare const iziToast: IziToast;
@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.scss']
})
export class EditCouponComponent implements OnInit {
  public coupon:any = {
    type:''
  };
  public btnDisabled = false;
  public token: any;
  public id = '';
  public loadingData = true;
  constructor(private couponService: CouponService, private router: Router, private route: ActivatedRoute,) {
    this.token = localStorage.getItem('token');
   }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.couponService.getCoupon(this.id, this.token).subscribe(
        (response) => {
          if (response.data === undefined) {
            this.coupon = undefined;
            this.loadingData = false;
          } else {
            this.coupon = response.data;
            this.loadingData = false;
          }
        },
        (error) => {}
      );
    });
  }

  update(form: any){
    if (form.valid) {
      this.btnDisabled = true;
      this.couponService
        .updateCoupon(this.id, this.coupon, this.token)
        .subscribe(
          () => {
            iziToast.show({
              title: 'SUCCESS',
              class: 'text-success',
              position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
              message: 'Se actualizó correctamente el cupon',
              titleColor: '#1DC74C',
              color: '#FFF',
              zindex: 2,
            });
            this.btnDisabled = false;
            this.router.navigate(['/panel/coupons']);
          });
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
