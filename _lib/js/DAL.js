var pokedex={
    SelectAll:function(options, callback)
    {
        function txFunction(tx) {
            var sql = "SELECT * FROM Pokedex;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
