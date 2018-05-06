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
                tableContent += '<td>' + this.first_name + ' ' + this.last_name + '</td>';
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
            console.log(data);

            var freq = {};

            //for every record
            for (var i=0; i<data.length;i++) {

                //grab email
                var email = data[i].email_address;

                //parse email
                for(var y=0; y < email.length; y++){

                    if(freq[email[y]]){
                        freq[email[y]] = freq[email[y]] + 1;
                    }
                    else {
                        freq[email[y]] = 1;
                    }
                }
            }

            //
            var keys2 = Object.keys(freq);

            keys2.sort(function(a, b) { return freq[b] - freq[a] });

            var secondTableContent='';

            for(var i=0; i < keys2.length; i++){
                console.log(keys2[i],freq[keys2[i]]);

                    secondTableContent += '<tr>';
                    secondTableContent += '<td>' + keys2[i] + '</td>';
                    secondTableContent += '<td>' + freq[keys2[i]] + '</td>';
                    secondTableContent += '</tr>';

                $('#characterFrequency table tbody').html(secondTableContent);
            }
        }
    });
}