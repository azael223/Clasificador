import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormComponent } from '../form/form.component';
import { Clasificacion } from '../../lib/funciones';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private _dialog: MatDialog) {}

  private onDestroy = new Subject<any>();

  ngOnInit(): void {
    console.log(
      Clasificacion.anchosIguales(
        [0,4,12,16,16,18,24,26,28],
        3
      ),
      'Anchos Iguales'
    );
  }

  openDialog() {
    const dialog = this._dialog.open(FormComponent, {
      width: '80vw',
    });
    dialog
      .afterClosed()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data) => {
        if (data) {
          console.log(data);
        }
      });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
