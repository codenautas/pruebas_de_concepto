#!/usr/bin/env node
 
var program = require('commander');

function add(val, memo) {
	memo.push(val);
	return memo;
}

program
  .version('0.0.1')
  //.command('procesar <dir> [otherDirs...]')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble, mantecoso]', 'marble', 'mantecoso')
  .option('-a, --add [value]', 'A repeatable value', add, [])
//  .action(function (dir, otherDirs) {
//      console.log('procesando %s', dir);
//      if (otherDirs) {
//        otherDirs.forEach(function (oDir) {
//          console.log('procesando %s', oDir);
//        });
//      }
//  })
  .parse(process.argv);


 if (!process.argv.slice(2).length) {
   program.help();
   // es lo mismo que:
   //   program.outputHelp();
   //   process.exit(1);
 }

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');

console.log('  - %s cheese', program.cheese);

console.log('  - add: ', program.add);
