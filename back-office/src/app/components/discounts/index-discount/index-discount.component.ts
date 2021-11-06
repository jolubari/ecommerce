import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DiscountService } from '../../../services/discount.service';
import { Workbook } from "exceljs"; // npm i exceljs y npm i --save-dev @types/exceljs ir tambien a tsconfig.app.json y en compilerOptions -> types anyadir "node"
import  * as fs from "file-saver"; // npm i --save-dev @types/file-saver
import { IziToast } from 'izitoast';
declare const iziToast: IziToast;
declare let $: any;
@Component({
  selector: 'app-index-discount',
  templateUrl: './index-discount.component.html',
  styleUrls: ['./index-discount.component.scss']
})
export class IndexDiscountComponent implements OnInit {
  public loadingData = true;
  public filter = '';
  public token;
  public discounts: any[] = new Array<any>();
  public discountsToExport: any[] = new Array<any>();
  public url;
  public page = 1;
  public pageSize = 10;
  public btnDisabled = false;
  constructor(private discountService: DiscountService) {
    this.token = localStorage.getItem('token');
    this.url = environment.dbUrl;
   }

  ngOnInit(): void {
    this.getDiscounts();
  }

  getDiscounts(){
    this.discountService.getDiscounts(this.token).subscribe(
      response => {
        this.discounts = response.data;
        this.discounts.forEach(element => {
          // Formatear las fechas: 
          const timestampToday = Date.parse(new Date().toString()) / 1000;        
          const timestampInitDiscount = Date.parse(element.init_date + 'T00:00:00') / 1000;
          const timestampEndDiscount = Date.parse(element.end_date + 'T00:00:00') / 1000;
          // comparacion de fechas

          if (timestampToday > timestampInitDiscount) {
            element.state =  'Expirado'
          }
          if (timestampToday < timestampInitDiscount) {
            element.state =  'Proximamente'
          }
          if ((timestampToday >= timestampInitDiscount) && (timestampToday <= timestampEndDiscount)) {
            element.state =  'En progreso'
          }

          // preparar en un array para exportar a excel
          this.discountsToExport.push({
            title: element.title,
            discount: element.discount,
            init_date: element.init_date,
            end_date: element.end_date,
            state: element.state
          });
        });
        this.loadingData = false;
      }, 
      error => console.log(error)
    );
  }

  getFilteredDiscounts(){
    this.discountService.getFilteredDiscounts(this.filter, this.token).subscribe(
      response => {
        this.discounts = response.data;
      }, 
      error => console.log(error)
    );
  }

  filterDiscounts() {
    if (this.filter) {
      this.getFilteredDiscounts();
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
    this.getDiscounts();
  }


  deleteDiscount(id:any) {
    this.btnDisabled = true;
      this.discountService.deleteDiscount(id, this.token).subscribe(
        () => {
          iziToast.show({
            title: 'SUCCESS',
            class: 'text-success',
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            message: 'Se eliminó correctamente el descuento',
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
      const worksheet = workbook.addWorksheet("Reporte de descuentos");
  
      worksheet.addRow(undefined);
      for (let x1 of this.discountsToExport){
        let x2 = Object.keys(x1);
  
        const temp = []
        for(let y of x2){
          temp.push(x1[y])
        }
        worksheet.addRow(temp)
      }
  
      const fname='REP01-discounts- ';
  
      worksheet.columns = [
        { header: 'Título', key: 'col1', width: 30},
        { header: 'Descuento', key: 'col2', width: 15},
        { header: 'Fecha inicio', key: 'col3', width: 30},
        { header: 'Fecha fín', key: 'col4', width: 30},
        { header: 'Estado', key: 'col4', width: 30},
      ]as any;
  
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, `${fname}-${new Date().valueOf()}.xlsx`);
      });
    }

}
