import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatRadioModule } from '@angular/material/radio';
import { TablesModule } from '../tables/tables.module';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    NgxMatFileInputModule,
    MatRadioModule,
    TablesModule,
    MatDialogModule,
  ],
  exports: [FormComponent],
})
export class FormModule {}
