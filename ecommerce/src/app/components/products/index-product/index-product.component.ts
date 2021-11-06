import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IziToast } from 'izitoast'; // npm install izitoast --save
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../../../services/config.service';
import { ProductService } from '../../../services/product.service';
import { io } from "socket.io-client"; // npm i socket.io-client
import { DiscountService } from '../../../services/discount.service';

declare const noUiSlider: any;
declare var $:any;
declare var iziToast: IziToast;
@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.scss']
})
export class IndexProductComponent implements OnInit {
  public configGlobal: any = {};
  public filterCategory = '';
  public productsList: any[] = [];
  public filterProducts = '';
  public loadingData = true;
  public url;
  public fitlerCategoryProduct = 'all';
  public routeCategory: any;
  public page = 1;
  public pageSize = 15;
  //Orden resultados
  public sortBy = 'defect';
    //carrito
  public cartData: any = {
      variety: '',
      quantity: 1
  };
  token: any;
  public socket = io('http://localhost:4201');
  public btnCartDisabled = false;
  public discountActive: any = undefined;

  constructor(private configService: ConfigService, private productService: ProductService, private router: ActivatedRoute, private cartService: CartService, private discountService: DiscountService) {
    this.url = environment.dbUrl;
    this.token = localStorage.getItem('token');
    this.getConfig();
    this.getProducts();
    this.router.params.subscribe(
      params => {
        this.routeCategory = params['category'];
        if (this.routeCategory) {
          this.productService.getProducts().subscribe(
            response => {
                this.productsList = response.data;
                this.productsList = this.productsList.filter( item => item.category.toLowerCase() == this.routeCategory );
                this.loadingData = false;
            },
            error => {
      
            }
          )
        } else {
          this.getProducts();
        }
      }, error => {

      }
    )
   }

  ngOnInit(): void {
    this.createnouUiSlider();
    this.getActiveDiscount();
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

  getConfig(){
    this.configService.getConfigEcommerce().subscribe(
      response => {
        this.configGlobal = response.data;
      },
      error => {

      }
    );
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      response => {
          this.productsList = response.data;
          this.loadingData = false;
      },
      error => {

      }
    )
  }

  getProductsFiltered(){
    this.productService.getFilteredProducts(this.filterProducts).subscribe(
      response => {
        this.productsList = response.data;
        this.loadingData = false;
      },
      error => {

      }
    )
  }


  createnouUiSlider(){ // slider para precios
    var slider : any = document.getElementById('slider');
    noUiSlider.create(slider, {
        start: [0, 1000],
        connect: true,
        range: { // minimo y maximo de precios
            'min': 0,
            'max': 1000
        },
        tooltips: [true,true],
        pips: { // de cuanto en cuanto va subiendo el precio con el slider
          mode: 'count', 
          values: 5,
          
        }
    })
    // con jquery se obtienen los valores del slider y se actualiza los campos inputs 
    slider.noUiSlider.on('update', function (values: any[]) {
        $('.cs-range-slider-value-min').val(values[0]);
        $('.cs-range-slider-value-max').val(values[1]);
    });
    $('.noUi-tooltip').css('font-size','11px');
  }

  searchCategory(){
    if (this.filterCategory) {
      const search = new RegExp(this.filterCategory, 'i');
      this.configGlobal.categories = this.configGlobal.categories.filter( (item: any) => search.test(item.title))
    } else {
      this.getConfig();
    }
  }


  searchRangePrices(){
    
    this.productService.getProducts().subscribe(
      response => {
          this.productsList = response.data;
          const minSelected = parseInt($('.cs-range-slider-value-min').val());
          const maxSelected = parseInt($('.cs-range-slider-value-max').val());
      
          this.productsList = this.productsList.filter( (product) =>  {
            return product.price >= minSelected && product.price <= maxSelected;
          });
      },
      error => {

      }
    )
  }

  searchByCategory(){
    if ( this.fitlerCategoryProduct == 'all' ) {
      this.productService.getProducts().subscribe(
        response => {
            this.productsList = response.data;
            this.loadingData = false;
        },
        error => {
  
        }
      )
      
    } else {
      this.productService.getProducts().subscribe(
        response => {
            this.productsList = response.data;
            this.productsList = this.productsList.filter( item => item.category == this.fitlerCategoryProduct );
            this.loadingData = false;
        },
        error => {
  
        }
      )
      
    }
  }
  reloadProducts(){
    this.filterProducts= '';
    this.getProducts();
  }


  orderProductsBy(){
    switch (this.sortBy) {
      case 'defect':
        this.getProducts();
          break;
      case 'popularity':
        this.productsList.sort((a, b) => parseFloat(b.sales_number) - parseFloat(a.sales_number));
          break;
      case 'higherToLower':
        this.productsList.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
      case 'lowerToHigher':
        this.productsList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
      case 'aToZ':
        this.productsList.sort((a, b) => {
            if (a.title > b.title)
              return 1;
            if (a.title < b.title)
              return -1;
            return 0;
        });
          break;
      case 'zToA':
        this.productsList.sort((a, b) => {
          if (a.title < b.title)
            return 1;
          if (a.title > b.title)
            return -1;
          return 0;
      });
          break;
    
      default:
        break;
    }
  }

  addProductToCart(product: any){
    if (this.cartData.quantity <= product.stock) {
      if (product.varieties.length > 0) {
        const data = {
          product: product._id,
          client: localStorage.getItem('_id'),
          quantity: 1, // por defecto 1
          variety: product.varieties[0].variety_title, // la primer variedad del producto
          price: product.price
        };
        this.btnCartDisabled = true;
        this.cartService.addCartClient(data, this.token).subscribe(
          response => {
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
                title:'SUCCESS',
                titleColor:'#1DC74C',
                color: '#FFF',
                class: 'text-success',
                position:'center',
                message:'Se añadió correctamente el producto al carrito'
              });
              this.socket.emit('add-item-cart', { data: true }); // los eventos se definen en el app.js del backend de nodeJs
              this.btnCartDisabled = false;
            }
  
          },
          error => {
  
          }
        )
      } else {
        iziToast.show({
          title: 'ERROR',
          class: 'text-danger',
          position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
          message: 'El producto no está disponible en este momento',
          titleColor: '#FF0000',
          color: '#FFF',
          zindex: 2,
        });
        this.btnCartDisabled = false;
      }
  }
}


}
