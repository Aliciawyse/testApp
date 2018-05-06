// Userlist data array for filling in info box

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    showList();
    compareEmails();

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

function oneEditAway(firstString, secondString){


    //If strings are different by more than one character -- then we wont consider them to be duplicates
    if (Math.abs( firstString.length - secondString.length ) > 1 ){
        console.log("false");
        return false
    }

    var dupTracker = [];

    //if the strings are off by one character or less run through the following code...

    //get shorter and longer string
    // if length of "apple" is greater than length of "aple" then string 1 is first string
    // if length of "apple" is greater than length of "aple" then string 2 is secondString
    var string1 = firstString.length < secondString.length ? firstString : secondString;
    var string2 = firstString.length < secondString.length ? secondString : firstString;

    // var index1 = 0;
    // var index2 = 0;

    //so far no difference is found, we haven't checked for it yet
    var foundDifference = false;

    // if index is smaller than the length of the string
    // if 0 < length of string 1 and string 2

    for (var index1 = 0, index2 = 0; index1 < firstString.length && index2 < secondString.length; ++index1, ++index2){
        //for (var i = 0; i < firstString.length && i < secondString.length; ++i) {
    //while (index1 < firstString.length && index2 < secondString.length){

        // check if "bale" and "pale" are not equal
        //           ^          ^
        if(firstString.charAt(index1) !== secondString.charAt(index2)){
            //ensure that this is the FIRST difference found
            if (foundDifference) return false;

            foundDifference = true;

            //if "apple" is "aple" increment index1
            if (firstString.length == secondString.length){ //on replace
                index1++
            }
            else {
                //if not increment index1 anyway
                index1++;
            }
            //increment index2
            index2++
        }
        // return true;
        console.log("true");
        console.log(string1, string2);

        dupTracker.push(string1, string2);
    }
   return dupTracker;

}



function compareEmails(){

    $.ajax({
        url: '/people/peoplelist',
        dataType: 'json',
        success: function(data) {

            data = JSON.parse(data).data;
            //console.log(data);

            // var dupTrackerBase = [];
            //
            // //for every record
            // for (var i = 0; i < data.length; i++) {
            //
            //     //grab email
            //     var email = data[i].email_address;
            //
            //     dupTrackerBase.push(email);
            //
            // }
            // //console.log(dupTrackerBase);
            //
            // //grab email and com

            var therealtracker = [];

            for(var x = 0; x < data.length -1 ; x++){

                for (var y = x+1; y < data.length; y++){

                    //console.log(data[x].email_address, data[y].email_address);

                    //call my dup function

                    if (!oneEditAway(data[x].email_address, data[y].email_address)){
                        console.log("it was false");
                    }
                    else{
                        therealtracker.push(oneEditAway(data[x].email_address, data[y].email_address));
                    }


                }







                    }


                    console.log(therealtracker);
        }
    });
}