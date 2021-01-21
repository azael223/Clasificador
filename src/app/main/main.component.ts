import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormComponent, Data } from '../form/form.component';
import { Clasificacion, Discretizacion } from '../../lib/funciones';
import { Dataset } from 'src/lib/Dataset';

export interface ColumnI {
  id: number;
  atributos: any[];
  type: string;
  clases?: string[];
}
export interface DatasetI {
  clases: string[];
  data: {
    columnas: ColumnI[];
    clases: string[];
  };
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private _dialog: MatDialog) {}

  private onDestroy = new Subject<any>();

  ngOnInit(): void {}

  openDialog() {
    const dialog = this._dialog.open(FormComponent, {
      width: '800px',
    });
    dialog
      .afterClosed()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data: Data) => {
        if (data) {
          this.entrenarClasificador(data);
        }
      });
  }

  entrenarClasificador(data: Data) {
    let indexClase = data.indexClase === 'F' ? data.datasetExt[0].length : 1;
    const transformedData = Dataset.extraerClase(data.datasetExt, indexClase);
    const tipeAtt = Dataset.identificarData(transformedData.data.atributos);
    let mainData: DatasetI = {
      clases: transformedData.clases,
      data: { columnas: tipeAtt, clases: transformedData.data.clases },
    };
    console.log(mainData, 'Data chingona');
    mainData.data.columnas.forEach((column, index) => {
      if (data.clasificacion === 'AI') {
        if (column.type === 'C') {
          column.atributos.forEach((col) => {
            mainData.data.columnas[index] = Discretizacion.anchosIguales(
              column,
              mainData.clases.length
            );
          });
        }
      }
    });
    console.log(mainData, 'Data chingona');
    const laplaceData = Clasificacion.laplace(mainData, true);
    console.log(laplaceData);
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
