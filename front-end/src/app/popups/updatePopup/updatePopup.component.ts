import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { PopupService } from 'src/app/popup.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'update-popup',
  templateUrl: './updatePopup.component.html',
  styleUrls: ['./updatePopup.component.css'],
})
export class UpdatePopupComponent implements OnInit {
  @Input() userId: string;
  @Input() taskToUpdate: any;
  form: FormGroup;
  selectedOption: any;
  selectedDate: any;
  taskName: any;
  taskDescription: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.taskName = this.taskToUpdate.name;
    this.taskDescription = this.taskToUpdate.description;
    this.selectedOption = this.taskToUpdate.stage;
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
      this.http
        .put(`http://localhost:5000/task/${this.taskToUpdate._id}`, task)
        .subscribe(
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
  closePopup() {
    this.popupService.closeUpdatePopup();
  }
}
