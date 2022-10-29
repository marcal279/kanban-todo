import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Task } from '../../interfaces/task';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskUtilityComponent } from '../task-utility/task-utility.component';
import { TaskService } from '../../shared/task/task.service';

import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Observable, BehaviorSubject } from 'rxjs';

const getObservable = (collection: AngularFirestoreCollection<Task>) =>{
  const subject = new BehaviorSubject<Task[]>([]);
  collection.valueChanges({idField: 'tid'}).subscribe((val:Task[]) => {
    subject.next(val);
  });
  return subject;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  created = getObservable(this.store.collection('created')) as Observable<Task[]>;
  inProgress = getObservable(this.store.collection('inProgress')) as Observable<Task[]>;
  completed = getObservable(this.store.collection('completed')) as Observable<Task[]>;
  saved = getObservable(this.store.collection('saved')) as Observable<Task[]>;

  constructor(
    private dialog: MatDialog, 
    private store:AngularFirestore, 
    private taskService: TaskService
  ) {  }

  editTask(task: Task):void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '30rem';
    dialogConfig.data = {
      title: 'Update',
      task: task
    }
    //alert(JSON.stringify(task));

    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any)=>{
      // alert('update dialog closed');
    })
  }

  drop(event: CdkDragDrop<Task[]|null>):void {
    if (event.previousContainer===event.container) return;
    if (!event.previousContainer.data || !event.container.data) return;
    
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(()=>{
      const promise = Promise.all([
        this.taskService.switchLanes(event.previousContainer.id, event.container.id, item),
        // this.taskService.updateStatus(this.taskService.getStatus(item.status), item)
      ])
      return promise
    });

    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    // todo on drop change status of task
  }

  createTask(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '30rem';
    dialogConfig.data = {
      title: 'Create',
      task: this.taskService.generateNewTask()
    }

    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any)=>{
      // alert('create dialog closed')
    })
  }

  ngOnInit(): void {
  }

}
