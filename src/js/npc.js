require(["functions"]);


$(document).ready(function () {   

  var mydata; // create array to hold result data
       
  require(["search"]);

  require(["results"]);

  // catch click on sample search
  $(document).on('click', 'a.sample-search', function() {
    // get sample search from text in <a> tag
    var ssearch = $(this).text();
    $("#querya").val(ssearch);
    $("#querya").submit();
  });
   
}); //close document.ready function
