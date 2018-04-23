$(document).ready(function () {
    init();
    initDB();
    PageHomeshow();
    $("#AddPokemon").on("pageshow", PageAddshow);
    $("#Edit").on("pageshow", PageEditshow);
   // $("#EditFixed").on("pageshow", PageEditFixedshow);
    $("#Update").on("click", btnUpdate_click);
    $("#Delete").on("click", btnDelete_click);
    $("#o_pocky").on("click", btn_o_pocky);
    $("#u_pocky").on("click", btn_u_pocky);
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
    $("#ClearDatabase").on("click", btnClear_click);
    $("#Save").on("click", btnSave_click);
}
function PageHomeshow()
{
    GetPokedex();
}
function PageEditshow()
{
    ShowCurrentPokeMon();

}
function PageEditFixedshow()
{
    ShowCurrentFixedPokeMon();
}
function PageAddshow()
{
    var numberOfPokemons = GetNumberOfPokedex();
    if(numberOfPokemons == 0 || numberOfPokemons == null)
    {
        numberOfPokemons = 151;
    }
    else
    {
        numberOfPokemons+=151;
    }
    document.getElementById("Number").value = numberOfPokemons;
}
function btnClear_click() {
    ClearDatabase();
}
function btnSave_click(){
    AddPokemon();
}
function btnUpdate_click()
{
    UpdatePokeMon();
}
function btnDelete_click()
{
    DeletePokeMon();
}
function btn_o_pocky()
{
    GetPokedex();
}
function btn_u_pocky()
{
    GetUserPokedex();
}