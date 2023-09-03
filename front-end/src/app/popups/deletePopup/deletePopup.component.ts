import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { PopupService } from 'src/app/popup.service';

@Component({
  selector: 'delete-popup',
  templateUrl: './deletePopup.component.html',
  styleUrls: ['./deletePopup.component.css'],
})
export class DeletePopupComponent implements OnInit {
  @Input() taskId: string;
  constructor(private http: HttpClient, public popupService: PopupService) {}

  ngOnInit(): void {}

  closePopup() {
    this.popupService.closeDeletePopup();
  }

  deleteTask(): void {
    this.http.delete(`http://localhost:5000/task/${this.taskId}`).subscribe(
      () => {
        console.log('Task deleted successfully');
        this.closePopup();
        window.location.reload();
      },
      (error) => {
        if (error.status === 200) {
          console.log('Task deleted successfully');
          this.closePopup();
          window.location.reload();
        } else {
          console.error('Error deleting task:', error);
        }
      }
    );
  }
}
