module.exports = {
  "greeting": prompt("Who shall you greet?", "world", function (who) {
    return "Hello, " + who
  }),
  "filename": __filename,
  "qa-control-version": prompt("Versión de qa-control a utilizar?", "0.0.4", function (ver) {
        return "Utilizando " + ver;
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