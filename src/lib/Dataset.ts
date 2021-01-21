import { ColumnI, DatasetI } from '../app/main/main.component';

export class Dataset {
  static identificarData(data: string[][]) {
    let cols: ColumnI[] = [];
    for (let index = 0; index < data[0].length; index++) {
      let mCol: ColumnI = { id: index, type: 'C', atributos: [] };
      data.some((col) => {
        if (Number(col[index])) {
          mCol.type = 'C';
        } else {
          mCol.type = 'D';
          return true;
        }
      });
      data.some((col) => {
        if (mCol.type === 'C') {
          mCol.atributos.push(Number(col[index]));
        } else {
          mCol.atributos.push(col[index]);
        }
      });
      cols.push(mCol);
    }

    return cols;
  }

  static extraerClase(data: string[][], index: number) {
    let clases = [];
    let atributos = [];
    data.forEach((element: string[]) => {
      clases.push(element[index - 1]);
      let atributo = element;
      atributo.splice(index - 1, 1);
      atributos.push(atributo);
    });
    let newData = { clases, atributos };
    clases = [...new Set(clases)];
    return { data: newData, clases: clases };
  }
}
