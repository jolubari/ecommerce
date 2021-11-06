import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { CartService } from '../../../services/cart.service';
import { environment } from 'src/environments/environment';
import { IziToast } from 'izitoast'; // npm install izitoast --save
import { io } from "socket.io-client"; // npm i socket.io-client
import { DiscountService } from 'src/app/services/discount.service';
declare const iziToast: IziToast;
declare var $: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public tokenClient: any;
  public idClient: any;
  public user: any;
  public userLE?: any;
  public configGlobal: any = {};
  public cartModalIsOpen = false;
  public cartElementsList: any[] = [];
  public url;
  public subTotal = 0;
  public socket = io('http://localhost:4201');
  public discountActive: any = undefined;
  constructor(private clientService: ClientService, private cartService: CartService, private configService: ConfigService, private router: Router, private discountService: DiscountService) { 
    this.url = environment.dbUrl;
    this.tokenClient = localStorage.getItem('token');
    this.idClient = localStorage.getItem('_id');
    if (this.tokenClient) {
      this.getClient();
    }
    this.getConfig();
  }

  ngOnInit(): void {
    //Receptor
    this.socket.on('new-cart-delete', this.getCartClient.bind(this));//eliminar

    this.socket.on('new-cart-add', this.getCartClient.bind(this));//añadir
    
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
  
  getClient(){
    this.clientService.getClient( this.idClient, this.tokenClient ).subscribe(
      response => {
        this.user = response.data;
        localStorage.setItem('user_data', JSON.stringify(this.user)); // guardamos los datos del usuario para reutilizarlo sin tener que llamar a getClient cada vez
        if (localStorage.getItem('user_data')) {
          this.userLE = JSON.parse(localStorage.getItem('user_data') || '{}');
          // this.user_lc = JSON.parse(localStorage.getItem('user_data') !); tambien funsiona asi
          this.getCartClient();
        } else {
          this.userLE = undefined;
        }
      },
      error => {
        this.user = undefined;
      }
    )
  }

  getCartClient(){
    if (this.userLE) {
      this.cartService.getCartClient(this.userLE._id, this.tokenClient).subscribe(
        response => {
          this.cartElementsList = response.data;
          this.calculateTotalCart();
        },
        error => {
  
        });
    } 
  }

  logout(){
    window.location.reload();
    localStorage.clear();
    this.router.navigate(['/']);
  }

  openCartModal(){
    if (!this.cartModalIsOpen) {
      this.cartModalIsOpen = true;
      $('#cart').addClass('show');
    } else {
      this.cartModalIsOpen = false;
      $('#cart').removeClass('show');

    }
  }

  calculateTotalCart(){
    this.subTotal = 0;
    if (!this.discountActive) {
      this.cartElementsList.forEach(element => {
        this.subTotal += parseInt(element.product.price) * parseInt(element.quantity); 
      });
    } else {
      this.cartElementsList.forEach(element => {
        const newPrice = Math.round((parseInt(element.product.price) * parseInt(element.quantity)) -(((parseInt(element.product.price) * parseInt(element.quantity)) * this.discountActive.discount) / 100));
        this.subTotal += newPrice; 
      });
    }
  }

  deleteItemToCart(id: any){
    this.cartService.deleteItemToCartClient(id, this.tokenClient).subscribe(
      response =>{
        if (response.data) {
          iziToast.show({
            title:'SUCCESS',
            titleColor:'#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position:'center',
            message:'Se eliminó correctamente el producto del carrito'
          });
          this.socket.emit('delete-item-cart', { data: response.data }); // los eventos se definen en el app.js del backend de nodeJs
        }
      },
      error => {

      }
    )
  }

}
