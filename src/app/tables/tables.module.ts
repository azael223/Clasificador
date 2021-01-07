import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [TablesComponent],
  imports: [CommonModule, TablesRoutingModule, MatTableModule],
  exports: [TablesComponent],
})
export class TablesModule {}
