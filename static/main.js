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
    $('#pendingRequests tr:last').after('<tr>' + classSubject + time + '<td>16pts/hr</td>' + desc + "<td><a class=\"btn btn-primary\" href=\"{{ url_for('family_personal') }}\">Edit offer</a></td>" +
    "<td><a class=\"btn btn-primary\" href=\"{{ url_for('view_applicants') }}\" >View applicants</a></td>" + '</tr>');
}

function addcoupon() {
  var coupondescription = '<td>' +  $('#coupondescription').val() + '</td>';
  $('#couponlist tr:last').after('<tr>' + '<td>16 points</td>' + coupondescription + "<td><a class=\"btn btn-primary\" href=\"{{ url_for('edit_coupons') }}\" >Edit</a></td>" +
  "<td><a class=\"btn btn-primary\" href=\"{{ url_for('edit_coupons') }}\" >Delete</a></td>" + '</tr>');
}

function searchToggle() {
    $('#searchTable').show();
    $('#queryresulttext').show();
    $('#emptySpace').hide();
}

function submitApplication() {
    $('#applicationtext').show();
}

function redirectPersonal() {
    var user_type = $('input[name=userType]:checked', '#registerForm').val() + '_personal';
    window.location.replace(new URL(user_type, window.location.href).href);
}
