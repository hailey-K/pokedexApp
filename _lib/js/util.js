function validation_add_frm()
{
    var form =  $( "#AddForm");
    form.validate(validateOptions);

    return form.valid();
}
function validation_update_frm()
{
    var form =  $( "#UpdateForm");
    form.validate(validateOptions);

    return form.valid();
}
var validateOptions = {
    rules: {
        officialName: {
            required: true,
            minlength: 1,
            maxlength:30
        },
        nickName: {
            required: true,
            minlength: 1,
            maxlength:30
        },
    },
    messages:{
        officialName: {
            required: 'Official name is required',
            minlength: 'Length must be 2-30 characters long',
            maxlength: 'Length must be 2-30 characters long'
        },
        nickName: {
            required: 'Nick name is required',
            minlength: 'Length must be 1-30 characters long',
            maxlength: 'Length must be 1-30 characters long'
        }
    },
    errorPlacement: function( error, element ) {
        error.insertAfter( element.parent() );
    }
}

