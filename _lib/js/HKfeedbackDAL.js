var review={
    HKInsert:function(options,callback)
    {
        function txFunction(tx)
        {
            var sql="INSERT INTO review(businessName,typeId,reviewerEmail,reviewerComments,reviewDate,hasRating,rating1,rating2,rating3) VALUES (?,?,?,?,?,?,?,?,?);";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction()
        {
            console.info("success");
        }
        db.transaction(txFunction,errorHandler,successTransaction);
    },
    HKSelect:function(options,callback)
    {
        function txFunction(tx) {
            var sql = "SELECT * FROM review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    HKSelectAll:function(options, callback)
    {
        function txFunction(tx) {
            var sql = "SELECT * FROM review;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    HKUpdate: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE review SET businessName=?, typeId=?, reviewerEmail=?, reviewerComments=? , reviewDate=?, hasRating=?, rating1=? , rating2=?,rating3=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
    ,
    HKDelete:function (options, callback)
    {
        function txFunction(tx) {
        var sql = "DELETE FROM review WHERE id=?;";
        tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var type={
    HKselectAll:function(options, callback)
    {
        function txFunction(tx)
        {
            var sql="SELECT * FROM type;";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction()
        {
            console.info("success : select All");
        }
        db.transaction(txFunction,errorHandler,successTransaction);
    }
};