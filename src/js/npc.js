
$(document).ready(function () {   

  var mydata; // create array to hold result data

  require(["functions"]);
  require(["search"]);


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

  // catch click on search results to show detailed page
  $(document).on('click', 'a.search-result', function() {
    showResultDetail.call(this,mydata);
  }); 
  
}); //close document.ready function
