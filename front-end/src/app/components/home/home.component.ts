import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitter';
import { Store } from '@ngrx/store';
import { selectJwt } from '../../auth/selectors/auth.selectors';
import { debounceTime, concatMap } from 'rxjs/operators';
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
  application: string[];
  links: string[];
  assignee: string;
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
  taskId: any;
  stage: any;
  stages: any;
  deleteStage: any;
  deleteTask: any;
  isTask: any;
  stageId: any;
  stageNames: any = [];
  selectedTaskData: any;
  backgroundColors = ['#1C5A7C', '#106354', '#54117D', '#71441B'];

  constructor(
    private http: HttpClient,
    private store: Store,
    public popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectJwt)
      .pipe(debounceTime(5))
      .subscribe((jwt) => {
        if (jwt) {
          this.getUser(jwt);
        } else {
          this.message = 'You are not logged in';
        }
      });

    setTimeout(() => {
      this.getUserTasks(this.userId);
    }, 2000);
  }

  getUser(jwt: string): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`,
    });
    this.http
      .get('https://task-board-ddz4.onrender.com/user', {
        headers: headers,
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.userId = res._id;
          console.log('User:', res);
          this.message = `Hi ${res.name}`;
          Emitters.authEmitter.emit(true);
        },

        (err) => {
          this.message = 'You are not logged in';
          console.log(err);
          Emitters.authEmitter.emit(false);
        }
      );
  }

  getUserTasks(userId: string): void {
    const apiUrl = `https://task-board-ddz4.onrender.com/task/${userId}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.stages = response;
        for (let i = 0; i < this.stages.length; i++) {
          this.stageNames.push(this.stages[i].stageName);
        }
        console.log('Stages:', this.stages);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  openPopup1(stage: any = {}, boolean: any, stageId: any = '') {
    this.stage = stage;
    this.isTask = boolean;
    this.stageId = stageId;
    this.popupService.openCreatePopup();
  }

  openPopup2(stage: any, boolean: any, task: any, taskId: any = '') {
    this.stage = stage;
    this.deleteStage = boolean;
    this.deleteTask = task;
    this.taskId = taskId;
    this.popupService.openUpdatePopup();
  }

  onItemDrop(event: CdkDragDrop<Task[]>): void {
    if (!Array.isArray(event.previousContainer.data)) {
      event.previousContainer.data = [];
    }

    if (!Array.isArray(event.container.data)) {
      event.container.data = [];
    }

    const movedItemData = this.selectedTaskData;
    const previousStageName = event.previousContainer.id;
    const currentStageName = event.container.id;

    const previousStage = this.stages.find(
      (stage: any) => stage.stageName === previousStageName
    );
    const currentStage = this.stages.find(
      (stage: any) => stage.stageName === currentStageName
    );
    if (event.previousContainer === event.container) {
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

      this.taskStageUpdate(movedItemData, currentStage, previousStage._id);
    }
  }
  taskStageUpdate(task: any, stage: any, previousStageId: any) {
    let updateStage = stage;
    updateStage.tasks.push(task);
    this.http
      .delete(
        `https://task-board-ddz4.onrender.com/task/${previousStageId}/${task._id}`
      )
      .pipe(
        concatMap(() =>
          this.http.put(
            `https://task-board-ddz4.onrender.com/task/${stage._id}`,
            updateStage
          )
        )
      )
      .subscribe(
        () => {
          console.log('Task updated successfully.');
          this.getUserTasks(this.userId);
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
  }

  getRandomColorIndex() {
    return Math.floor(Math.random() * this.backgroundColors.length);
  }
  getAppColor(applicationName: string): string {
    if (applicationName === 'IOS') {
      return '#000000';
    } else if (applicationName === 'Desktop') {
      return '#CB9647';
    } else if (applicationName === 'Mobile') {
      return '#17A14E';
    }
    return '#4765B0';
  }
}
