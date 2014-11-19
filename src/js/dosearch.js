function doSearch (e){

    e.preventDefault(); // suppress form submit

    //   console.log(this.id); // debug

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
    }
    else {
      $("#querya").val($('#queryb').val()); // sync queryb to querya
    }

    var input = $('#querya').val(); // get input from form (both forms should now be the same)

    // handle searches that contain spaces
    input = input.replace(" ","+");
    
    // build yql & nativeplantcenter query
    var api = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.nativeplantcenter.net%2F%3Fq%3Ddatabase%26count%3D-1%26keyword%3D" + encodeURIComponent(input) + "%22%20and%20xpath%3D'%2F%2Fdiv%5Bcontains(%40class%2C%22database_entry%20matrix_entry%22)%5D'&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?";

    // console.log(api); //debug

    // run jquery function
    $.getJSON(api, {
      format: "json"
    })
    
    // runs when $.getJSON() completes 
    .done(function (data) {
      // process data into nice format
      mydata = processSearchData(data);
      // build html from data
      showSearchResults(mydata);
      // remove loading message
      $.mobile.loading( 'hide');
      
    });
}
