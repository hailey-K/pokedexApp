function validation_add_frm()
{
    var form =  $( "#HKAddForm");
    form.validate(validateOptions);

    return form.valid();
}
function validation_update_frm()
{
    var form =  $( "#HKUpdateForm");
    form.validate(validateOptions);

    return form.valid();
}
var validateOptions = {
    rules: {
        businessName: {
            required: true,
            minlength: 2,
            maxlength:30
        },
        emailName: {
            required: true,
            email: true
        },
        date:{
            required: true
        },
        foodQuality:{
            min: 0,
            max: 5
        },
        service:{
            min: 0,
            max: 5
        },
        value:{
            min: 0,
            max: 5
        }
    },
    messages:{
        businessName: {
            required: 'Business name is required',
            minlength: 'Length must be 2-30 characters long',
            maxlength: 'Length must be 2-30 characters long'
        },
        emailName: {
            required: 'Email is required',
            email: 'Please enter a valid email address'
        },
        date: {
            required: 'Date is required'
        },
        foodQuality:{
            min: 'Value must be 0-5',
            max: 'Value must be 0-5'
        },
        service:{
            min: 'Value must be 0-5',
            max: 'Value must be 0-5'
        },
        value:{
            min: 'Value must be 0-5',
            max: 'Value must be 0-5'
        }
    },
    errorPlacement: function( error, element ) {
        error.insertAfter( element.parent() );
    }
}
function clickBtnSave(){
    var email = $('#HKreviewerEmail3').val();
    window.localStorage.setItem('DefaultEmail', email);
    alert('Default reviewer email saved.');
}

function clickBtnClear(){
    localStorage.removeItem('DefaultEmail');
}

