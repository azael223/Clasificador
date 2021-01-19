import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormComponent, Data } from '../form/form.component';
import { Clasificacion, Discretizacion } from '../../lib/funciones';
import { Dataset } from 'src/lib/Dataset';

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
    console.log(transformedData, 'Data dividida');
    console.log(tipeAtt, 'Tipo Atributos');
    if (tipeAtt.continuos && tipeAtt.continuos.length > 0) {
      const columnContinuos = this.columnAtributos(tipeAtt.continuos);
      console.log(columnContinuos, 'Columna Continuos');
      if (data.clasificacion === 'FD') {
      } else {
        columnContinuos.forEach((element: number[], index) => {
          console.log(
            Discretizacion.anchosIguales(
              element,
              transformedData.clases.length
            ),
            'densidad ' + index
          );
        });
      }
    }
    if (tipeAtt.discretos && tipeAtt.discretos.length > 0) {
      const columnDiscretos = this.columnAtributos(tipeAtt.discretos);
      console.log(columnDiscretos, 'Columna Discreta');
    }
  }

  columnAtributos(arr: any[][]) {
    const length = arr[0].length;
    let atributos = [];
    for (let i = 0; i < length; i++) {
      let column = [];
      arr.forEach((element: []) => {
        column.push(element[i]);
      });
      atributos.push(column);
    }
    return atributos;
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
