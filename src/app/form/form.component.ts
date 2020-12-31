import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private _fb: FormBuilder) {}

  public form = this._fb.group({
    dataset: new FormControl('', [Validators.required]),
    datasetExt: new FormControl('', []),
    readType: new FormControl('MD', [Validators.required]),
    validationType: new FormControl('VS', []),
    inDis: new FormControl('', [Validators.required]),
  });

  private onDestroy = new Subject<any>();

  readTypeChange() {
    const readType = this.form.get('readType');
    console.log(readType.value)
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

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
