import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public tokenClient: any;
  public idClient: any;
  public user: any;
  public userLE?: any;
  constructor(private clientService: ClientService, private router: Router) {
    this.tokenClient = localStorage.getItem('token');
    this.idClient = localStorage.getItem('_id');
    if (this.tokenClient) {
      this.getClient();
    }
   }

  ngOnInit(): void {}

  getClient(){
    this.clientService.getClient( this.idClient, this.tokenClient ).subscribe(
      response => {
        this.user = response.data;
        localStorage.setItem('user_data', JSON.stringify(this.user)); // guardamos los datos del usuario para reutilizarlo sin tener que llamar a getClient cada vez
        if (localStorage.getItem('user_data')) {
          this.userLE = JSON.parse(localStorage.getItem('user_data') || '{}');
          // this.user_lc = JSON.parse(localStorage.getItem('user_data') !); tambien funsiona asi
        } else {
          this.userLE = undefined;
        }
      },
      error => {
        this.user = undefined;
      }
    )
  }

  logout(){
    window.location.reload();
    localStorage.clear();
    this.router.navigate(['/']);
  }


}
