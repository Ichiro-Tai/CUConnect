$(document).ready(function(){
 $('.header').height($(window).height());
})
$(document).ready(function(){
 $('.header2').height($(window).height() * 0.6);
})
$(document).ready(function(){
 $('.stack1').height($(window).height() * 0.2);
})
$(document).ready(function(){
 $('.stack2').height($(window).height() * 0.05);
})
$(document).ready(function(){
 $('.stack3').height($(window).height() * 0.3);
})
$(document).ready(function(){
 $('.stack4').height($(window).height() * 0.15);
})


function changestudent() {
    $('#studentDemo').show();
    $('#familyDemo').hide();
    $('#businessDemo').hide();
}
function changefamily() {
    $('#studentDemo').hide();
    $('#familyDemo').show();
    $('#businessDemo').hide();
}
function changebusiness() {
    $('#studentDemo').hide();
    $('#familyDemo').hide();
    $('#businessDemo').show();
}


function addrequest() {
    var classSubject = '<td>' +  $('#classSubject').val() + '</td>';
    var time = '<td>' +  $('#preferredDate').val() + ', ' + $('#preferredHours').val() + '</td>';
    var desc = '<td>' +  $('#description').val() + '</td>';
    $('#pendingRequests tr:last').after('<tr>' + classSubject + time + '<td>$16</td>' + desc + '</tr>');
}

function searchToggle() {
    $('#searchTable').show();
    $('#emptySpace').hide();
}
