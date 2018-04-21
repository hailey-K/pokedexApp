$(document).ready(function () {
    init();
    initDB();
    PageHomeshow();
   // $("#HomePage").on("pageshow", PageHomeshow);

});
function initDB(){
    try{
        DB.CreateDatabase();
        if (db) {
            console.info("Creating Tables...");
            DB.CreateTables();
        }
        else{
            Console.error("Error: Cannot create tables: Database does not exist!");
        }
    } catch(e){
        Console.error("Error: (Fatal) Error in initDB(). Can not proceed.");
    }
}
function init() {

}
function PageHomeshow()
{
    GetPokedex();
}