
export interface LaplaceI{

}
export class Clasificacion {
  laplaceC_S(data:LaplaceI[], clases:string[]) {
    let count;
    data.forEach(element => {

    });
    const totalclas = clases.length;
    let total = 0;
    for(let i=0;i<data.length;i++){
      if(data.toString[i] == "true"){
        total++;
      }
    }
    let laplace = count+1/total + totalclas;
  }
  laplaceS_S(data:LaplaceI[], clases:string[]){
    let count;
    data.forEach(element => {

    });
    const total = data.length;
    let laplace = count/total;
  }

  probDensidad(mean: number, std: number, x: number) {
    const y2 = -((Math.pow(x - mean, 2) / 2) * Math.pow(mean, 2));
    return 1 / (std * Math.sqrt(2 * Math.PI), Math.pow(2.71828, y2));
  }

  devStd(data:number[]){
    let varianza = 0;
    let media = 0;
    data.forEach(element => {
      media += element;
    });
    media = media/data.length;
    data.forEach(element => {
      varianza += Math.pow((element-media),2)
    });
    varianza = varianza/data.length;
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
  static anchosIguales(arr: number[], bins: number) {
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
class Validacion {
  simple(data:number[],y1:number,y1_2:number) {
    let MSE= Math.pow((y1-y1_2),2);
    let n = data.length;
    let suma = 0;
    data.forEach(element => {
      suma += element;
    });
    return suma*MSE/n;
  }

  cruzada(data:number[]) {
    let k = data.length;
    let suma = 0;
    data.forEach(element => {
      suma += element;
    });
    return suma/k;
  }
}
class Evaluación {
  //confusion(arr:number[],TP:number,TN:number) {}
  precision(arr:number[],TP:number,FP:number) {
    const total=arr.length;
    const Acc = TP/(TP + FP);
    return Acc;
  }
  exhaustividad(arr:number[],TP:number,FN:number) {
    const total=arr.length;
    const Acc = TP/(TP + FN);
    return Acc;
  }
  f1(arr:number[],precisionF: number, recall:number) {
    this.precision(arr,precisionF,recall);//
    const total = 2 * (precisionF*recall)/(precisionF+recall);
    return total;
  }
  accuracy(arr:number[],TP:number,TN:number) {
    const total=arr.length;
    const Acc = TP+TN /total;
    return Acc;
  }
}
