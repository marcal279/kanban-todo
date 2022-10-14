import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FlexLayoutModule} from '@angular/flex-layout';
import { AngularMaterialImports } from '../custom-imports/angular-material';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { TaskUtilityComponent } from './components/task-utility/task-utility.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TaskUtilityComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    FlexLayoutModule,
    AngularMaterialImports,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
