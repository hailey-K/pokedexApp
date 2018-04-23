function    GetPokedex()
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
                " PicName : " + row['PicName'] +
                " NickName : " + row['NickName']);

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] +">"+
                "<h3>Official Name : " + row['OfficialName'] + "</h3>" +
                "<div style='float:left; width:150px;'>"+
                "<img src='_lib/img/pokemonPics/"+row['PicName']+".png' width='100px'/> </div>"+
                "<p>Number : " + row['Number'] + "</p>" +
                "<p>Nick Name : " + row['NickName'] + "</p>" +
                "</a></li>";

        }

        var lv = $("#PokedexList");
        lv = lv.html(htmlCode);
        lv.listview("refresh"); // very important

        var ulv = $("#PokedexUserList");
        ulv = ulv.html("");
        ulv.listview("refresh"); // very important


        //attach event handler for each list items
        $("#PokedexList a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            localStorage.setItem("URL","pokedex");
            //navigate to the detail page automatically
            //both will work.
            $(location).prop('href', '#Edit');
        }
    }
    pokedex.SelectAll(options,callback)
}
function    GetUserPokedex()
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
                " PicName : " + row['PicName'] +
                " NickName : " + row['NickName']);

                 htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] +">"+
                      "<h3>Official Name : " + row['OfficialName'] + "</h3>" +
                      "<div style='float:left; width:150px;'>"+
                      "<img src='_lib/img/pokemonPics/"+row['PicName']+".png' width='100px'/> </div>"+
                      "<p>Number : " + row['Number'] + "</p>" +
                      "<p>Nick Name : " + row['NickName'] + "</p>" +
                      "</a></li>";
        }

        var ulv = $("#PokedexUserList");
        ulv = ulv.html(htmlCode);
        ulv.listview("refresh"); // very important

        var lv = $("#PokedexList");
        lv = lv.html("");
        lv.listview("refresh"); // very important


        //attach event handler for each list items
        $("#PokedexUserList a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            localStorage.setItem("URL","userPokedex");
            //navigate to the detail page automatically
            //both will work.
            $(location).prop('href', '#Edit');
        }
    }
    userPokedex.SelectAll(options,callback)
}
function GetNumberOfPokedex()
{
    var  options=[];
    var numberOfPokerdex=0;
    function callback(tx, results)
    {
        numberOfPokerdex = results.rows.length;

    }
    userPokedex.SelectAll(options,callback)
    return numberOfPokerdex;
}
function ClearDatabase() {
    var result = confirm("Really want to clear database?");
    if (result) {
        try {
            DB.DropTables();
            alert("Database cleared!");
        } catch (e) {
            alert(e);
        }
    }
}
function AddPokemon()
{
    if(validation_add_frm())
    {
        var Number = document.getElementById("Number").value;
        var officialName= document.getElementById("OfficialName").value;
        var fileupload = document.getElementById("fileupload").value;
        var nickName= document.getElementById("NickName").value;
        var options=[Number,officialName,fileupload,nickName];

        userPokedex.Insert(options);
        alert("New Feedback Added");
        document.getElementById("Number").value = Number+1;
    }
    else {
        console.error("Form is not valid");
    }
}

function AddOriginalPokemons()
{
    if(GetNumberOfPokedex()==0 || GetNumberOfPokedex == null) {
        var options = [1,'Bulbasaur','1','Fushigidane'];
       // pokedex.Insert(options);
    }
}
/*
function ShowCurrentUserPokeMon()
{
        var id = localStorage.getItem("id");

        var options = [id];

        function callback(tx, results) {
            var row = results.rows[0];

            console.info("Id: " + row['id'] +
                " Number : " + row['Number'] +
                " OfficialName : " + row['OfficialName'] +
                " PicName : " + row['PicName'] +
                " NickName : " + row['NickName']);

            $("#NumberUpdate").val(row['Number']);
            $("#OfficialNameUpdate").val(row['OfficialName']);
            //  $("#fileuploadEdit").val(row['PicName']);
            $("#NickNameUpdate").val(row['NickName']);
        }
        userPokedex.Select(options, callback);
}
*/
function ShowCurrentPokeMon()
{
    var id = localStorage.getItem("id");
    var url = localStorage.getItem("URL");

    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];

        console.info("Id: " + row['id'] +
            " Number : " + row['Number'] +
            " OfficialName : " + row['OfficialName'] +
            " PicName : " + row['PicName'] +
            " NickName : " + row['NickName']);

        $("#NumberUpdate").val(row['Number']);
        $("#OfficialNameUpdate").val(row['OfficialName']);
      //  $("#fileuploadEdit").val(row['PicName']);
        $("#NickNameUpdate").val(row['NickName']);
    }
    if(url=="pokedex")
    {
        pokedex.Select(options, callback);
    }
    else if(url=="userPokedex")
    {
        userPokedex.Select(options, callback);
    }
}

function DeletePokeMon()
{
    // var id = $("#txtId").val();
    var id = localStorage.getItem("id");
    var url = localStorage.getItem("URL");

    var options = [id];

    function callback() {
        alert("Pokemon Deleted successfully");
        console.info("Pokemon Deleted successfully");
        $(location).prop('href', '#HomePage');

    }
    if(url=="pokedex")
    {
        pokedex.Delete(options, callback);
    }
    else if(url=="userPokedex")
    {
        userPokedex.Delete(options, callback);
    }
}
function UpdatePokeMon()
{
    if(validation_update_frm())
    {
        var id = localStorage.getItem("id");
        var Number = document.getElementById("NumberUpdate").value;
        var OfficialName= document.getElementById("OfficialNameUpdate").value;
        var PicName= document.getElementById("fileuploadEdit").value;
        var NickName= document.getElementById("NickNameUpdate").value;

        var options=[Number,OfficialName,PicName,NickName,id];

        function callback() {
            alert("Feedback Updated successfully");
            console.info("Success: Record updated successfully");
            $(location).prop('href', '#HKViewFeedbackPage');
        }

        pokedex.Update(options,callback());
    }
    else {
        console.error("Form is not valid");
    }
}