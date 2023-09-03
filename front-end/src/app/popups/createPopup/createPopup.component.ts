import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { PopupService } from 'src/app/popup.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'create-popup',
  templateUrl: './createPopup.component.html',
  styleUrls: ['./createPopup.component.css'],
})
export class CreatePopupComponent implements OnInit {
  @Input() userId: string;
  form: FormGroup;
  selectedOption = 'to-do';
  selectedDate: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public popupService: PopupService
  ) {}

  ngOnInit(): void {
    const initialDate = new Date();

    this.onDateChange({ value: initialDate });

    this.form = this.formBuilder.group({
      name: '',
      description: '',
      dueDate: Date,
      stage: '',
      userId: this.userId,
    });
  }

  onDateChange(event: any): void {
    this.selectedDate = event.value;
  }

  closePopup() {
    this.popupService.closeCreatePopup();
  }
  submit(): void {
    let task = this.form.getRawValue();
    task.dueDate = this.selectedDate;
    if (
      task.name === '' ||
      task.description === '' ||
      task.dueDate === '' ||
      task.stage === ''
    ) {
      Swal.fire('Error', 'Please mention all the fields.', 'error');
    } else {
      this.http.post('http://localhost:5000/task', task).subscribe(
        (response) => {
          this.closePopup();
          window.location.reload();
          console.log('Task created:', response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
    console.log(task);
  }
}
