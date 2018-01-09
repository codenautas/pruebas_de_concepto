var XLSX = require('xlsx-style');


function Workbook() {
    if(!(this instanceof Workbook)){
        return new Workbook();
    }
    this.SheetNames = [];
    this.Sheets = {};
}

var wb=new Workbook();

var ws={};

var ahora=new Date('2010-03-12');
console.log('ahora', ahora.getTime(), ahora.getTime()/1000/60/60/24)

ws[XLSX.utils.encode_cell({c:1,r:1})]={t:'s', v:'¡texto libre!'};
ws[XLSX.utils.encode_cell({c:1,r:2})]={t:'n', v:12345.6789, z:'0'};
ws[XLSX.utils.encode_cell({c:1,r:3})]={t:'n', v:12345.6789, z:'0.00'};
ws[XLSX.utils.encode_cell({c:1,r:4})]={t:'n', v:12345.6789, z:'#,##0.00'};
ws[XLSX.utils.encode_cell({c:2,r:4})]={t:'n', v:0.089     , z:'#,##0.00'};
ws[XLSX.utils.encode_cell({c:3,r:4})]={t:'n', v:0.089     , z:'#,###.00'};
ws[XLSX.utils.encode_cell({c:1,r:5})]={t:'n', v:123456789 , z:'#,##0.00'};
ws[XLSX.utils.encode_cell({c:1,r:6})]={t:'b', v:1};
ws[XLSX.utils.encode_cell({c:1,r:7})]={t:'d', v:ahora, z:'dd/mm/yyyy'};

ws[XLSX.utils.encode_cell({c:0,r:0})]={t:'s', v:'título horizontal'};
ws[XLSX.utils.encode_cell({c:0,r:1})]={t:'s', v:'título vertical'};
ws['!ref']='A1:J19';
ws['!merges']=[
  {s:{r:0,c:0},e:{r:0,c:3}},
  {s:{r:1,c:0},e:{r:7,c:0}},
];
wb.SheetNames=['la_hoja1'];
wb.Sheets.la_hoja1=ws;

XLSX.writeFile(wb,'local-result.xlsx');