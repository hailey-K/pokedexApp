function GetPokedex()
{
    var  options=[];
    function callback(tx, results)
    {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {

            // both will work
            // var row = results.rows.item(i);
            var row = results.rows[i];

            console.info("Id: " + row['id'] +
                " Number : " + row['Number'] +
                " OfficialName : " + row['OfficialName'] +
                " NickName : " + row['NickName']);
            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] +">"+
                "<h3>Official Name : " + row['OfficialName'] + "</h3>" +
                "<div style='float:left; width:150px;'>"+
                "<img src='_lib/img/pokemonPics/"+row['id']+".png' width='100px'/> </div>"+
                "<p>Number : " + row['Number'] + "</p>" +
                "<p>Nick Name : " + row['NickName'] + "</p>" +
                "</a></li>";
        }

        var lv = $("#PokedexList");

        lv = lv.html(htmlCode);
        lv.listview("refresh"); // very important
        //attach event handler for each list items
        $("#PokedexList a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));

            //navigate to the detail page automatically
            //both will work.
            $(location).prop('href', '#Edit');

        }

    }
    pokedex.SelectAll(options,callback)
}
function GetNumberOfPokedex(numberOfPokerdex)
{
    var  options=[];
    var numberOfPokerdex;
    function callback(tx, results)
    {
        var htmlCode = "";
        numberOfPokerdex = results.rows.length;

    }
    pokedex.SelectAll(options,callback)
    return numberOfPokerdex;
}