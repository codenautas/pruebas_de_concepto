
var comparator={
    '=':function(valueToCheck,condition){return valueToCheck == condition;},
    '~':function(valueToCheck,condition){return valueToCheck.indexOf(condition)>=0;},
    '\u2205':function(valueToCheck,condition){return true;},//conjunto vacío
    '>':function(valueToCheck,condition){return (valueToCheck>condition)},
    '>=':function(valueToCheck,condition){return (valueToCheck>=condition)},
    '<':function(valueToCheck,condition){return (valueToCheck<condition)},
    '<=':function(valueToCheck,condition){return (valueToCheck<=condition)},
    'no-existe':function(valueToCheck,condition){ return 'no existe el operador'}
}

function numberComparator(){
    var valueToCheck=document.getElementById("numberToCheck").value;
    var condition=document.getElementById("numberCondition").value;
    var operator=(document.getElementById("numberOperator").value!="null")?document.getElementById("numberOperator").value:'no-existe';
    var isSatisfied=comparator[operator](valueToCheck,condition);
    document.getElementById("number-answer").textContent=isSatisfied;
}

function stringComparator(){
    var valueToCheck=document.getElementById("stringToCheck").value;
    var condition=document.getElementById("stringCondition").value;
    var operator=(document.getElementById("stringOperator").value!="null")?document.getElementById("stringOperator").value:'no-existe';
    var isSatisfied=comparator[operator](valueToCheck,condition);
    document.getElementById("string-answer").textContent=isSatisfied;
}

function dateComparator(){
    var valueToCheck=new Date(document.getElementById("dateToCheck").value);
    var condition=new Date(document.getElementById("dateCondition").value);
    var operator=(document.getElementById("dateOperator").value!="null")?document.getElementById("dateOperator").value:'no-existe';
    var isSatisfied=comparator[operator](valueToCheck,condition);
    document.getElementById("date-answer").textContent=isSatisfied;
}