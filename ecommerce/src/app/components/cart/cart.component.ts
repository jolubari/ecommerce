import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import { IziToast } from 'izitoast'; // npm install izitoast --save
import { io } from 'socket.io-client'; // npm i socket.io-client
import { AddressService } from '../../services/address.service';
import { DictionaryService } from '../../services/dictionary.service';
import { SaleService } from '../../services/sale.service';
import { Router } from '@angular/router';
import { DiscountService } from '../../services/discount.service';
declare const iziToast: IziToast;
declare const Cleave: any; // https://nosir.github.io/cleave.js/ y archivo js en assets linkeado en el index.html - Formatea inputs de pago con tarjeta
declare const StickySidebar: any; // https://abouolia.github.io/sticky-sidebar/  y archivo js en assets linkeado en el index.html - mantiene un elemento estatico aunque se haga scroll
declare const paypal: any;

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @ViewChild('paypalButton', { static: true }) paypalElement?: ElementRef;
  public tokenClient: any;
  public idClient: any;
  public subTotal = 0;
  public total = 0;
  public cartElementsList: any[] = [];
  public url;
  public userLE?: any;
  public socket = io('http://localhost:4201');
  public principalAddress: any = {};
  public shipmentsTypes: any[] = [];
  public priceShipment = 0;
  public sale: any = {};
  public detailsSale: any[] = [];
  public codeTransaction: any;
  public errorCoupon = '';
  public discount = 0;
  public discountActive: any = undefined;

  constructor(
    private cartService: CartService,
    private addressService: AddressService,
    private saleService: SaleService,
    private dictionaryService: DictionaryService,
    private router: Router,
    private discountService: DiscountService
  ) {
    this.url = environment.dbUrl;
    this.tokenClient = localStorage.getItem('token');
    this.idClient = localStorage.getItem('_id');
    this.getShipmentsTypes();
    if (localStorage.getItem('user_data')) {
      this.userLE = JSON.parse(localStorage.getItem('user_data') || '{}');
      // this.user_lc = JSON.parse(localStorage.getItem('user_data') !); tambien funsiona asi
      this.getCartClient();
    } else {
      this.userLE = undefined;
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      new Cleave('#cc-number', {
        creditCard: true,
        onCreditCardTypeChanged: function (type: any) {
          // update UI ...
        },
      });

      new Cleave('#cc-exp-date', {
        date: true,
        datePattern: ['m', 'y'],
      });

      new StickySidebar('.sidebar-sticky', { topSpacing: 20 });
    }, 500);

    this.getPrincipalAddress();
    this.initPaypal();
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

  initPaypal() {
    paypal
      .Buttons({
        style: {
          layout: 'horizontal',
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: 'Pago Paypal - Ecommerce',
                amount: {
                  currency_code: 'EUR',
                  value: this.subTotal,
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          // order tiene el codigo de la transaccion
          this.codeTransaction =
            order.purchase_units[0].payments.captures[0].id;
          this.finishSale();
        },
        onError: (error: any) => {
          console.log(error);
        },
        onCancel: function (data: any, actions: any) {},
      })
      .render(this.paypalElement?.nativeElement);
  }

  getCartClient() {
    this.getActiveDiscount();
    this.cartService.getCartClient(this.userLE._id, this.tokenClient).subscribe(
      (response) => {
        this.cartElementsList = response.data;

        this.cartElementsList.forEach((element) => {
          this.detailsSale.push({
            product: element.product._id,
            client: this.idClient,
            subtotal: element.product.price,
            variety: element.variety,
            quantity: element.quantity,
          });
        });
        this.calculateSubTotalCart();
        this.calculateTotalCart('Envío Gratis');
      },
      (error) => {}
    );
  }

  calculateSubTotalCart() {
    this.subTotal = 0;
    if (!this.discountActive) {
      this.cartElementsList.forEach(element => {
        this.subTotal += parseInt(element.product.price) * parseInt(element.quantity); 
      });
    } else {
      this.cartElementsList.forEach(element => {
        const newPrice = Math.round((parseInt(element.product.price) * parseInt(element.quantity)) -(((parseInt(element.product.price) * parseInt(element.quantity)) * this.discountActive.discount) / 100));
        console.log(newPrice)
        this.subTotal += newPrice; 
      });
    }
  }

  calculateTotalCart(shipmentMethod: any) {
    this.total = this.subTotal + this.priceShipment;
    this.sale.shipment_method = shipmentMethod;
  }

  finishSale() {
    this.sale.client = this.idClient;
    this.sale.shipment_price = this.priceShipment;
    this.sale.code_transaction = this.codeTransaction;
    this.sale.address = this.principalAddress._id;
    this.sale.subtotal = this.total;
    this.sale.details = this.detailsSale;
    this.saleService.registerSaleClient(this.sale, this.tokenClient).subscribe(
      (response) => {
        const idSale = response.sale._id;
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'center',
          message: 'Se realizó correctamente la compra, gracias!',
        });
        this.saleService.sendMailSaleClient(idSale, this.tokenClient).subscribe(
          () => {
            this.router.navigate(['/']);
          }
        )
      },
      (error) => {}
    );
  }

  deleteItemToCart(id: any) {
    this.cartService.deleteItemToCartClient(id, this.tokenClient).subscribe(
      (response) => {
        if (response.data) {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'center',
            message: 'Se eliminó correctamente el producto del carrito',
          });
          this.socket.emit('delete-item-cart', { data: response.data }); // los eventos se definen en el app.js del backend de nodeJs Emisor receptor el NavComponent
          this.getCartClient();
        }
      },
      (error) => {}
    );
  }

  getPrincipalAddress() {
    this.addressService
      .getPrincipalAddressClient(this.idClient, this.tokenClient)
      .subscribe(
        (response) => {
          if (response.data) {
            this.principalAddress = response.data;
          } else {
            this.principalAddress = undefined;
          }
        },
        (error) => {}
      );
  }

  getShipmentsTypes() {
    this.dictionaryService.getShipments().subscribe((response) => {
      this.shipmentsTypes = response;
    });
  }


  validateCoupon(){
    if (this.sale.coupon) {
      if (this.sale.coupon.toString().length <= 25) { // valido
        this.saleService.validateCoupon(this.sale.coupon, this.tokenClient).subscribe(
          response => {
            if (response.data) {
              this.errorCoupon = '';
              iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                color: '#FFF',
                class: 'text-success',
                position: 'center',
                message: 'Se aplicó el cupón correctamente',
              });
            //tratamiento del cupon
            if (response.data.type === 'fixedValue') {
              this.discount = response.data.value;
              this.total = this.total - this.discount;
            }

            if (response.data.type === 'percent') {
              this.discount = ( this.total * response.data.value ) / 100;
              this.total = this.total - this.discount;
            }

            } else {
             this.errorCoupon = 'El cupón no se pudo aplicar'
            }
          },
          error => {

          }
        );
      } else {
        this.errorCoupon = 'El cupón debe contener menos de 25 caracteres'
      }
    } else {
      this.errorCoupon = 'El cupón no es válido'
    }
  }
}
