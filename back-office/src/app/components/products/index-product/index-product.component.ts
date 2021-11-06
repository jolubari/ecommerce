import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductService } from '../../../services/product.service';
import { Workbook } from "exceljs"; // npm i exceljs y npm i --save-dev @types/exceljs ir tambien a tsconfig.app.json y en compilerOptions -> types anyadir "node"
import  * as fs from "file-saver"; // npm i --save-dev @types/file-saver
import { IziToast } from 'izitoast';
declare const iziToast: IziToast;
declare let $: any;
@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.scss']
})
export class IndexProductComponent implements OnInit {
  public loadingData = true;
  public filter = '';
  public token;
  public products: any[] = new Array<any>();
  public listProductsToExport: any[] = new Array<any>();
  public url;
  public page = 1;
  public pageSize = 10;
  public btnDisabled = false;
  
  constructor(private productService: ProductService) {
    this.token = localStorage.getItem('token');
    this.url = environment.dbUrl;
   }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts(this.token).subscribe(
      response => {
        this.products = response.data;
        this.products.forEach(element => {
          this.listProductsToExport.push({
            title: element.title,
            stock: element.stock,
            price: element.price,
            category: element.category,
            sales_number: element.sales_number
          });
        });
        this.loadingData = false;
      }, 
      error => console.log(error)
    );
  }

  getFilteredProducts(){
    this.productService.getFilteredProducts(this.filter, this.token).subscribe(
      response => {
        this.products = response.data;
      }, 
      error => console.log(error)
    );
  }

  filterProducts() {
    if (this.filter) {
      this.getFilteredProducts();
    } else {
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        message: 'Ingrese un filtro para buscar',
        titleColor: '#FF0000',
        color: '#FFF',
        zindex: 2,
      });
    }
    this.filter = '';
  }

  reload(){
    this.filter = '';
    this.getProducts();
  }


  deleteProduct(id:any) {
    this.btnDisabled = true;
      this.productService.deleteProduct(id, this.token).subscribe(
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

    donwloadExcel(){ // esto mejor hacerlo en el backend
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Reporte de productos");
  
      worksheet.addRow(undefined);
      for (let x1 of this.listProductsToExport){
        let x2 = Object.keys(x1);
  
        const temp = []
        for(let y of x2){
          temp.push(x1[y])
        }
        worksheet.addRow(temp)
      }
  
      const fname='REP01-products- ';
  
      worksheet.columns = [
        { header: 'Producto', key: 'col1', width: 30},
        { header: 'Stock', key: 'col2', width: 15},
        { header: 'Precio', key: 'col3', width: 15},
        { header: 'Categoria', key: 'col4', width: 25},
        { header: 'N° ventas', key: 'col5', width: 15},
      ]as any;
  
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, `${fname}-${new Date().valueOf()}.xlsx`);
      });
    }
}
