import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor() {}
  readFile(file: any) {
    return new Promise((res, err) => {
      if (!file) {
        err('No file');
      }
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (event) => res(event.target.result);
    });
  }

  csvToObject(file: File) {
    return new Promise((res, err) => {
      if (!file) {
        return err('Not File');
      }
      const objectData = [];
      this.readFile(file).then((data: string) => {
        const rowsData = data.split('\n');
        rowsData.forEach((data: string) => {
          const attData = data.split(new RegExp(';|,'));
          let attObject = {};
          attData.forEach((att: string, index) => {
            attObject = { ...attObject, [`att${index + 1}`]: att };
          });
          objectData.push(attObject);
        });
      });
      res(objectData);
    });
  }
}
