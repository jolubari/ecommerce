import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { DiscountService } from 'src/app/services/discount.service';
import { environment } from 'src/environments/environment';
import { ProductService } from '../../services/product.service';
declare var tns: any; // tiny slider
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public discountActive: any = undefined;
  public url;
  public newProducts: any[]= [];
  public bestSellerProducts: any[]= [];
  public categories: any[] = [];

  constructor(private discountService: DiscountService, private productService: ProductService, private configService: ConfigService ) {
    this.url = environment.dbUrl;
   }

  ngOnInit(): void {
    this.getNewProducts();
    this.getBestSellerProductsEcommerce();
    this.getConfig();
    this.getActiveDiscount();
    this.initSlider();
  }
  getActiveDiscount(){
    this.discountService.getActiveDiscount().subscribe(
      response => {
        if (response.data) {
          this.discountActive = response.data[0];
        } else {
          this.discountActive = undefined;
        }
      },
      error =>{

      }
    )
  }

  getNewProducts(){
    this.productService.getNewProductsEcommerce().subscribe(
      response => {
        if (response.data) {
          this.newProducts = response.data;
        }
      }
    )
  }

  getBestSellerProductsEcommerce(){
    this.productService.getBestSellerProductsEcommerce().subscribe(
      response => {
        if (response.data) {
          this.bestSellerProducts = response.data;
        }
      }
    )
  }

  getConfig(){
    this.configService.getConfigEcommerce().subscribe(
      response => {
        response.data.categories.forEach((element: any) => {
          if (element.title === 'Reforma') {
            this.categories.push({
              title: element.title,
              cover: 'assets/img/ecommerce/home/categories/04.jpg'
            })
          }
          if (element.title === 'Pintura del hogar') {
            this.categories.push({
              title: element.title,
              cover: 'assets/img/ecommerce/home/categories/05.jpg'
            })
          }
          if (element.title === 'Reforma baño') {
            this.categories.push({
              title: element.title,
              cover: 'assets/img/ecommerce/home/categories/06.jpg'
            })
          }
          if (element.title === 'Esteticista a domicilio') {
            this.categories.push({
              title: element.title,
              cover: 'assets/img/ecommerce/home/categories/07.jpg'
            })
          }
          if (element.title === 'Limpieza del hogar') {
            this.categories.push({
              title: element.title,
              cover: 'assets/img/ecommerce/home/categories/08.jpg'
            })
          }
          if (element.title === 'Compra a domicilio') {
            this.categories.push({
              title: element.title,
              cover: 'assets/img/ecommerce/home/categories/09.jpg'
            })
          }
          if (element.title === 'Chapa y pintura') {
            this.categories.push({
              title: element.title,
              cover: 'assets/img/ecommerce/home/categories/04.jpg'
            })
          }
        });
      },
      error => {

      }
    );
  }

  initSlider(){
    setTimeout(()=>{
      tns({
        container: '.cs-carousel-inner',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        mode: 'gallery',
        navContainer: '#pager',
        responsive: {
          0: { controls: false },
          991: { controls: true }
        }
      });

      tns({
        container: '.cs-carousel-inner-two',
        controls: false,
        responsive: {
          0: {
            gutter: 20
          },
          400: {
            items: 2,
            gutter: 20
          },
          520: {
            gutter: 30
          },
          768: {
            items: 3,
            gutter: 30
          }
        }
        
      });

      tns({
        container: '.cs-carousel-inner-three',
        controls: false,
        mouseDrag: !0,
        responsive: {
          0: {
            items: 1,
            gutter: 20
          },
          420: {
            items: 2,
            gutter: 20
          },
          600: {
            items: 3,
            gutter: 20
          },
          700: {
            items: 3,
            gutter: 30
          },
          900: {
            items: 4,
            gutter: 30
          },
          1200: {
            items: 5,
            gutter: 30
          },
          1400: {
            items: 6,
            gutter: 30
          }
        }
        
        
      });

      tns({
        container: '.cs-carousel-inner-four',
        nav: false,
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        controlsContainer:'#custom-controls-trending',
        responsive: {
          0: {
            items: 1,
            gutter: 20
          },
          480: {
            items: 2,
            gutter: 24
          },
          700: {
            items: 3,
            gutter: 24
          },
          1100: {
            items: 4,
            gutter: 30
          }
        }
        
      });

      tns({
        container: '.cs-carousel-inner-five',
        controls: false,
        gutter: 30,
        responsive: {
          0: { items: 1 },
          380: { items: 2 },
          550: { items: 3 },
          750: { items: 4 },
          1000: { items: 5 },
          1250: { items: 6 }
        }
        
      });

      tns({
        container: '.cs-carousel-inner-six',
        controls: false,
        gutter: 15,
        responsive: {
          0: { items: 2 },
          500: { items: 3 },
          1200: { items: 3 }
        }
        
      });

    },500);
  }

}
