import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Clasificacion } from '../../lib/funciones';
export interface MatrizColumn {
  title: string;
  colDef: string;
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {
  constructor() {}

  @ViewChild('table') table: MatTable<any>;

  public matrizColumns: MatrizColumn[] = [];
  public matrizData = [];
  @Input('matrizColumns') set cols(columns: MatrizColumn[]) {
    this.matrizColumns = columns;
    this.table.renderRows();
  }

  @Input('matrizData') set data(data: any[]) {
    this.matrizData = data;
    this.table.renderRows();
  }

  public displayedColumns = [];

  ngOnInit(): void {
    this.getDisplayedColumns();
  }

  getDisplayedColumns() {
    this.matrizColumns.forEach((col) => {
      this.displayedColumns.push(col.colDef);
    });
  }
}
