/*    Hyerim Kim, 2018-03-18 : Created
*/
function btnCear_click() {
    HKclearDatabase();
}
function btnSave_click()
{
    HKaddFeedback();
}
function btnUpdate_click()
{
    HKupdateFeedback();
  //  $(location).prop('href', '#HKViewFeedbackPage');
}
function btnDelete_click()
{
    HKdeleteFeedback();
}

function init() {
    document.getElementById('HKFoodQuality').value = 0;
    document.getElementById('HKService').value = 0;
    document.getElementById('HKValue').value = 0;
    document.getElementById('HKRatings').value = '0%';
    document.getElementById('HKFoodQualityForReview').value = 0;
    document.getElementById('HKServiceForReview').value = 0;
    document.getElementById('HKValueForReview').value = 0;
    document.getElementById('HKRatingsForReview').value = '0%';
    $("#HKClearDatabase").on("click", btnCear_click);
    $("#HKSave").on("click", btnSave_click);
    $("#HKUpdate").on("click", btnUpdate_click);
    $("#HKDelete").on("click", btnDelete_click);
}
function pageReviewshow()
{
  //  HKupdateTypesDropdown();
    HKgetReviews();
}
function pageModifypshow()
{
    HKshowCurrentReview();
}
function pageAddFeedback()
{
    HKupdateTypesDropdown();
}

$(document).ready(function () {
    init();
    initDB();

    $("#HKViewFeedbackPage").on("pageshow", pageReviewshow);
    $("#HKEditFeedbackPage").on("pageshow", pageModifypshow);
    $("#HKAddFeedbackPage").on("pageshow", pageAddFeedback);

    ShowOrHide('feedback');
    ShowOrHide('review');
});
function ShowOrHide(index){

    if(index=='feedback')
    {
    var checkBox = document.getElementById("HKCheckBox");
    // Get the output text
    var div = document.getElementById("HKDivForThreeValues");
    // If the checkbox is checked, display the div
    if (checkBox.checked == true){
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
    }
    if(index=='review')
    {
        var checkBox = document.getElementById("HKCheckBoxForReview");
        // Get the output text
        var div = document.getElementById("HKDivForThreeValuesForReview");
        // If the checkbox is checked, display the div
        if (checkBox.checked == true){
            div.style.display = "block";
        } else {
            div.style.display = "none";
        }
    }
}
function threeValueChanges(index) {
    if (index == 'feedback'){
        var HKFoodQuality = document.getElementById('HKFoodQuality').value * 20;
        var HKService = document.getElementById('HKService').value * 20;
        var HKValue = document.getElementById('HKValue').value * 20;
        var HKRatings = (HKFoodQuality + HKService + HKValue) / 3;
        document.getElementById('HKRatings').value = HKRatings + '%';
    }
    if(index=='review'){
        var HKFoodQuality = document.getElementById('HKFoodQualityForReview').value * 20;
        var HKService = document.getElementById('HKServiceForReview').value * 20;
        var HKValue = document.getElementById('HKValueForReview').value * 20;
        var HKRatings = (HKFoodQuality + HKService + HKValue) / 3;
        document.getElementById('HKRatingsForReview').value = HKRatings + '%';
    }
}

function initDB(){
    try{
        DB.HKCreateDatabase();
        if (db) {
            console.info("Creating Tables...");
            DB.HKCreateTables();
        }
        else{
            Console.error("Error: Cannot create tables: Database does not exist!");
        }
    } catch(e){
        Console.error("Error: (Fatal) Error in initDB(). Can not proceed.");
    }
}

