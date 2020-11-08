

type SQLstring = 'SELECT *'|'UPDATE table SET field = value'|'etc...'|`${SQLstring}${string}`;

function query(sql:SQLstring, parameters?:any[]){
    console.log('executing', sql, 'with', parameters);
}

function quote<T>(value:T):SQLstring{
    var text:string = value==null?'null':
        typeof value == "number" && !isNaN(value)?value.toString():
        "'"+value.toString().replace("'","''")+"'";
    return text as SQLstring;
}

function doStuff(){
    // @ts-expect-error: string is not SQLstring
    query('SELECT * from country')
    // Ok: The typecast is explicit
    query('SELECT * from country' as SQLstring)
    var parameters={
        internet:'AR',
        phoneCode:54
    }
    // Ok: The typecast is explicit, values are send separately:
    query('SELECT * from country WHERE internet = $1' as SQLstring, [parameters.internet])
    // @ts-expect-error: mixing string and SQLstring. FAIL!!
    query('SELECT * from country WHERE internet = ${parameters.internet}' as SQLstring)
}