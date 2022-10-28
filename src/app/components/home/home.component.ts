import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskUtilityComponent } from '../task-utility/task-utility.component';
import { Task } from '../../interfaces/task';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  findInList(taskList: Task[], task: Task): number{
    var localIndex = -1;
    taskList.forEach((t, index)=>{
      if(t.tid==task.tid) localIndex = index;
    })
    return localIndex;
  }

  createdTasks: Task[] = [          //temporary
    {
      tid: 1,
      title: 'Complete Kanban Todo',
      created: new Date(),
      priority: 'Medium',
      status: 'Created'
    },
    {
      tid: 2,
      title: 'Start other work',
      desc: 'Stop procrastinating on literally everything else',
      created: new Date(),
      priority: 'Medium',
      status: 'Created'
    },
    {
      tid: 3,
      title: 'Task 3',
      created: new Date(),
      priority: 'High',
      status: 'Created'
    },
    {
      tid: 4,
      title: 'Low Priority',
      created: new Date(),
      priority: 'Low',
      status: 'Created'
    },
  ]
  inProgressTasks: Task[] = []
  completedTasks: Task[] = []
  savedTasks: Task[] = []

  constructor(private dialog: MatDialog) {  }




  taskIndex!: number;
  editTask(taskList: Task[], task: Task):void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '30rem';
    dialogConfig.data = {
      title: 'Update',
      task: task
    }
    //alert(JSON.stringify(task));

    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any)=>{
      if(!result) return;
      
      // todo edit not working
      switch(result.task.status){
        case 'Created': {
          this.taskIndex = this.findInList(this.createdTasks,task);

          if(result.delete){
            this.createdTasks.splice(this.taskIndex, 1);
          } else{ // update 
            this.createdTasks[this.taskIndex] = task;
          }
          break;
        }
        case 'In Progress': {
          this.taskIndex = this.findInList(this.inProgressTasks,task);

          if(result.delete){
            this.inProgressTasks.splice(this.taskIndex, 1);
          } else{ // update 
            this.inProgressTasks[this.taskIndex] = task;
          }
          break;
        }
        case 'Completed': {
          this.taskIndex = this.findInList(this.completedTasks,task);

          if(result.delete){
            this.completedTasks.splice(this.taskIndex, 1);
          } else{ // update 
            this.completedTasks[this.taskIndex] = task;
          }
          break;
        }
        case 'Saved': {
          this.taskIndex = this.findInList(this.savedTasks,task);

          if(result.delete){
            this.savedTasks.splice(this.taskIndex, 1);
          } else{ // update 
            this.savedTasks[this.taskIndex] = task;
          }
          break;
        }
        case undefined: {
          // on cancel
          break;
        }
        default: {
          alert('Error in dialog return')
          break;
        }
      }

      // var taskIndex = -1;
      // focusList.forEach((el, index)=>{if(el.tid==result.task.id) taskIndex = index;})
      
      // if(result.delete){
      //   focusList.splice(taskIndex, 1);
      //   alert('index: '+taskIndex+' list: '+JSON.stringify(focusList));
      // }
      // else{
      //   focusList[taskIndex] = result.task;
      // }

    })
  }  //todo to be completed

  drop(event: CdkDragDrop<Task[]>):void {
    if (event.previousContainer===event.container) return;
    if (!event.container.data || !event.previousContainer.data) return;

    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    // todo on drop change status of task
  }

  createTask(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '30rem';
    dialogConfig.data = {
      title: 'Create',
      task: {
        tid: 199,
        title: '',
        desc: '',
        created: new Date(),
        priority: 'High',
        status: 'Created'
      }
    }

    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any)=>{
      if(!result) return;

      switch(result.task.status){
        case 'Created': {
          this.createdTasks.push(result.task)
          break;
        }
        case 'In Progress': {
          this.inProgressTasks.push(result.task);
          break;
        }
        case 'Completed': {
          this.completedTasks.push(result.task)
          break;
        }
        case 'Saved': {
          this.savedTasks.push(result.task)
          break;
        }
        case undefined: {
          // on cancel
          break;
        }
        default: {
          alert('Error in dialog return')
          break;
        }
      }

    })
  }

  ngOnInit(): void {
  }

}
