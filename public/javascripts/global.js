
// DOM Ready =============================================================
$(document).ready(function() {

    // Display each Person’s name, email address, and job title on initial page load
    showPeopleRecords();

});

// Functions =============================================================

// fill table with name, email address and job title
function showPeopleRecords(){

    $.ajax({
        url: '/people/peoplelist',
        dataType: 'json',
        success: function(data){

             data = JSON.parse(data).data;
             var tableContent='';

            // for each item in our JSON, add a table row & cells to the tableContent string
            $.each(data, function(){
                tableContent += '<tr>';
                tableContent += '<td>' + this.first_name + ' ' + this.last_name + '</td>';
                tableContent += '<td>' + this.email_address + '</td>';
                tableContent += '<td>' + this.title + '</td>';
                tableContent += '</tr>';
            });

            // Inject the tableContent string in our table
            $('#userList table tbody').html(tableContent);
        }
    });
}

// fill table with frequency count of all the unique characters
function findCharacterFrequency() {

    $.ajax({
        url: '/people/peoplelist',
        dataType: 'json',
        success: function(data){

            data = JSON.parse(data).data;

            var freq = {};

            // for each item in our JSON
            // store email address in variable
            for (var i=0; i<data.length;i++) {
                var email = data[i].email_address;

                // for every character in that email address
                // if the value of `freq[character]` is truthy -- use bracket notation
                // to increment the value of that corresponds to `freq[character]`
                // if the value of `freq[character]` is falsey (ie: undefined, 0, null, etc.),
                // use bracket notation to add the character as new key and 1 as its value
                // Cite: https://stackoverflow.com/questions/1168807/how-can-i-add-a-key-value-pair-to-a-javascript-object
                for(var y=0; y < email.length; y++){
                    if(freq[email[y]]){
                        //
                        freq[email[y]]++;
                    }
                    else {
                        freq[email[y]] = 1;
                    }
                }
            }

            // An array-like object that contains the names of the enumerable properties and methods of the object.
            var keys2 = Object.keys(freq);

            // we sort comparing the values in the original object, from largest to smallest using the sort function's compare function
            keys2.sort(function(a, b) { return freq[b] - freq[a] });

            var secondTableContent='';

            // add each character to secondTableContent & retrieve the associated values, then inject that into our existing table
            //
            for(var i=0; i < keys2.length; i++){
                    secondTableContent += '<tr>';
                    secondTableContent += '<td>' + keys2[i] + '</td>';
                    secondTableContent += '<td>' + freq[keys2[i]] + '</td>';
                    secondTableContent += '</tr>';

                $('#characterFrequency table tbody').html(secondTableContent);
            }
        }
    });

    // show table once it's populated
    $("div").removeClass("hidden");

}

var dupTracker = [];

function oneEditAway(firstString, secondString){
    if(firstString.length === secondString.length){
        return oneEditReplace(firstString, secondString);
    }
    else if (firstString.length + 1 === secondString.length){
        return oneEditInsert(firstString, secondString);
    }
    else if (firstString.length - 1 === secondString.length){
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

            if(dupTracker.length === 0){
                $('#duplicates p').html("There are no potential duplicates.")
            }
            else {
                $('#duplicates p').html("The potential duplicates are: " + dupTracker);
            }
        }
    });
}