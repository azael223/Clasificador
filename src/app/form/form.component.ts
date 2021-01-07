import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import * as Papa from 'papaparse';

import { takeUntil } from 'rxjs/operators';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface Data{
  datasetExt?:any[];
  dataset?:any[];
  validacion:string;
  inDis:number;
  clasificacion:string
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<FormComponent>
  ) {}

  public form = this._fb.group({
    dataset: new FormControl('', [Validators.required]),
    datasetExt: new FormControl('', []),
    readType: new FormControl('MD', [Validators.required]),
    validationType: new FormControl('VS', []),
    inDis: new FormControl('', [Validators.required]),
    classType: new FormControl('FI', [Validators.required])
  });

  private onDestroy = new Subject<any>();

  readTypeChange() {
    const readType = this.form.get('readType');
    console.log(readType.value);
    const dataExt = this.form.get('datasetExt');
    const validationType = this.form.get('validationType');
    if (readType.value === 'AE') {
      dataExt.setValidators(Validators.required);
      validationType.clearValidators();
    } else {
      validationType.setValidators(Validators.required);
      dataExt.clearValidators();
    }
  }
  performRequest() {
    console.log(this.form);
    const dataset = this.form.get('dataset').value;
    if (this.form.valid) {
      Papa.parse(dataset, {
        complete: this.transformData,
      });
    }
  }

  transformData(data) {
    let file:File
    if(this.form.get('datasetExt').value &&
      (this.form.get('readType').value === 'AE')){
      file = this.form.get('datasetExt').value;
    }else{
    }
    Papa.parse(file,{
      complete: (dataExt:any)=>{
        const dataSend:Data = {
          dataset: data,
          datasetExt: dataExt,
          inDis: this.form.get('inDis').value,
          validacion: this.form.get('validationType').value,
          clasificacion: this.form.get('classType').value
        }
        this.onNoClick(dataSend)
      }
    })
  }

  onNoClick(data?: any) {
    this._dialogRef.close(data);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
