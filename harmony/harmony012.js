"use strict";

(function objetosPlanosAbreviados(){
	var uno=1;
	var alfa='a';
	console.log('objetosPlanosAbreviados');
	try{
		console.log('anda', eval("({uno, alfa})"));
	}catch(err){
		console.log('no anda', err);
	}
})();

(function arrowFunction(){
	var lista = [1,2];
	console.log(lista.map(x => 2*x));
})();