import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductService } from '../../../services/product.service';
import { IziToast } from 'izitoast'; // npm install izitoast --save
import { CartService } from '../../../services/cart.service';
import { io } from 'socket.io-client'; // npm i socket.io-client
import { DiscountService } from 'src/app/services/discount.service';
import { ReviewService } from '../../../services/review.service';

declare const iziToast: IziToast;
declare var tns: any;
declare var lightGallery: any;
@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
})
export class DetailViewComponent implements OnInit {
  public slug: any;
  public detailsProduct: any = {};
  public url;
  public recomendedProducts: any[] = [];
  //carrito
  public cartData: any = {
    variety: '',
    quantity: 1,
  };
  public btnCartDisabled = false;
  token: any;
  public socket = io('http://localhost:4201');
  public discountActive: any = undefined;
  public reviews: Array<any> = new Array<any>();
  public page = 1;
  public pageSize = 15;


  public countFiveStar = 0;
  public countFourStar = 0;
  public countThreeStar = 0;
  public countTwoStar = 0;
  public countOneStar = 0;
  public totalPoints = 0;
  public maxPoints = 0;
  public percentRating = 0;
  public pointsRating = 0;


  public fivePercent = 0;
  public fourPercent = 0;
  public threePercent = 0;
  public twoPercent = 0;
  public onePercent = 0;



  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private discountService: DiscountService,
    private reviewService: ReviewService
  ) {
    this.url = environment.dbUrl;
    this.token = localStorage.getItem('token');
    this.router.params.subscribe(
      (params) => {
        this.slug = params['slug'];
        this.getDetailsProduct();
      },
      (error) => {}
    );
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.initTyniSlider();
      this.initLightGallery();
      this.initTynySliderRecomendedProducts();
    }, 500);
    this.getActiveDiscount();
  }

  getActiveDiscount() {
    this.discountService.getActiveDiscount().subscribe(
      (response) => {
        if (response.data) {
          this.discountActive = response.data[0];
        } else {
          this.discountActive = undefined;
        }
      },
      (error) => {}
    );
  }

  initTyniSlider() {
    tns({
      container: '.cs-carousel-inner',
      controlsText: [
        '<i class="cxi-arrow-left"></i>',
        '<i class="cxi-arrow-right"></i>',
      ],
      navPosition: 'top',
      controlsPosition: 'top',
      mouseDrag: !0,
      speed: 600,
      autoplayHoverPause: !0,
      autoplayButtonOutput: !1,
      navContainer: '#cs-thumbnails',
      navAsThumbnails: true,
      gutter: 15,
    });
  }

  initLightGallery() {
    var e = document.querySelectorAll('.cs-gallery');
    if (e.length) {
      for (var t = 0; t < e.length; t++) {
        lightGallery(e[t], {
          selector: '.cs-gallery-item',
          download: !1,
          videojs: !0,
          youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 },
          vimeoPlayerParams: { byline: 0, portrait: 0 },
        });
      }
    }
  }

  initTynySliderRecomendedProducts() {
    tns({
      container: '.cs-carousel-inner-two',
      controlsText: [
        '<i class="cxi-arrow-left"></i>',
        '<i class="cxi-arrow-right"></i>',
      ],
      navPosition: 'top',
      controlsPosition: 'top',
      mouseDrag: !0,
      speed: 600,
      autoplayHoverPause: !0,
      autoplayButtonOutput: !1,
      nav: false,
      controlsContainer: '#custom-controls-related',
      responsive: {
        0: {
          items: 1,
          gutter: 20,
        },
        480: {
          items: 2,
          gutter: 24,
        },
        700: {
          items: 3,
          gutter: 24,
        },
        1100: {
          items: 4,
          gutter: 30,
        },
      },
    });
  }

  getDetailsProduct() {
    this.productService.getDetailsProduct(this.slug).subscribe(
      (response) => {
        this.detailsProduct = response.data;
        this.getRecomendedProducts();
        this.getReviewsProduct();
      },
      (error) => {}
    );
  }

  getRecomendedProducts() {
    console.log(this.detailsProduct);
    this.productService
      .getRecomendedProductsEcommerce(this.detailsProduct.category)
      .subscribe(
        (response) => {
          this.recomendedProducts = response.data;
        },
        (error) => {}
      );
  }

  addProductToCart() {
    if (this.cartData.variety) {
      if (this.cartData.quantity <= this.detailsProduct.stock) {
        const data = {
          product: this.detailsProduct._id,
          client: localStorage.getItem('_id'),
          quantity: this.cartData.quantity,
          variety: this.cartData.variety,
          price: this.detailsProduct.price,
        };
        this.btnCartDisabled = true;
        this.cartService.addCartClient(data, this.token).subscribe(
          (response) => {
            if (response.data == undefined) {
              iziToast.show({
                title: 'ERROR',
                class: 'text-danger',
                position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                message: 'El producto ya existe en su carrito',
                titleColor: '#FF0000',
                color: '#FFF',
                zindex: 2,
              });
              this.btnCartDisabled = false;
            } else {
              iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                color: '#FFF',
                class: 'text-success',
                position: 'center',
                message: 'Se añadió correctamente el producto al carrito',
              });
              this.socket.emit('add-item-cart', { data: true }); // los eventos se definen en el app.js del backend de nodeJs Este es el emisor - el receptor es el navComponent
              this.btnCartDisabled = false;
            }
          },
          (error) => {}
        );
      } else {
        iziToast.show({
          title: 'ERROR',
          class: 'text-danger',
          position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
          message:
            'La máxima cantidad disponible es: ' + this.detailsProduct.stock,
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
        message: 'Debe seleccionar una variedad del producto',
        titleColor: '#FF0000',
        color: '#FFF',
        zindex: 2,
      });
    }
  }

  getReviewsProduct() {
    this.reviewService.getReviewsProduct(this.detailsProduct._id).subscribe(
      (response) => {
        response.data.forEach((element: any) => {
              this.calculateStars(element, response.data.length);
        });
        this.maxPoints = response.data.length * 5;
        this.percentRating = ( this.totalPoints * 100 ) / this.maxPoints; // multiplicando total por 100 entre maximo de puntos = porcentaje de aprobación
        this.pointsRating =  ( this.percentRating * 5 ) / 100; // numero total de estrellas
        this.reviews = response.data;
      },
      (error) => {}
    );
  }

  calculateStars(element: any, listLength: any){
    let fivePoints = 0;
    let fourPoints = 0;
    let threePoints = 0;
    let twoPoints = 0;
    let onePoint = 0;

    if (element.stars === 5) {
      this.countFiveStar += 1;
    }
    else if (element.stars === 4) {
      this.countFourStar += 1;
    }
    else if (element.stars === 3) {
      this.countThreeStar += 1;
    }
    else if (element.stars === 2) {
      this.countTwoStar += 1;
    }
    else if (element.stars === 1) {
      this.countOneStar += 1;
    }
    
    this.fivePercent = (this.countFiveStar * 100) / listLength;
    this.fourPercent = (this.countFourStar * 100) / listLength;
    this.threePercent = (this.countThreeStar * 100) / listLength;
    this.twoPercent = (this.countTwoStar * 100) / listLength;
    this.onePercent = (this.countOneStar * 100) / listLength;

  
    fivePoints += this.countFiveStar * 5;
    fourPoints += this.countFourStar * 4;
    threePoints += this.countThreeStar * 3;
    twoPoints += this.countTwoStar * 2;
    onePoint += this.countOneStar * 1;

    this.totalPoints = fivePoints + fourPoints + threePoints + twoPoints + onePoint;
  }


}
