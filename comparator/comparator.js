"use strict";

function screenCreator(){
    var html=jsToHtml.html;
    function trier(checkerId,numberToCheckId,operatorsId,conditionId,compareButtonId,answerId,opts){
        var number=html.p({id:checkerId},[
            html.input({id:numberToCheckId,value:""}),
            html.select({id:operatorsId},),
            html.input({id:conditionId},),
            html.button({id:compareButtonId},),
            html.span({id:answerId},)
        ]).create();
    }
    trier('number','number-to-check','number-operator','number-condition','number-compare-button','number-answer');
    trier('string','string-to-check','string-operator','string-condition','string-compare-button','string-answer');
    trier('dates','date-to-check','date-operator','value-condition','date-compare-button','date-answer');
}