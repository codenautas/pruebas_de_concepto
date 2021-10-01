class PartesDeFigura{

}

class Figura{
    constructor(public partes:PartesDeFigura[]){

    }
    area(){
        return "area de la Figura"
    }
    clonate(){
        return new Figura(this.partes);
    }
    tieneParte(parte:PartesDeFigura){
        return !!this.partes.filter(p=>p===parte).length;
    }
    filtrarPartes(discriminador:(parte:PartesDeFigura)=>boolean){
        return this.partes.filter(discriminador);
    }
}

class PartesDePoligono extends PartesDeFigura{

}

class Poligono extends Figura{
    constructor(public override partes:PartesDePoligono[]){
        super(partes);
    }
    lados(){
        return "el Polígono tiene lados"
    }
    override clonate(){
        return new Poligono(this.partes);
    }
    override tieneParte(parte:PartesDePoligono){
        return super.tieneParte(parte);
    }
}

class PartesDeCuadrado extends PartesDePoligono{}

class Cuadrado extends Poligono{
    override lados(){
        return "el Cuadrado tiene 4 lados"
    }
    lado(){
        return "el Cuadrado tiene un lado que tiene su medida"
    }
    override clonate(){
        return new Cuadrado(this.partes);
    }
}

function filtrarCuadrado(c:Cuadrado, p:PartesDeCuadrado){
    function discriminar(pc:PartesDeCuadrado){
        return pc===p;
    }
    var c2 = new Cuadrado([p]);
    if(c2.tieneParte(p) || !c.tieneParte(p)){
        return c2.filtrarPartes(discriminar);
    }
    var f = new Figura([p]);
    if(f.tieneParte(p) || !c.tieneParte(p)){
        return f.filtrarPartes(discriminar);
    }
}