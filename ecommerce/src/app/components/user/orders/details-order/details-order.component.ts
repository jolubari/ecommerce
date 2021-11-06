import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating'; //  npm i ng-starrating --legacy-peer-deps
import { IziToast } from 'izitoast'; // npm install izitoast --save
import { ReviewService } from '../../../../services/review.service';
declare const $: any;
declare const iziToast: IziToast;
@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.scss']
})
export class DetailsOrderComponent implements OnInit {
  public url;
  public token;
  public idOrder:any;
  public detailsOrder: any[] = [];
  public loadingData = true;
  public order: any = {};
  public starProductEvaluation = 5;
  public reviewClient: any = {};
  constructor(private orderService: OrderService, private loginService: LoginService, private route: ActivatedRoute, private reviewService: ReviewService) {
    this.token = this.loginService.getToken();
    this.url = environment.dbUrl;
    this.getIdOrder();
   }

  ngOnInit(): void {
  }

  getIdOrder(){
    this.route.params.subscribe(
      params => {
        this.idOrder = params['id'];
        this.getDetailsOrder();
      }
    )
  }

  getDetailsOrder(){
    this.orderService.getDetailsOrderClient(this.idOrder, this.token).subscribe(
      response => {
        if (response.data) {
          this.order = response.data;
          response.details.forEach((detail: any) => {
            this.reviewService.getReviewProduct(detail.product._id).subscribe(
              response => {
                let emited = false;
                response.data.forEach( (order: any) => {
                  if (order.client == localStorage.getItem('_id')) {
                    emited = true;
                  }
                });
                detail.state = emited;
              },
              error => {

              }
            )
          });
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

  onRate($event:{oldValue: number, newValue: number, starRating: StarRatingComponent}) {
    this.starProductEvaluation = $event.newValue;
  }

  openModal(detailOrder: any) {
    this.reviewClient = {};
    this.reviewClient.product = detailOrder.product._id;
    this.reviewClient.client = detailOrder.client;
    this.reviewClient.sale = this.idOrder;
  }

  emitRate(id: any){
    if (this.reviewClient.review) {
      if (this.starProductEvaluation && this.starProductEvaluation >= 0) {
        this.reviewClient.stars = this.starProductEvaluation;
        this.reviewService.emitReviewProduct(this.reviewClient, this.token).subscribe(
          response => {
            iziToast.show({
              title:'SUCCESS',
              titleColor:'#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position:'center',
              message:'se registró la la reseña correctamente'
            });
            $('#review-'+id).modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.getDetailsOrder();
          },
          error => {

          }
        )
      } else {
        iziToast.show({
          title: 'ERROR',
          class: 'text-danger',
          position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
          message: 'Seleccione el número de estrellas',
          titleColor: '#FF0000',
          color: '#FFF',
          zindex: 2,
        });
      }
    } else {
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        message: 'Ingrese un mensaje en la reseña',
        titleColor: '#FF0000',
        color: '#FFF',
        zindex: 2,
      });
    }
  }

}
