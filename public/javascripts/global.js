// Userlist data array for filling in info box

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    showList();

});

// Functions =============================================================

//show list
function showList(){

    $.ajax({
        url: '/people/peoplelist',
        dataType: 'json',
        success: function(data){

             data = JSON.parse(data).data;
             var tableContent='';

            $.each(data, function(){
                tableContent += '<tr>';
                tableContent += '<td>' + this.first_name + '</td>';
                tableContent += '<td>' + this.email_address + '</td>';
                tableContent += '<td>' + this.title + '</td>';
                tableContent += '</tr>';
            });

            console.log(tableContent);

            $('#userList table tbody').html(tableContent);

        }
    });



}


// Fill table with data
function populateTable() {

    console.log("before get json");


    $.ajax({
        url: '/people/peoplelist',
        dataType: 'json',
        success: function(data){
            console.log(data);
        }
    });






}