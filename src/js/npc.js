
$(document).ready(function () {   

  var mydata; // create array to hold result data

  require(["dosearch"]);
  require(["processdata"]);
  require(["showsearch"]);
  require(["showresult"]);

  // search form
  $("form").on("submit", function (e) {
    doSearch.call(this,e); 
  });


  // catch click on sample search
  $(document).on('click', 'a.sample-search', function() {
    // get sample search from text in <a> tag
    var ssearch = $(this).text();
    $("#querya").val(ssearch);
    $("#querya").submit();
  });


  
}); //close document.ready function
