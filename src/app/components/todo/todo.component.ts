import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskUtilityComponent } from '../task-utility/task-utility.component';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  
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
  ]
  inProgressTasks: Task[] = []
  completedTasks: Task[] = []
  savedTasks: Task[] = []

  constructor() { }

  editTask(taskList: String, task: Task):void {}  //todo to be completed

  drop(event: CdkDragDrop<Task[]>):void {
    if (event.previousContainer===event.container) return;
    if (!event.container.data || !event.previousContainer.data) return;

    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
  }

}
