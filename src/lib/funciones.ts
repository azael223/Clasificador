import { ColumnI, DatasetI } from '../app/main/main.component';

export class Discretizacion {
  private static media(arr: number[]) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  static densidad(arr: number[], att: number) {
    const media = this.media(arr);
    const std = this.devStd(arr, media);
    return this.probDensidad(media, std, att);
  }

  private static probDensidad(media: number, std: number, x: number) {
    const y2 = -((Math.pow(x - media, 2) / 2) * Math.pow(media, 2));
    return 1 / (std * Math.sqrt(2 * Math.PI), Math.pow(2.71828, y2));
  }

  private static devStd(data: number[], media: number) {
    let varianza = 0;
    data.forEach((element) => {
      varianza += Math.pow(element - media, 2);
    });
    varianza = varianza / data.length;
    return Math.sqrt(varianza);
  }

  static frecIguales(arr: number[], bins: number) {
    arr = arr.sort((a, b) => a - b);
    let n = Math.ceil(arr.length / bins);
    console.log(n, 'n');
    const retArr = [];
    for (let i = 0; i < bins; i++) {
      const tempArr = [];
      for (let j = n * i; j < n * (i + 1); j++) {
        if (j >= arr.length) break;
        tempArr.push(arr[j]);
      }
      retArr.push(tempArr);
    }
    return retArr;
  }

  static anchosIguales(columns: ColumnI, bins: number) {
    const aClases = this._anchosIguales(columns.atributos, bins);
    let clases = [];
    columns.atributos.forEach((element) => {
      aClases.some((clase: number, index) => {
        if (element <= clase) {
          clases.push(index + 1 + '');
          return true;
        }
      });
    });
    let bin = [];
    for (let index = 0; index < bins; index++) {
      bin.push(index + 1 + '');
    }
    columns.clases = bin;
    columns.atributos = clases;
    return columns;
  }

  private static _anchosIguales(arr: number[], bins: number) {
    const min = Math.min.apply(Math, arr);
    const max = Math.max.apply(Math, arr);
    const w = (max - min) / bins;
    const retArr = [];
    for (let i = 0; i < bins; i++) {
      retArr.push(min + (i + 1) * w);
    }
    return retArr;
  }
}

export interface LaplaceI {
  atributos: string[][];
  clases: string[];
}
export class Clasificacion {
  private static colAttClases(data: DatasetI) {
    data.data.columnas.forEach((col, index) => {
      if (col.type === 'D') {
        let clases = [];
        col.atributos.forEach((att) => {
          if (!clases.some((clase) => att === clase)) {
            clases.push(att);
          }
        });
        data.data.columnas[index].clases = clases;
      }
    });
    return data;
  }
  static laplace(data: DatasetI, suavizado = false) {
    let claseCount = {};
    data.data.clases.some((clase: string) => {
      if (claseCount && claseCount[clase]) {
        claseCount[clase]++;
      } else {
        claseCount = { ...claseCount, [clase]: 1 };
      }
    });
    data = this.colAttClases(data);
    let laplaceData = this.laplacePrioriS(data, claseCount);
    Object.keys(claseCount).forEach((claseKey) => {
      claseCount[claseKey] = claseCount[claseKey] / data.data.clases.length;
    });
    return { data: laplaceData, priori: claseCount };
  }

  static laplaceCalc(laplace: any, data: DatasetI) {
    let clasificados = [];
    data.data.columnas[0].atributos.forEach((row, rowIndex) => {
      let priorisTotals = [];
      laplace.data.forEach((lap) => {
        let prioriTotal = 1;
        data.data.columnas.forEach((col, colIndex) => {
          prioriTotal =
            prioriTotal *
            lap.columns[colIndex][
              data.data.columnas[colIndex].atributos[rowIndex]
            ];
        });
        prioriTotal = prioriTotal * laplace.priori[lap.clase];
        priorisTotals.push(prioriTotal);
      });
      let clasificacion;
      let max = 0;
      priorisTotals.forEach((prioriTotal, index) => {
        if (prioriTotal > max) {
          max = prioriTotal;
          clasificacion = data.clases[index];
        }
      });
      clasificados.push(clasificacion);
    });
    return clasificados;
  }

  static laplacePrioriS(data: DatasetI, totalClases: any) {
    let prioris = [];
    data.clases.forEach((clase) => {
      let colPriori = {};
      data.data.columnas.forEach((col, colIndex) => {
        let att = {};
        col.atributos.forEach((atributo, index) => {
          if (data.data.clases[index] === clase) {
            if (att && att[atributo]) {
              att[atributo]++;
            } else {
              att = { ...att, [atributo]: 1 };
            }
          }
        });
        data.data.columnas[colIndex].clases.forEach((attkey) => {
          if (!att[attkey]) {
            att[attkey] = 0;
          }
          att[attkey] =
            (att[attkey] + 1) /
            (totalClases[clase] + data.data.columnas[colIndex].clases.length);
        });
        colPriori = { ...colPriori, [col.id]: att };
      });
      prioris.push({ clase: clase, columns: colPriori });
    });
    return prioris;
  }

  static laplacePriori(data: DatasetI, totalClases: any) {
    let prioris = [];
    data.clases.forEach((clase) => {
      let colPriori = {};
      data.data.columnas.forEach((col) => {
        let att = {};
        col.atributos.forEach((atributo, index) => {
          if (data.data.clases[index] === clase) {
            if (att && att[atributo]) {
              att[atributo]++;
            } else {
              att = { ...att, [atributo]: 1 };
            }
          }
        });
        Object.keys(att).forEach((attkey) => {
          att[attkey] = att[attkey] / totalClases[clase];
        });
        colPriori = { ...colPriori, [col.id]: att };
      });
      prioris.push({ clase: clase, columns: colPriori });
    });
    console.log(prioris);
  }
}
export class Validacion {
  static matrizConfusion(
    predicciones: string[],
    reales: string[],
    clases: string[]
  ) {
    let table = {};
    let totalRow = {};
    clases.forEach((clase1) => {
      totalRow = { ...totalRow, [clase1]: 0 };
      let tableRow = { [clase1]: {} };
      clases.forEach((clase2) => {
        tableRow[clase1] = { ...tableRow[clase1], [clase2]: 0 };
      });
      table = { ...table, [clase1]: tableRow[clase1] };
    });
    predicciones.forEach((prediccion, index) => {
      table[prediccion][reales[index]]++;
    });
    totalRow = { ...totalRow, Total: 0 };
    let finalTable = [];

    clases.forEach((clase, index) => {
      let total = 0;
      Object.keys(table[clase]).forEach((claseKey) => {
        total += table[clase][claseKey];
        totalRow[clase] += table[claseKey][clase];
      });
      table[clase] = { ...table[clase], Total: total };
      totalRow['Total'] += total;
      finalTable.push(table[clase]);
    });
    finalTable.push(totalRow);
    return finalTable;
  }

  simple(data: number[], y1: number, y1_2: number) {
    let MSE = Math.pow(y1 - y1_2, 2);
    let n = data.length;
    let suma = 0;
    data.forEach((element) => {
      suma += element;
    });
    return (suma * MSE) / n;
  }

  cruzada(data: number[]) {
    let k = data.length;
    let suma = 0;
    data.forEach((element) => {
      suma += element;
    });
    return suma / k;
  }
}
export class Evaluacion {
  static metricas(matriz, clases) {
    const recall = Evaluacion.recall(matriz, clases);
    const precision = Evaluacion.precision(matriz, clases);
    const f1 = Evaluacion.medidaF1(recall, precision);
    console.log(recall, 'recall');
    console.log(precision, 'precision');
    console.log(f1, 'medida f1');
    let ret = [];
    let prom = {
      categoria: 'Promedio',
      precision: 0,
      exhaustividad: '-',
      medidaF: 0,
      soporte: 0,
    };
    clases.forEach((clase) => {
      prom = {
        ...prom,
        precision: prom.precision + precision[clase],
        medidaF: prom.medidaF + f1[clase],
        soporte: prom.soporte + recall[clase],
      };
      ret.push({
        categoria: clase,
        precision: precision[clase],
        exhaustividad: '-',
        medidaF: f1[clase],
        soporte: recall[clase],
      });
    });
    ret.push(prom);
    return ret;
  }
  static medidaF1(recall: any, precision: any) {
    let ret = {};
    Object.keys(recall).forEach((clase) => {
      ret = {
        ...ret,
        [clase]:
          2 *
          ((recall[clase] * precision[clase]) /
            (recall[clase] + precision[clase])),
      };
    });
    return ret;
  }

  static recall(matriz: any[], clases: string[]) {
    let ret = {};
    clases.forEach((clase, index) => {
      ret = {
        ...ret,
        [clase]: matriz[index][clase] / matriz[matriz.length - 1][clase],
      };
    });
    return ret;
  }

  static precision(matriz: any[], clases: string[]) {
    let ret = {};
    clases.forEach((clase, index) => {
      ret = {
        ...ret,
        [clase]: matriz[index][clase] / matriz[index]['Total'],
      };
    });
    return ret;
  }

  static accuaracy(matriz: any[], clases: string[]) {
    let sum = 0;
    clases.forEach((clase, index) => {
      sum += matriz[index][clase];
    });
    return sum / matriz[matriz.length - 1]['Total'];
  }
}
