var tString = document.getElementById('string');
var tNumber = document.getElementById('number');
var tObject = document.getElementById('object');
var tSave = document.getElementById('save');
var tClear = document.getElementById('clear');

var obj = {'array':['uno', 'dos', 'tres'], 'objeto':{'a':'la a', b:'la b'}};

tSave.onclick = function(event) {
    localStorage.setItem('string', tString.value);
    localStorage.setItem('number', tNumber.value);
    localStorage.setItem('object', tObject.value);
};

tClear.onclick = function(event) {
    localStorage.clear();
    location.reload();
};

window.onload = function() {
    tString.value = localStorage.getItem('string');
    tNumber.value = localStorage.getItem('number');
    var object = localStorage.getItem('object') || JSON.stringify(obj);
    tObject.value = object;
};