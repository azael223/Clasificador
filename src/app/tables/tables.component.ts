import { Component, Input, OnInit } from '@angular/core';

interface MatrizColumn {
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

  @Input('matrizColumns') matrizColumns: MatrizColumn[] = [
    { title: 'Test', colDef: 'title1' },
    { title: 'Test 2', colDef: 'title2' },
    { title: 'Test 3', colDef: 'title3' },
  ];

  @Input('matrizData') matrizData: any[] = [
    { title1: 'aasd', title2: 'asdas', title3: 'asdas' },
    { title1: 'aasd', title2: 'asdas', title3: 'asdas' },
    { title1: 'aasd', title2: 'asdas', title3: 'asdas' },
  ];

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
