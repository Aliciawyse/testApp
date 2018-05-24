
// DOM Ready =============================================================
$(document).ready(function() {

    // Display each Person’s name, email address, and job title on initial page load
    showPeopleRecords();

});

// Functions =============================================================

// fill table with name, email address and job title
function showPeopleRecords(){

    // Use validate.js library to set up constraint
    // on emails
    var emailErrorExist = false;
    var nameErrorExist = false;
    var constraints = {
        from: {
            email: {
                message: function(){
                    console.log("Valid email address not found");
                    return errorExist = true;
                }
            }
        },
        subdomain: {
            exclusion: {
                within: ["<", ">", "%"],
                message: function(){
                    console.log("Valid name not found");
                    return nameErrorExist = true;
                }
            }
        }
    };


    $.ajax({
        url: '/people/peoplelist',
        dataType: 'json',
        success: function(data){

             data = JSON.parse(data).data;
             var tableContent='';

            // for each item in our JSON, add a table row & cells to the tableContent string
            $.each(data, function(){

                // Uncomment this code to verify email validator is working.
                // this.email_address = "<script>";
                // this.first_name = "<";


                // validate takes in an object that is checked
                // against the constraint we set up earlier
                validate({from: this.email_address}, constraints);
                validate({subdomain: this.first_name}, constraints);
                validate({subdomain: this.last_name}, constraints);


                if (emailErrorExist){
                    this.email_address = "No valid email address found.";
                }

                if(nameErrorExist){
                    this.first_name = 'Valid full name not found';
                    this.last_name = '';
                }

                // build table
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

// The code below helps us find potential duplicates. My definition of a duplicate means that two strings are one insertion, replacement or removal away from each other. And is taken from the Cracking the Coding Interview book.

// Replacement: Consider "bale" and "pale". The two strings are only different in one place.

// Insertion: Consider "apple" and "aple". These two strings are an insertion away from being identical. If you compared the strings, they would be identical , except for a shift at some point in the strings.

// Removal: "apple" and "aple" are one removal away. Or the opposite of insertion


var dupTracker = [];

// checking the lengths will indicate which of these we need to check.
function oneEditAway(firstString, secondString){
    if(firstString.length === secondString.length){
        return oneEditReplace(firstString, secondString);
    }
    else if (firstString.length - 1 === secondString.length) {
        // secondString is the shorter string and it should
        // get passed as the first param in our function
        return oneEditInsert(secondString, firstString);
    }
    else if (firstString.length + 1 === secondString.length){
        return oneEditInsert(firstString, secondString);
    }

    // if none of the options above are true then it's likely that
    // we do not have a duplicate.
    return false
}

// check if each index in firstString is distinct from the corresponding index in secondString.
// "a b d" compared with "a c d"
//    ^                     ^
// if true & foundDifference is false then
// push the two strings to our dupTracker list
// change our foundDifference flag to true
// return true
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

// this function will check the difference between the firstString to make secondString is some additional or missing character. Here's an example of what should happen

// a b c   compared to   d a b c
// ^                     ^
// increase index2 only

// a b c   compared to   d a b c
// ^                       ^
// increase index1 and index2

// a b c   compared to   d a b c
//   ^                       ^
// increase index1 and index2 again

// a b c   compared to   d a b c
//     ^                       ^
// increase index1 and index2
// and our while loop will stop.


function oneEditInsert(firstString, secondString){

    // create index pointers for each string
    // starting at 0 for both
    var index1 = 0;
    var index2 = 0;

    // we will stop this while loop when index1 or index2 hits the length of its string,
    // otherwise it would cause an index out of bound error

    while (index2 < secondString.length && index1 < firstString.length){
        // if the characters are not the same
        if (firstString.charAt(index1) !== secondString.charAt(index2)){
            // check if pointers are different
            // that would indicate we already met a difference
            if (index1 !== index2){
                return false;
            }
            index2++;
        } else {
            // if characters are the same, move both pointers
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