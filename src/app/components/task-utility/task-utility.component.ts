import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task-utility',
  templateUrl: './task-utility.component.html',
  styleUrls: ['./task-utility.component.css']
})
export class TaskUtilityComponent implements OnInit {
  @Input() task: Task|null = null;
  @Output() edit = new EventEmitter<Task>();

  constructor() { }

  getPriorityClass(){
    if(this.task){
      switch(this.task.priority){
        case 'High': return 'highPr';
        case 'Medium': return 'mediumPr';
        case 'Low': return 'lowPr';
      }
    }
    return ''
  }

  getDateFromTimestamp(dateStr: string): Date{
    var milli = Number(dateStr.substring(dateStr.indexOf('=')+1, dateStr.indexOf(','))) * 1000
    return new Date(milli)
  }

  getDateFromString(dateStr: string): Date{
    return new Date(dateStr)
  }

  ngOnInit(): void {
  }

}
