import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  showSpinner: boolean;

  constructor(private sharedService: SharedService) {
    this.showSpinner = false;
  }

  ngOnInit(): void {
    this.sharedService.spinnerManagement.subscribe((response: boolean) => {
      this.showSpinner = response;
    })
  }
}
