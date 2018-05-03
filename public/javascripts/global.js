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

            $('#userList table tbody').html(tableContent);

        }
    });



}


// Fill table with data
function populateTable() {

    $.ajax({
        url: '/people/peoplelist',
        dataType: 'json',
        success: function(data){

            data = JSON.parse(data).data;


            var freq = {};

            //for every record
            for (var i=0; i<data.length;i++) {

                //find email
                console.log(data[i].email_address);

                var email = data[i].email_address;

                for(var y=0; y < email.length; y++){

                    if(freq[email[y]]){
                        freq[email[y]] = freq[email[y]] + 1;
                    }
                    else {
                        freq[email[y]] = 1;
                    }

                }



            }


            console.log(freq);




        }
    });






}