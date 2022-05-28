/** @param {string} text */
function regex4search(text){
    return new RegExp(
        text.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        // .replace(/"/g,"\\b")
        .replace(/[ñÑ]/g,'(?:gn|nn?i?|[ñÑ])')
        .replace(/[cCçÇ]/g,'[cçÇ]')
        .replace(/[áÁàÀäÄãÃ]/gi,'[AáÁàÀäÄãÃ]')
        .replace(/[éÉèÈëË]/gi,'[EéÉèÈëË]')
        .replace(/[íÍìÌïÏ]/gi,'[IíÍìÌïÏ]')
        .replace(/[óÓòÒöÖõÕ]/gi,'[OóÓòÒöÖõÕ]')
        .replace(/[úÚùÙüÜ]/gi,'[UúÚùÙüÜ]')
        .replace(/a/gi,'[AáÁàÀäÄãÃ]')
        .replace(/e/gi,'[EéÉèÈëË]')
        .replace(/i/gi,'[IíÍìÌïÏ]')
        .replace(/o/gi,'[OóÓòÒöÖõÕ]')
        .replace(/u/gi,'[UúÚùÙüÜ]')
        // .replace(/\s+/g,'.*\\s+.*') mas estricto, exige el espacio
        .replace(/\s+/g,'.*')
    , 'i');
}

module.exports = {regex4search}