    var url = require('url');
    var urlString='https://this.com/status?name=ryan'
    var parseObj= new url.URL(urlString);

    console.log(urlString);
    var params = parseObj.searchParams;
    console.log(params);

        
    var urlString='/status?name=ryan'
    var parseObj= url.parse(urlString,true);

    console.log(parseObj);
    var params = parseObj.query;
    console.log(params);