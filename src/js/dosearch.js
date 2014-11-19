function doSearch (e){

    e.preventDefault(); // suppress form submit

    $.mobile.changePage('#search-results');

    // jqm loading widget
    $.mobile.loading( 'show', {
      text: "Loading...",
      textVisible: true,
      theme: "b",
    });
    
    $('#mylist').empty(); // clear old results from dom

    // sync input between search bars from both jqm pages
    if (this.id == "forma") {
      $("#queryb").val($('#querya').val()); // sync querya to queryb
    } else {
      $("#querya").val($('#queryb').val()); // sync queryb to querya
    }
    var input = $('#querya').val(); // get input from form (both forms should now be the same)
    // handle searches that contain spaces
    input = input.replace(" ","+");
    
    // build yql & nativeplantcenter query
    var apitemplate = 'http://query.yahooapis.com/v1/public/yql?q=@yqlquery&env=store://datatables.org/alltableswithkeys&callback=?';
    var yqlquery = encodeURIComponent('select * from html where url="http://www.nativeplantcenter.net/?q=database&count=-1&keyword='+input+'" and xpath=\'//div[contains(@class,"database_entry matrix_entry")]\'');    
    api = apitemplate.replace("@yqlquery",yqlquery);

    // run yql/npc query
    $.getJSON(api, {
      format: "json"
    })
    // runs when $.getJSON() completes 
    .done(function (data) {
      // process search data into nice format
      mydata = processData(data);
      // build html if data exists
      if (mydata) {
        showSearchResults(mydata);
      }
      // remove loading message
      $.mobile.loading( 'hide');
      // create event handler for click on search results
      $(document).on('click', 'a.search-result', function() {
        showResultDetail.call(this,mydata);
      }); 
    });
}
