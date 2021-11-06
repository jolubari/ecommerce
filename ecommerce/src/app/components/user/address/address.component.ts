import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { DictionaryService } from '../../../services/dictionary.service';
import { IziToast } from 'izitoast'; // npm install izitoast --save
declare const $: any;
declare const iziToast: IziToast;
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  public token;
  public address: any = {
    country: '',
    district: '',
    province: '',
    city: '',
    principal: false
  };
  public districts: any [] = [];
  public provinces: any [] = [];
  public cities: any[] = [];
  public clientId: any;
  public addressesClientList: any[] = [];
  public loadingData = true;
  constructor(private addressService: AddressService, private dictionaryService: DictionaryService) {
    this.token = localStorage.getItem('token');
    this.clientId = localStorage.getItem('_id');
    this.getAddresses();
   }

  ngOnInit(): void {
  }

  registerAddress(form: any){
  if (form.valid) {
    const data = {
      client: this.clientId,
      receiver: this.address.receiver,
      identity_document: this.address.identity_document,
      postal_code: this.address.postal_code,
      address: this.address.address,
      country: this.address.country,
      district: this.address.district,
      province: this.address.province,
      city: this.address.city,
      phone: this.address.phone,
      principal: this.address.principal
    };
    this.addressService.registerAddress( data, this.token ).subscribe(
      response => {
        iziToast.show({
          title:'SUCCESS',
          titleColor:'#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position:'center',
          message:'se registró la dirección correctamente'
        });
        this.address = {
          country: '',
          district: '',
          province: '',
          city: '',
          principal: false
        };
        $('#sl-district').prop('disabled', true);
        $('#sl-province').prop('disabled', true);
        $('#sl-city').prop('disabled', true);

        this.getAddresses();
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

  countrySelected(){
    $('#sl-district').prop('disabled', true);
    $('#sl-province').prop('disabled', true);
    $('#sl-city').prop('disabled', true);
    this.districts = [];
    this.provinces = [];
    this.cities = [];
    if (this.address.country) {
      this.address.district = '';
      this.address.province = '';
      this.address.city = '';
      $('#sl-district').prop('disabled', false);
      this.getDistricts();
    }
  }

  districtSelected(){
    $('#sl-province').prop('disabled', true);
    $('#sl-city').prop('disabled', true);
    this.provinces = [];
    this.cities = [];
    if (this.address.district) {
      this.address.province = '';
      this.address.city = '';
      $('#sl-province').prop('disabled', false);
      this.getProvinces();
    }
  }

  provinceSelected(){
    $('#sl-city').prop('disabled', true);
    this.cities = [];
    if (this.address.province) {
      this.address.city = '';
      $('#sl-city').prop('disabled', false);
      this.getCities();
    }
  }

  getDistricts(){
    this.dictionaryService.getDistricts().subscribe(
      response => {
        this.districts = response;
      }
    )
  }

  getProvinces(){
    this.dictionaryService.getProvinces().subscribe(
      response => {
        this.provinces = response;
      }
    )
  }

  getCities(){
    this.dictionaryService.getCities().subscribe(
      response => {
        this.cities = response;
      }
    )
  }

  getAddresses(){
    this.addressService.getClientAddresses(this.clientId, this.token).subscribe(
      response => {
        this.addressesClientList = response.data;
        this.loadingData = false;
      },
      error => {

      }
    )
  }

  setAsMainAddress(idAddress: any){
    this.addressService.updatePrincipalAddress(idAddress, this.clientId, this.token).subscribe(
      response => {
        iziToast.show({
          title:'SUCCESS',
          titleColor:'#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position:'center',
          message:'se actualizó la dirección principal correctamente'
        });
        this.getAddresses();
      },
      error => {

      }
    )
  }

}
