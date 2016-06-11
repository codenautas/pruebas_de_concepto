<?php
header('Access-Control-Allow-Origin','*');

$estado=$_POST['estado'];

$sql="SELECT * FROM  tarjetas WHERE sw_activo='$estado'";

echo "sql:<br>".$sql;

echo "<select name = 'cod_tarj' style='border-color: #FF0000 #FF0000; border-width: 2px 2px; border-style: solid solid; font-size:8pt; color: #FF0000; letter-spacing; width:150px'>";
    echo "<option value = ''></option>"; 
        echo "<option value = ".'77'.">".'77'."_".'esta'."</option>";
echo "</select>";
?>
