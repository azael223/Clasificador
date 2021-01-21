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

    // if (tipeAtt.continuos && tipeAtt.continuos.length > 0) {
    //   if (data.clasificacion === 'FD') {
    //   } else {
    //     column.forEach((element: number[], index) => {
    //       console.log(
    //         Discretizacion.anchosIguales(
    //           element,
    //           transformedData.clases.length
    //         ),
    //         'densidad ' + index
    //       );
    //     });
    //   }
    // }

  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
