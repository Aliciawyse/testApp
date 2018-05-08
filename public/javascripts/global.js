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
    $("div").removeClass("hidden");

}

var dupTracker = [];


function oneEditAway(firstString, secondString){
    if(firstString.length === secondString.length){
        console.log("replacing");
        return oneEditReplace(firstString, secondString);
    }
    else if (firstString.length + 1 === secondString.length){
        console.log("apple vs aple");
        return oneEditInsert(firstString, secondString);
    }
    else if (firstString.length - 1 === secondString.length){
        console.log("aple vs apple -- this is an example of removal");
        return oneEditInsert(secondString, firstString);
    }
    return false
}

function oneEditReplace(firstString, secondString){
    var foundDifference = false;
    for(var i = 0; i < firstString.length; i++){
        if(firstString.charAt(i) !== secondString.charAt(i)){
            if (foundDifference){
                return false;
            }
            foundDifference = true;
        }
    }
    dupTracker.push(firstString, secondString);
    return true;
}

function oneEditInsert(firstString, secondString){
    var index1 = 0;
    var index2 = 0;

    while (index2 < secondString.length && index1 < firstString.length){
        if (firstString.charAt(index1) !== secondString.charAt(index2)){
            if (index1 !== index2){
                return false;
            }
            index2++;
        } else {
            index1++;
            index2++;
        }
    }
    dupTracker.push(firstString, secondString);
    return true;
}


function compareEmails(){

    $.ajax({
        url: '/people/peoplelist',
        dataType: 'json',
        success: function(data) {

            data = JSON.parse(data).data;

            for(var x = 0; x < data.length -1 ; x++){

                for (var y = x+1; y < data.length; y++){

                    if (oneEditAway(data[x].email_address, data[y].email_address) === false){
                        console.log("No duplicates found.");
                    }
                    else{
                        oneEditAway(data[x].email_address, data[y].email_address);
                    }
                }
            }
            console.log(dupTracker);

            if(dupTracker.length === 0){
                $('#duplicates p').html("There are no potential duplicates.")
            }
            else {
                $('#duplicates p').html("The potential duplicates are: " + dupTracker);
            }
        }
    });
}