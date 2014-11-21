
$(document).ready(function () {   

  var mydata; // create array to hold result data

  require(["object"]);


  require(["dosearch"]);
  require(["processdata"]);
  require(["showsearch"]);
  require(["showresult"]);

  var myobj = new npcsearch() 



  // search form
  $("form").on("submit", function (e) {
    e.preventDefault(); // suppress form submit
    myobj.dosearch(this);
    
  });


  // catch click on sample search
  $(document).on('click', 'a.sample-search', function() {
    // get sample search from text in <a> tag
    var ssearch = $(this).text();
    $("#querya").val(ssearch);
    $("#querya").submit();
  });

  // create event handler for click on search results
  $(document).on('click', 'a.search-result', function() {
    myobj.showResultDetail($(this).attr('id')); //send the clicked link id
  });

  
}); //close document.ready function
