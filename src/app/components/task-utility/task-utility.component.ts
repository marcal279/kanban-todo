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

  ngOnInit(): void {
  }

}
