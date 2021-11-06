import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import { ReviewService } from '../../../../services/review.service';

@Component({
  selector: 'app-index-review',
  templateUrl: './index-review.component.html',
  styleUrls: ['./index-review.component.scss']
})
export class IndexReviewComponent implements OnInit {
  public loadingData = true;
  public token;
  public idClient:any;
  public url;
  public reviews: any[] = [];
  public page = 1;
  public pageSize = 15;
  constructor(private reviewService: ReviewService, private loginService: LoginService) {
    this.token = this.loginService.getToken();
    this.idClient = localStorage.getItem('_id');
    this.url = environment.dbUrl;
   }

  ngOnInit(): void {
    this.getReviews();
  }
  getReviews(){
    this.reviewService.getReviewsClient(this.idClient, this.token).subscribe(
      response => {
        this.reviews = response.data;
        this.loadingData = false;
      }
    )
  }


}
