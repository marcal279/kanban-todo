import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../../interfaces/dialog-data';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

  backupTask!: Task;
  newTask: Task = {   // todo abstract to service function
    tid: 199,
    title: '',
    desc: '',
    created: new Date(),
    priority: 'High',
    status: 'Created'
  };
  currentTask!:Task;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<TaskDialogComponent>
  ) { }

  cancel(): void{
    this.currentTask = {...this.backupTask};
    this.dialogRef.close({task: this.currentTask});
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
