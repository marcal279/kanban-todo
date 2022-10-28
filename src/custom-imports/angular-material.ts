import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
    ]
})

export class AngularMaterialImports{};