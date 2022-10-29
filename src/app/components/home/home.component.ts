import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Task } from '../../interfaces/task';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskUtilityComponent } from '../task-utility/task-utility.component';
import { TaskService } from '../../shared/task/task.service';

import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  // findInList(taskList: Task[], task: Task): number{
  //   var localIndex = -1;
  //   taskList.forEach((t, index)=>{
  //     if(t.tid==task.tid) localIndex = index;
  //   })
  //   return localIndex;
  // }

  created = this.store.collection('created').valueChanges({ idField: 'tid' }) as Observable<Task[]>;
  inProgress = this.store.collection('inProgress').valueChanges({ idField: 'tid' }) as Observable<Task[]>;
  completed = this.store.collection('completed').valueChanges({ idField: 'tid' }) as Observable<Task[]>;
  saved = this.store.collection('saved').valueChanges({ idField: 'tid' }) as Observable<Task[]>;

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
