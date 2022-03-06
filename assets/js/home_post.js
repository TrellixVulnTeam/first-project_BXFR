{
    console.log("home.ejs is running");
    // method to submit the from data for new post using ajax
let createPost = function(){
    let newPostForm = $('#new-post-form'); 

    newPostForm.submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/posts/create',
            data: newPostForm.serialize(),
            success: function(data){
                console.log(data);
            },error: function(err){
                console.log(error.responseText);
            }
        })
    });
}
createPost();

}