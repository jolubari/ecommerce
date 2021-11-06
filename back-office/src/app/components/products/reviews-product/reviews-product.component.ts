import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workbook } from "exceljs"; // npm i exceljs y npm i --save-dev @types/exceljs ir tambien a tsconfig.app.json y en compilerOptions -> types anyadir "node"
import  * as fs from "file-saver"; // npm i --save-dev @types/file-saver
import { IziToast } from 'izitoast';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { ReviewService } from '../../../services/review.service';
declare const iziToast: IziToast;
declare let $: any;
@Component({
  selector: 'app-reviews-product',
  templateUrl: './reviews-product.component.html',
  styleUrls: ['./reviews-product.component.scss']
})
export class ReviewsProductComponent implements OnInit {
  public id: any;
  public token: any;
  public product: any;
  public url;
  public btnDisabled = false;
  public reviews: Array<any> = new Array<any>();
  public reviewsProductToExport: any[] = new Array<any>();
  public idAdminUser: any;
  public page = 1;
  public pageSize = 15;
  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router, private reviewService: ReviewService) { 
    this.url = environment.dbUrl;
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
            this.reviewService.getReviewsProduct(this.product._id).subscribe(
              response => {
                this.reviews = response.data;
              },
              error => {

              }
            )
          }
        },
        (error) => {}
      );
    });
  }



  donwloadExcel(){ // esto mejor hacerlo en el backend
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Reporte de productos");

    worksheet.addRow(undefined);
    for (let x1 of this.reviewsProductToExport){
      let x2 = Object.keys(x1);

      const temp = []
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    const fname='REP01-reviews- ';

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
