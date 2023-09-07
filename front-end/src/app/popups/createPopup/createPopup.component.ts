import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { PopupService } from 'src/app/popup.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'create-popup',
  templateUrl: './createPopup.component.html',
  styleUrls: ['./createPopup.component.css'],
})
export class CreatePopupComponent implements OnInit {
  applications: any = [];
  links: any = [];

  @Input() userId: string;
  @Input() stage: any;
  form: FormGroup;
  selectedApplication = 'Web';
  applicationOptions = ['Web', 'IOS', 'Desktop', 'Mobile'];
  selectedLinks = 'project';
  linkOptions = ['project', 'document', 'design'];
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
      stageName: '',
      tasks: this.formBuilder.array([this.createTask()]),
      userId: this.userId,
    });
  }

  createTask(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: '',
      dueDate: Date,
      application: [],
      links: [],
      assignee: '',
    });
  }

  addTask(): void {
    const tasks = this.form.get('tasks') as FormArray;
    tasks.push(this.createTask());
  }

  get taskControls() {
    return (this.form.get('tasks') as FormArray).controls;
  }

  onApplicationChange() {
    if (!this.applications.includes(this.selectedApplication)) {
      this.applications.push(this.selectedApplication);
    }
  }
  removeApplication(name: any) {
    if (this.applications.includes(name)) {
      this.applications = this.applications.filter(
        (item: any) => item !== name
      );
    }
  }
  onLinkChange() {
    if (!this.links.includes(this.selectedLinks)) {
      this.links.push(this.selectedLinks);
    }
  }
  removeLink(name: any) {
    if (this.links.includes(name)) {
      this.links = this.links.filter((item: any) => item !== name);
    }
  }

  onDateChange(event: any): void {
    this.selectedDate = event.value;
  }

  closePopup() {
    this.popupService.closeCreatePopup();
  }
  submit(): void {
    let stage = this.form.getRawValue();
    stage.tasks[0].dueDate = this.selectedDate;
    stage.tasks[0].application = this.applications;
    stage.tasks[0].links = this.links;
    if (
      stage.tasks[0].name === '' ||
      stage.tasks[0].description === '' ||
      stage.tasks[0].dueDate === '' ||
      stage.stageName === '' ||
      stage.tasks[0].assignee === '' ||
      stage.tasks[0].application.length === 0 ||
      stage.tasks[0].links.length === 0
    ) {
      Swal.fire('Error', 'Please mention all the fields.', 'error');
    } else {
      this.http.post('http://localhost:5000/task', stage).subscribe(
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
    console.log(stage);
  }

  submit2(): void {
    let updateStage = this.form.getRawValue();
    let stage = this.stage;
    stage.tasks = stage.tasks.concat(updateStage.tasks);
    stage.tasks[1].dueDate = this.selectedDate;
    stage.tasks[1].application = this.applications;
    stage.tasks[1].links = this.links;
    if (
      stage.tasks[1].name === '' ||
      stage.tasks[1].description === '' ||
      stage.tasks[1].dueDate === ''
    ) {
      Swal.fire('Error', 'Please mention all the fields.', 'error');
    } else {
      this.http
        .put(`http://localhost:5000/task/${this.stage._id}`, stage)
        .subscribe(
          (response) => {
            this.closePopup();
            console.log('Task created:', response);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    }
  }

  isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }
}
