import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { PopupService } from 'src/app/popup.service';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'update-popup',
  templateUrl: './updatePopup.component.html',
  styleUrls: ['./updatePopup.component.css'],
})
export class UpdatePopupComponent implements OnInit {
  @Input() userId: string;
  @Input() stage: any;
  form: FormGroup;
  stageName: any;

  constructor(private http: HttpClient, public popupService: PopupService) {}

  ngOnInit(): void {
    this.stageName = this.stage.stageName;
  }

  submit(): void {
    this.stage.stageName = this.stageName;
    if (this.stage.stageName === '') {
      Swal.fire('Error', 'Please mention the required fields.', 'error');
    } else {
      this.http
        .put(`http://localhost:5000/task/${this.stage._id}`, this.stage)
        .subscribe(
          (response) => {
            this.closePopup();
            console.log('Name Changed:', response);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    }
    console.log(this.stage, 'srinvias');
  }
  closePopup() {
    this.popupService.closeUpdatePopup();
  }
}
