public form = this._fb.group(){};

class Clasificacion{
  form: any;
  constructor(){};
  laplace(){
    let alta, media, baja;
    const dataset = this.form.get('dataset').value;

    dataset.spice(0,2);
    if(dataset.spice != 0){
      //instrucciones por si es continuo
      dataset.count[0][1] =
    }else{
      if(dataset.count != " "){
         //instrucciones por si es discreto
      }
  };
  densidad(){};
  frecuencias_iguales(){};
  anchos_iguales(){};
}
class Validacion{
  constructor(){};
  simple(){};
  cruzada(){};
}
 class Evaluación{
  confusion(){};
  precision(){};
  exhaustividad(){};
  f1(){};
  accuracy(){};
}
