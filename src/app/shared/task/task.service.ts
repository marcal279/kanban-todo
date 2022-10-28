import { Injectable } from '@angular/core';

import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Task } from '../../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  constructor(private store: AngularFirestore) { }

  generateNewTask(): Task{
    return {
      title: '',
      desc: '',
      created: new Date(),
      priority: 'High',
      status: 'Created'
    };
  }

  getCollection(task: Task): string{    //todo: check hashmap implementation for this and next funct
    switch(task.status){
      case 'In Progress': return 'inProgress';
      case 'Completed': return 'completed';
      case 'Saved': return 'saved';
      default: return 'created';
    }
  }

  getStatus(collection: string): string{
    switch(collection){
      case 'inProgress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'saved': return 'Saved';
      default: return 'Created'
    }
  }

  // CUD of CRUD
  //todo add read also here

  createTask(task: Task){
    const taskCollection = this.getCollection(task);
    this.store.collection(taskCollection).add(task);
  }

  updateTask(task: Task){
    const taskCollection = this.getCollection(task);
    this.store.collection(taskCollection).doc(task.tid).update(task);
  }

  deleteTask(task: Task){
    const taskCollection = this.getCollection(task);
    this.store.collection(taskCollection).doc(task.tid).delete();
  }

  // extra

  switchLanes(oldLane: string, newLane: string, task: Task){
    this.store.firestore.runTransaction(()=>{
      const promise = Promise.all([
        this.store.collection(newLane).add(task),
        this.store.collection(oldLane).doc(task.tid).delete()
      ])
      return promise;
    })
  }

  updateStatus(newStatus: string, task: Task){
    task.status = newStatus
    this.updateTask(task);
  }

}
