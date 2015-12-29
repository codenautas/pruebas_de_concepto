module.exports = {
  "greeting": prompt("A quién debo saludar?", process.env.USERNAME || process.env.USER, function (who) {
    return "Hola "+who+"!";
  }),
  "filename": __filename,
  "qa-control-version": prompt("Versión de qa-control a utilizar?", "0.0.4", function (ver) {
        return ver;
  })
}

/*
"qa-control": {
    "package-version": "0.0.2",
    "run-in": "server",
    "test-appveyor": true,
    "type": "app",
    "stage": "designing",
    "coverage": 70
  }: 
*/