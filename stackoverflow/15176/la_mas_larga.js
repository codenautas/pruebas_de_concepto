function buscaPalabraMasLarga(s) {
  palabra_mas_grande = ""
  palabras = s.split(" ")
  palabras.forEach(function(palabra){
  if (palabra.length > palabra_mas_grande.length){
       palabra_mas_grande = palabra
   };
  });
  return palabra_mas_grande 
};

alert( buscaPalabraMasLarga("The quick brown fox jumped over the lazy dog"));