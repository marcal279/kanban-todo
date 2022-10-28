import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialImports } from '../custom-imports/angular-material';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TaskUtilityComponent } from './components/task-utility/task-utility.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskUtilityComponent,
    TaskDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    FlexLayoutModule,
    AngularMaterialImports,
    DragDropModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
