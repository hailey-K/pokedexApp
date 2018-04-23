var db;
function errorHandler(tx, error){
    console.error("SQL error: " + tx + " (" + error.code + ") : " + error.message);
}
var DB= {
    HKCreateDatabase: function () {
        var shortName = "AvengersDB";
        var version = "1.0";
        var displayName = "DB for AvengersDB app";
        var dbSize = 2 * 1024 * 1024;
        console.info("Creating database..");
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess() {
            console.info("Success : database created successfully.");
        }
    },
    HKCreateTables: function () {

        function txFunction(tx) {
            var sql = "DROP TABLE IF EXISTS type;"
            var optionsReview = [];
            var optionType = [];

            function successDrop() {
                console.info("Success: drop tables");
            }

            tx.executeSql(sql, optionType, successDrop, errorHandler);
            console.info("Creating table: type");
            sql = "CREATE TABLE IF NOT EXISTS type("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";

            // var options = [];

            function successCreate() {
                console.info("Success: Create table: successful.");
            }

            tx.executeSql(sql, optionType, successCreate, errorHandler);

            console.info("Inserting tables: type");

            sql = "INSERT INTO type(name) VALUES('Canadian');";

            // var options = [];

            function successInsert() {
                console.info("Success: Create table: friend successful.");
            }
            tx.executeSql(sql, optionType, successInsert, errorHandler);
            sql = "INSERT INTO type(name) VALUES('Asian');";
            tx.executeSql(sql, optionType, successInsert, errorHandler);
            sql = "INSERT INTO type(name) VALUES('Others');";
            tx.executeSql(sql, optionType, successInsert, errorHandler);

            console.info("Creating tables: review");
            sql = "CREATE TABLE IF NOT EXISTS review("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "businessName VARCHAR(30) NOT NULL,"
                + "typeId INTEGER NOT NULL,"
                + "reviewerEmail VARCHAR(30),"
                + "reviewerComments TEXT,"
                + "reviewDate DATE,"
                + "hasRating VARCHAR(1),"
                + "rating1 INTEGER,"
                + "rating2 INTEGER,"
                + "rating3 INTEGER,"
                + "FOREIGN KEY(typeId) REFERENCES type(id));";

            tx.executeSql(sql, optionsReview, successCreate, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Create tables transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    HKDropTables: function () {
        /*
        function txFunction(tx) {
            var sql="DROP TABLE IF EXISTS review;";
            var options=[];
            function SuccessDrop() {
                console.info("Success : tables dropped");
            }
            tx.executeSql(sql,options,SuccessDrop,errorHandler());

            sql=" DROP TABLE IF EXISTS type;";
            tx.executeSql(sql,options,SuccessDrop,errorHandler());
        }
        function successTransition()
        {
            console.info("success : Drop tables transaction success");
        }
        db.transaction(txFunction,errorHandler,successTransition);
    }
    */
        function txFunction(tx) {
            var sql = "DROP TABLE IF EXISTS review;";
            var options = [];

            function successDrop() {
                console.info("Success: review table dropped successfully");
            }

            tx.executeSql(sql, options, successDrop, errorHandler);

            sql = "DROP TABLE IF EXISTS type;";
            tx.executeSql(sql, options, successDrop, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Drop tables transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
}