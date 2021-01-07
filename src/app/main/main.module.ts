import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { TablesModule } from '../tables/tables.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormModule } from '../form/form.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatToolbarModule,
    FormsModule,
    TablesModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    FormModule
  ],
  exports: [MainComponent],
})
export class MainModule {}
