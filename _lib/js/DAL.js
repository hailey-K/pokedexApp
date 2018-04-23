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
    },
    Select:function(options,callback)
    {
        function txFunction(tx) {
            var sql = "SELECT * FROM Pokedex WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    Insert:function(options,callback)
    {
        function txFunction(tx)
        {
            var sql="INSERT INTO Pokedex(Number,OfficialName,PicName,NickName) VALUES (?,?,?,?);";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction()
        {
            console.info("success");
        }
        db.transaction(txFunction,errorHandler,successTransaction);
    },
    Delete:function (options, callback)
    {
        function txFunction(tx) {
            var sql = "DELETE FROM Pokedex WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    Update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE Pokedex SET Number=?, OfficialName=?, PicName=?, NickName=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
var userPokedex={
    SelectAll:function(options, callback)
    {
        function txFunction(tx) {
            var sql = "SELECT * FROM UserPokedex;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    Insert:function(options,callback)
    {
        function txFunction(tx)
        {
            var sql="INSERT INTO UserPokedex(Number,OfficialName,PicName,NickName) VALUES (?,?,?,?);";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction()
        {
            console.info("success");
        }
        db.transaction(txFunction,errorHandler,successTransaction);
    },
    Select:function(options,callback)
    {
        function txFunction(tx) {
            var sql = "SELECT * FROM UserPokedex WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    Delete:function (options, callback)
    {
        function txFunction(tx) {
            var sql = "DELETE FROM UserPokedex WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
