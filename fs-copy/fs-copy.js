const fs=require('fs-extra');

/*
mkdir this
mkdir this\that
echo content>this\that\file.txt
mkdir t:\temp\this
*/

fs.copy('./this', 't:/temp/this',{recursive:true});


