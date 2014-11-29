$(document).ready(function () {   

  var myobj = new npcsearch(); // create instance of object

  // search form
  $("form").on("submit", function (e) {
    e.preventDefault(); // suppress form submit
    myobj.dosearch(this);
  });

  // event handler for click on sample search
  $(document).on('click', 'a.sample-search', function() {
    // get sample search from text in <a> tag
    var ssearch = $(this).text();
    $("#querya").val(ssearch);
    $("#querya").submit();
  });

  // event handler for click on search results
  $(document).on('click', 'a.search-result', function() {
//    console.log($(this).attr('id'));
    myobj.showResultDetail($(this).attr('id')); //send the clicked link id
  });
 
}); //close document.ready function
