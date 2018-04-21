var db;
function errorHandler(tx, error){
    console.error("SQL error: " + tx + " (" + error.code + ") : " + error.message);
}
var DB= {
    CreateDatabase: function () {
        var shortName = "PokedexDB";
        var version = "1.0";
        var displayName = "DB for Pokedex app";
        var dbSize = 2 * 1024 * 1024;
        console.info("Creating database..");
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess() {
            console.info("Success : database created successfully.");
        }
    },
    CreateTables: function () {

        function txFunction(tx) {
            var sql;
            var option = [];

            sql = "CREATE TABLE IF NOT EXISTS Pokedex("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                +"Number INTEGER NOT NULL,"
                +"OfficialName VARCHAR(30) NOT NULL,"
                + "NickName VARCHAR(30) NOT NULL);";


            function successCreate() {
                console.info("Success: Create table: successful.");
            }

            tx.executeSql(sql, option, successCreate, errorHandler);


            function successInsert() {
                console.info("Success: Create table: friend successful.");
            }
            if(GetNumberOfPokedex()==0)
            {
                sql = "INSERT INTO Pokedex(Number,OfficialName,NickName) VALUES(1,'Bulbasaur','Fushigidane');";
                tx.executeSql(sql, option, successInsert, errorHandler);
            }
        }
        function successTransaction() {
            console.info("Success: Create tables transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    DropTables: function () {
        function txFunction(tx) {
            var sql = "DROP TABLE IF EXISTS Pokedex;";
            var options = [];

            function successDrop() {
                console.info("Success: Pokedex table dropped successfully");
            }

            tx.executeSql(sql, options, successDrop, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Drop tables transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
}