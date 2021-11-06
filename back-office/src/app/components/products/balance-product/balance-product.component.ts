import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Workbook } from "exceljs"; // npm i exceljs y npm i --save-dev @types/exceljs ir tambien a tsconfig.app.json y en compilerOptions -> types anyadir "node"
import  * as fs from "file-saver"; // npm i --save-dev @types/file-saver
import { IziToast } from 'izitoast';
declare const iziToast: IziToast;
declare let $: any;
@Component({
  selector: 'app-balance-product',
  templateUrl: './balance-product.component.html',
  styleUrls: ['./balance-product.component.scss']
})
export class BalanceProductComponent implements OnInit {
  public id: any;
  public token: any;
  product: any;
  public btnDisabled = false;
  public balancesProductList: Array<any> = new Array<any>();
  public listbalancesProductToExport: any[] = new Array<any>();
  //form
  public balance: any={};
  public idAdminUser: any
  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { 
    this.token = localStorage.getItem('token');
    this.idAdminUser = localStorage.getItem('_id');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.productService.getProduct(this.id, this.token).subscribe(
        (response) => {
          if (response.data === undefined) {
            this.product = undefined;
          } else {
            this.product = response.data;
            this.getBalanceProduct(this.id, this.token);
          }
        },
        (error) => {}
      );
    });
  };

  getBalanceProduct(id: any, token: any) {
    this.productService.getBalanceProduct(id, token).subscribe(
      response => {
          this.balancesProductList = response.data;
          this.balancesProductList.forEach(element => {
              const nameAdmin = `${element.admin.first_name} ${element.admin.second_name} ${element.admin.first_surname} ${element.admin.second_surname}`;
              this.listbalancesProductToExport.push({
                admin: nameAdmin,
                quantity: element.quantity,
                provider: element.provider
              })
          });
      },
      error => {
          console.error(error);
      }
    )
  };

  reload(){
    this.getBalanceProduct(this.id, this.token);
  }

  deleteBalance(id: any) {
    this.btnDisabled = true;
      this.productService.deleteBalanceProduct(id, this.token).subscribe(
        () => {
          iziToast.show({
            title: 'SUCCESS',
            class: 'text-success',
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            message: 'Se eliminó correctamente el producto',
            titleColor: '#1DC74C',
            color: '#FFF',
            zindex: 2,
          });
          $('#delete-'+id).modal('hide');
          $('.modal-backdrop').removeClass('show');
          this.btnDisabled = false;
          this.reload();
        },
        error => {
          this.btnDisabled = false;
          iziToast.show({
            title: 'ERROR',
            class: 'text-danger',
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            message: 'Ha ocurrido un error durante el borrado',
            titleColor: '#FF0000',
            color: '#FFF',
            zindex: 2,
          });
        }
      )
  }

  registerBalance(form: any) {
    if (form.valid) {
      const data = {
        product: this.product._id,
        quantity: form.value.quantity,
        admin: this.idAdminUser,
        provider: form.value.provider
      };
      this.productService.registerBalanceProduct(data, this.token).subscribe(
        response => {
          iziToast.show({
            title: 'SUCCESS',
            class: 'text-success',
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            message: 'Se registró correctamente el inventario del producto',
            titleColor: '#1DC74C',
            color: '#FFF',
            zindex: 2,
          });
          this.reload();
        },
        error => {

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

  donwloadExcel(){ // esto mejor hacerlo en el backend
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Reporte de productos");

    worksheet.addRow(undefined);
    for (let x1 of this.listbalancesProductToExport){
      let x2 = Object.keys(x1);

      const temp = []
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    const fname='REP01- ';

    worksheet.columns = [
      { header: 'Trabajador', key: 'col1', width: 40},
      { header: 'Cantidad', key: 'col2', width: 15},
      { header: 'Proveedor', key: 'col3', width: 20},
    ]as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, `${fname}-${new Date().valueOf()}.xlsx`);
    });
  }

}
