$(document).ready(function () {
    const post_id = $("#post-detail").attr("data-post-id");
    getCommentsOfPosts(post_id)

    $("#comment-submit-form").submit(function (e) {
        e.preventDefault();
        const formData = $(this);
        const submitButton = $("#comment-submit-button");
        const post_id = $("#post-id-comment").val();

        submitButton.html('Saving....<i class="fa fa-spin fa-spinner" aria-hidden="true"></i>');

        $.ajax({
            method: "POST",
            url: "/api/comments/" + post_id,
            data: formData.serialize(),
            success: (result) => {
                submitButton.html('Save');
                $("#comment-errors-data").html('');
                $("#comment-input").val('');
                $("#successMessage").removeClass('visually-hidden');
                getCommentsOfPosts(post_id);
            },
            error: (error) => {
                if (error.status === 422) { // "Unprocessable Entity" - Form data invalid
                    $("#successMessage").addClass('visually-hidden');
                    var message = error.responseJSON.errors ? error.responseJSON.errors.comment ? error.responseJSON.errors.comment[0] : '' : '';
                    $("#comment-errors-data").html(message);
                    submitButton.html('Save');
                }
            }
        });
    });

});

function getCommentsOfPosts(post_id) {
    if (typeof post_id !== 'undefined' && post_id !== '' && !isNaN(post_id)) {
        $.ajax({
            method: "GET",
            url: "/api/comments/" + post_id,
            success: (result) => {
                $("#post-comments").html(result);
            },
            error: (error) => {
                alert('Something went wrong to fetch datas...');
            }
        });
    }
}

function getPosts() {
    $.ajax({
        method: "GET",
        url: "/api/posts",
        success: (result) => {
            $("#posts").html(result);
        },
        error: (error) => {
            alert('Something went wrong to fetch datas...');
        }
    });
}