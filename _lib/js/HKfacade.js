function HKupdateTypesDropdown() {
    var  options=[];

    function callback(tx, results)
    {
        var HKDropdown = document.getElementById('HKDropdown');
        HKDropdown.options.length = 0;
        var defaultOption = 0;
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var el = document.createElement('option');
            el.text = row['name'];
            el.value = row['name'];

            HKDropdown.appendChild(el);

            if (el.text == "Others") {
                var hkDropDown = $("select#HKDropdown");
                hkDropDown[0].selectedIndex = i;
                hkDropDown.selectmenu("refresh");
            }
        }
    }
    type.HKselectAll(options,callback);
}
function HKaddFeedback()
{
    if(validation_add_frm())
    {
        var businessName = document.getElementById("HKBusinessName").value;
        var typeName= document.getElementById("HKDropdown").value;
        var reviewerEmail= document.getElementById("HKReviewerEmail").value;
        var reviewerComments= document.getElementById("HKComments").value;
        var reviewDate= document.getElementById("HKdate").value;
        var hasRating= document.getElementById("HKCheckBox").checked;


        //when checkbox is checked, food quality, service and values should be saved
        if(hasRating)
        {
            var rating1= document.getElementById("HKFoodQuality").value;
            var rating2= document.getElementById("HKService").value;
            var rating3= document.getElementById("HKValue").value;
            var typeId = getTypeId(typeName);
         //   ShowOrHide('review');
            var options=[businessName,typeId,reviewerEmail,reviewerComments,reviewDate,hasRating,rating1,rating2,rating3];

            review.HKInsert(options);
            alert("New Feedback Added");
        }
        else if(!hasRating)
        {
            var typeId = getTypeId(typeName);
            var options=[businessName,typeId,reviewerEmail,reviewerComments,reviewDate,hasRating,null,null,null];
            review.HKInsert(options);
            alert("New Feedback Added");
        }
    }
    else {
        console.error("Form is not valid");
    }
}
function getTypeId(type)
{
    if(type=="Canadian")
        return 0;
    else if(type=="Asian")
        return 1;
    else
        return 2;
}
function getTypeName(type)
{
    if(type==0)
        return "Canadian";
    else if(type==1)
        return "Asian";
    else
        return "Others";
}
function HKdropdownForUPdateTypesDropdown(typeName) {
    var  options=[];

    function callback(tx, results)
    {
        var HKDropdown = document.getElementById('HKdropdownForUPdate');

            for (var i = 0; i < results.rows.length; i++) {

                var row = results.rows[i];
                var el = document.createElement('option');
                el.text = row['name'];
                el.value = row['name'];
                HKDropdown.appendChild(el);
                if (el.text == typeName) {
                    var hkDropDown = $("select#HKdropdownForUPdate");
                    hkDropDown[0].selectedIndex = i;
                    hkDropDown.selectmenu("refresh");
                }
            }
    }
    type.HKselectAll(options,callback);
}
function HKshowCurrentReview()
{
    var id = localStorage.getItem("id");

    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];

        console.info("Id: " + row['businessName'] +
            " Type Id : " + row['typeId'] +
            " Reviewer Email : " + row['reviewerEmail'] +
            " Reviewer Comments: " + row['reviewerComments'] +
            " Review Date: " + row['reviewDate'] +
            " hasRating : " + row['hasRating']+
            " rating1 : " + row['rating1']+
            " rating2 : " + row['rating2']+
            " rating3 : " + row['rating2']
        );

        $("#HKBusinessName2").val(row['businessName']);
        var typeName = getTypeName(row['typeId']);
        HKdropdownForUPdateTypesDropdown(typeName);
       // $("#dropdownForUPdate").value =typeName;
        $("#HKReviewerEmail2").val(row['reviewerEmail']);
        $("#HKComments2").val(row['reviewerComments']);
        $("#HKdateForReview").val(row['reviewDate']);

        if (row['hasRating'] == 'true') {
            //$("#HKCheckBoxForReview").attr("checked", true);
            $("#HKCheckBoxForReview").prop("checked", true).checkboxradio('refresh');;
            //document.getElementById("HKCheckBoxForReview").checked = true;
            $("#HKFoodQualityForReview").val(row['rating1']);
            $("#HKServiceForReview").val(row['rating2']);
            $("#HKValueForReview").val(row['rating3']);
            var overallRating = (row["rating1"]+row["rating2"]+row["rating3"])*20/3;
            $("#HKRatingsForReview").val(overallRating);
        }
        else {
            $("#HKCheckBoxForReview").prop("checked", false).checkboxradio('refresh');;
            $("#HKFoodQualityForReview").val(null);
            $("#HKServiceForReview").val(null);
            $("#HKValueForReview").val(null);
            $("#HKRatingsForReview").val(null);
            document.getElementById("HKCheckBoxForReview").checked = false;
        }
        ShowOrHide('review');

    }

    review.HKSelect(options, callback);
}
function HKgetReviews()
{
    var  options=[];
    function callback(tx, results)
    {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {

            // both will work
            // var row = results.rows.item(i);
            var row = results.rows[i];
            var overallRating = (row["rating1"]+row["rating2"]+row["rating3"])*20/3;
            console.info("Id: " + row['id'] +
                " Business Name : " + row['businessName'] +
                " Reviewer Email : " + row['reviewerEmail'] +
                " Overall Rating : " + overallRating);
            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] +">"+
                "<p>Business Name : " + row['businessName'] + "</p>" +
                "<p>Reviewer Email : " + row['reviewerEmail'] + "</p>" +
                "<p>Overall Rating : " + overallRating + "</p>" +
                "</a></li>";
        }

        var lv = $("#HKFeedbackList");

        lv = lv.html(htmlCode);
        lv.listview("refresh"); // very important
        //attach event handler for each list items
        $("#HKFeedbackList a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));

            //navigate to the detail page automatically
            //both will work.
            $(location).prop('href', '#HKEditFeedbackPage');

        }

    }
    review.HKSelectAll(options,callback)
}
function HKclearDatabase() {
        var result = confirm("Really want to clear database?");
        if (result) {
            try {
                DB.HKDropTables();
                alert("Database cleared!");
            } catch (e) {
                alert(e);
            }
        }
}
function HKupdateFeedback()
{
    if(validation_update_frm())
    {
        var id = localStorage.getItem("id");
        var businessName = document.getElementById("HKBusinessName2").value;
        var typeName= document.getElementById("HKdropdownForUPdate").value;
        var reviewerEmail= document.getElementById("HKReviewerEmail2").value;
        var reviewerComments= document.getElementById("HKComments2").value;
        var reviewDate= document.getElementById("HKdateForReview").value;
        var hasRating= document.getElementById("HKCheckBoxForReview").checked;


        //when checkbox is checked, food quality, service and values should be saved
        if(hasRating)
        {
            var rating1= document.getElementById("HKFoodQualityForReview").value;
            var rating2= document.getElementById("HKServiceForReview").value;
            var rating3= document.getElementById("HKValueForReview").value;
            var typeId = getTypeId(typeName);
            //   ShowOrHide('review');
            var options=[businessName,typeId,reviewerEmail,reviewerComments,reviewDate,hasRating,rating1,rating2,rating3,id];

          //  review.HKUpdate(options);
           // alert("Feedback Updated successfully");
        }
        else if(!hasRating)
        {
            var typeId = getTypeId(typeName);
            var options=[businessName,typeId,reviewerEmail,reviewerComments,reviewDate,hasRating,null,null,null,id];
            //review.HKUpdate(options);
            //alert("Feedback Updated successfully");
        }
        function callback() {
            alert("Feedback Updated successfully");
            console.info("Success: Record updated successfully");
            $(location).prop('href', '#HKViewFeedbackPage');
        }

        review.HKUpdate(options,callback());
    }
    else {
        console.error("Form is not valid");
    }
}
function HKdeleteFeedback()
{
    // var id = $("#txtId").val();
    var id = localStorage.getItem("id");
    var options = [id];

    function callback() {
        alert("Feedback Deleted successfully");
        console.info("Feedback Deleted successfully");
        $(location).prop('href', '#HKViewFeedbackPage');

    }
    review.HKDelete(options, callback);
}