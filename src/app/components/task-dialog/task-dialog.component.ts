import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { DialogData } from '../../interfaces/dialog-data';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../shared/task/task.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

  backupTask!: Task;
  newTask: Task = this.taskService.generateNewTask();
  currentTask!:Task;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private store: AngularFirestore,
    private taskService: TaskService
  ) { }

  getLane(Lane: string) : string{
    switch(Lane){
      case 'In Progress':
        return 'inProgress';
      case 'Completed':
        return 'completed';
      case 'Saved':
        return 'saved';
      default:
        return 'created';
    }
  }

  create(task: Task): void{
    this.taskService.createTask(task);
    this.dialogRef.close('Created task: '+task.title);
  }

  cancel(): void{
    this.currentTask = {...this.backupTask};
    this.dialogRef.close({task: this.currentTask});
  }

  delete(task: Task): void{
    this.taskService.deleteTask(task);
    this.dialogRef.close('Deleted task: '+task.title);
  }

  update(task: Task): void{
    this.taskService.updateTask(task);
    this.dialogRef.close('Updated task: '+task.title);
  }

  mainAction(task: Task){
    if(this.data.title=='Create'){
      this.create(task);
    }
    else{
      if(this.currentTask.status==this.backupTask.status) this.update(task);
      else this.taskService.switchLanes(this.getLane(this.backupTask.status), this.getLane(this.currentTask.status), task)
    }
  }

  ngOnInit(): void {
    if(this.data.title=='Create'){
      this.currentTask = {...this.newTask};
    }
    else if(this.data.title=='Update'){
      this.backupTask = {...this.data.task};
      this.currentTask = {...this.data.task};
    }
  }

}
