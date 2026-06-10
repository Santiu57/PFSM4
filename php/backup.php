<?php

/*
    backup.php: función para hacer backup de la base de datos.
    Se llama después de cada operación de inserción, actualización o eliminación.
    Uso de shell_exec para ejecutar mysqldump y guardar el resultado en un archivo .sql.
    Para evitar problemas de mysqldump no encontrado en PATH
*/
function backupDatabase()
{
    $mysqldump = 'C:\\xampp\\mysql\\bin\\mysqldump.exe';

    $cmd = "\"$mysqldump\" -u root cafeteria";

    $sql = shell_exec($cmd);

    file_put_contents(
        __DIR__ . '/../database/cafeteria.sql',
        $sql
    );
}