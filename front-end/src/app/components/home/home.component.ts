import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitter';
import { Store } from '@ngrx/store';
import { selectJwt } from '../../auth/selectors/auth.selectors';
import { debounceTime } from 'rxjs/operators';
import { PopupService } from 'src/app/popup.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

interface Task {
  name: string;
  description: string;
  dueDate: Date;
  stage: string;
  userId: string;
  _id: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message: any;
  selectedDate: any;
  userId: any;
  tasks: Task[] = [];
  todoTasks: Task[] = [];
  progressTasks: Task[] = [];
  completedTasks: Task[] = [];
  taskToUpdate: any = {};
  taskId: any;

  constructor(
    private http: HttpClient,
    private store: Store,
    public popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectJwt)
      .pipe(debounceTime(10))
      .subscribe((jwt) => {
        if (jwt) {
          this.getUser(jwt);
        } else {
          this.message = 'You are not logged in';
        }
      });

    setTimeout(() => {
      this.getUserTasks(this.userId);
    }, 500);
  }

  getUser(jwt: string): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`,
    });
    this.http
      .get('http://localhost:5000/user', {
        headers: headers,
        withCredentials: true,
      })

      .subscribe(
        (res: any) => {
          this.userId = res._id;
          console.log(res, 'srinivas');
          this.message = `Hi ${res.name}`;
          Emitters.authEmitter.emit(true);
        },

        (err) => {
          this.message = 'You are not logged in';
          Emitters.authEmitter.emit(false);
        }
      );
  }

  getUserTasks(userId: string): void {
    const apiUrl = `http://localhost:5000/task/${userId}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        // Handle the API response here
        this.tasks = response;

        for (let i = 0; i < this.tasks.length; i++) {
          if (this.tasks[i].stage === 'to-do') {
            console.log(this.tasks[i]);
            this.todoTasks.push(this.tasks[i]);
          } else if (this.tasks[i].stage === 'progress') {
            this.progressTasks.push(this.tasks[i]);
          } else if (this.tasks[i].stage === 'done') {
            this.completedTasks.push(this.tasks[i]);
          }
        }
        console.log('Tasks:', response);
      },
      (error) => {
        // Handle any errors here
        console.error('Error:', error);
      }
    );
  }

  openPopup1() {
    this.popupService.openCreatePopup();
  }

  openPopup2(task: any) {
    this.taskToUpdate = { ...task };
    this.popupService.openUpdatePopup();
  }

  openPopup3(taskId: any) {
    this.taskId = taskId;
    this.popupService.openDeletePopup();
  }

  onItemDrop(event: CdkDragDrop<Task[]>): void {
    const lastMovedTask: Task = event.item.data;
    if (event.previousContainer === event.container) {
      // Item moved within the same column
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const currentStage = event.container.id;

      this.taskStageUpdate(lastMovedTask, currentStage);
    }
  }
  taskStageUpdate(updatedTask: any, stage: any) {
    let taskStage = '';
    if (stage === 'cdk-drop-list-0') {
      taskStage = 'to-do';
    } else if (stage === 'cdk-drop-list-1') {
      taskStage = 'progress';
    } else {
      taskStage = 'done';
    }
    let toUpdateTask = {
      name: updatedTask.name,
      description: updatedTask.description,
      dueDate: updatedTask.dueDate,
      stage: taskStage,
      userId: updatedTask.userId,
    };
    const url = `http://localhost:5000/task/${updatedTask._id}`;
    return this.http.put(url, toUpdateTask).subscribe(
      (response) => {
        console.log('Task created:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
