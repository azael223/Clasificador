export class Dataset {
  static identificarData(data: string[][]) {
    let continuos = [];
    let discretos = [];
    data.forEach((row: string[]) => {
      let isContinuo = true;
      row.some((element: string) => {
        if (Number(element)) {
          isContinuo = true;
        } else {
          isContinuo = false;
          return;
        }
      });
      if (isContinuo) {
        let dataContinuo: number[] = [];
        row.forEach((element) => {
          dataContinuo.push(Number(element));
        });
        continuos.push(dataContinuo);
      } else {
        discretos.push(row);
      }
    });

    return { continuos, discretos };
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
