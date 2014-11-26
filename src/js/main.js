var $ = require('jquery');
$.mobile = require('jquery-mobile');



//----------------------------


function npcsearch() {
  this.mydata={};
}

//start a search using the current form input
npcsearch.prototype.dosearch = function(form) {

  $.mobile.changePage('#search-results');
  $('#mylist').empty(); // clear old results from dom

  // jqm loading widget
  $.mobile.loading( 'show', {
    text: "Loading...",
    textVisible: true,
    theme: "b",
  });
  

  // sync input between search bars from both jqm pages
  if (form.id == "forma") {
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

  var self = this; // keep object in scope

  // run yql/npc query
  $.getJSON(api, {
    format: "json"
  })
  // runs when $.getJSON() completes 
  .done(function (data) {
  
    // process search data into nice format
    self.mydata = processData(data);
    
    // build html if data exists, otherwise show user error
    if (self.mydata) {
      showSearchResults(self.mydata);
    }
    else {
      $('#mylist').html("<h3>No results found.</h3>");
    }
    // remove loading message
    $.mobile.loading( 'hide');
  });
}; 

// show detail of a selected search result
// takes plant id as input
npcsearch.prototype.showResultDetail = function (id) {

  // use mydata from main object  
  var mydata = this.mydata;

  // get current plant id from <a id="">
  var myplant = id; 

  // clear old results
  $('#entry-detail-a').empty();
  $('#entry-detail-b').empty();
  
  // remove old popup divs
  $('.ui-popup-container').remove(); 
  $('.ui-popup-screen').remove(); 


  // display plant species name
  $('#entry-detail>h3').text(mydata[myplant].species); 
  
  // create popup link
  $imagelink= $('<a>').attr({
    "href":"#myPopup"+myplant,
    "data-rel":"popup",
    "data-position-to":"window"
  }); 
  
  // add image inside popup link
  $imagelink.append($('<img>').attr({
    "src":mydata[myplant].img ,
    "class":"bigimage"
  }));
  
  // add image and link to trigger popup
  $('#entry-detail-a').append($imagelink);
  
  
  // create div to hold popup image
  $popupdiv = $('<div>').attr({
    "data-role":"popup",
    "id":"myPopup"+myplant,
    "class":"photopopup",
    "data-overlay-theme":"b"
  });
  
  //add close button to popup div
  $popupdiv.append($('<a>').attr({
    "href":"#",
    "data-rel":"back",
    "class":"ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right",
  }));

  // add popup image to div
  $popupdiv.append($('<img>').attr({
    "src": mydata[myplant].img,
  }));
  
  // add the popup div
  $('#entry-detail-a').append($popupdiv);
  
  // call popup function because dom has been modified
  $( "#myPopup"+myplant ).popup();

  // popup image scaling http://demos.jquerymobile.com/1.4.2/popup-image-scaling/    
  $( ".photopopup" ).on({
    popupbeforeposition: function() {
      var maxHeight = $( window ).height() - 60 + "px";
      $( ".photopopup img" ).css( "max-height", maxHeight );
      //console.log("maxHeight: "+maxHeight);
    }
  });
  
  // entry details plant info
  $('#entry-detail-b').append(
    $('<div>').html('Common Names: <span>'+mydata[myplant].name+mydata[myplant].commonNames+"</div>"),
    $('<div>').html('Plant Type: <span>'+mydata[myplant].plantTypes+"</div>"),
    $('<div>').html('Sun Exposure: <span>'+mydata[myplant].sunExposure+"</div>"),
    $('<div>').html('Soil Texture: <span>'+mydata[myplant].soilTexture+"</div>"),
    $('<div>').html('Soil Moisture: <span>'+mydata[myplant].soilMoisture+"</div>"),
    $('<div>').html('Region: <span>'+mydata[myplant].region+"</div>"),
    $('<div>').html('<a id="learn-more" class="ui-btn ui-corner-all ui-shadow ui-btn-icon-right ui-icon-arrow-u-r" href="'+mydata[myplant].url+'">Learn More</a>')
  );
};



// process query data and return nicely formatted object
function processData (data) {

  var outputData = {}; //initialize array


  // handle case of search error
  if (typeof data.query === 'undefined') {
    return;
  } 
  // handle case of 0 results found
  if (!data.query.results) {
    return;
  } 
    
  // handle case of only 1 result returned     
  if (typeof data.query.results.div[0] === 'undefined') {  
    data.query.results.div = new Array(data.query.results.div);
  }

  //iterate through each result          
  $.each(data.query.results.div, function (i, div) {
    
    // create object to hold result data
    // assign values from json
    var entry = {
      "url" : div.div[3].div.div[0].a.href, //plant url
      "thumb" : div.div[0].a.img.src, //thumbnail image
      "img" : div.div[0].a.img.src.replace("thumbs/",""), //full size image
      "species" : div.div[1].a.content, //scientific name
      "name" : div.div[2].p, //common name  
      "commonNames" : div.div[3].div.div[1].p.content, // all common names
      "plantTypes" : div.div[3].div.div[2].p, // plant types
      "sunExposure" : div.div[3].div.div[3].p, // sun exposure
      "soilTexture" : div.div[3].div.div[4].p, // soil texture
      "soilMoisture" : div.div[3].div.div[5].p, // soil moisture
      "region" : div.div[3].div.div[6].p, // region
    };
    
    // extract numeric plant id from url
    plantid = entry.url.split("/").pop(); 
    
    //remove leading punctuation
    $.each(entry,function(key,value){
      entry[key]=entry[key].replace(":  ","");
      entry[key]=entry[key].replace(": ","");
    });
    
    // save entry into outputData array
    outputData[plantid]=entry;
  });

  return outputData;
}


// display search results
// takes processed query data as input
function showSearchResults (mydata) {

  $.each(mydata, function (i, entry) {

    //create li
    $listitem = $('<li>'); 
    
    //create link
    $itemlink = $('<a>').attr({
      "href":"#details-page",
      "class":"search-result",
      "id":i,
      "data-transition":"slide"
    }); 
    
    //create thumbnail image
    $( "<img>").attr( "src", entry.thumb ).appendTo( $itemlink );
    
    // create html element with species name
    $('<h3>', {text:entry.species}).appendTo( $itemlink ); 

    // create html element with name
    $('<p>', {text:entry.name+entry.commonNames}).appendTo( $itemlink );

    // create html element plant type
    $('<p>', {
      text:"Plant Type: "+entry.plantTypes,
      style:"font-style:italic"
    }).appendTo( $itemlink );
      
    // append link to list item
    $itemlink.appendTo($listitem);   
              
    // append row to main list
    $('#mylist').append($listitem);
    
    // trigger jquery mobile with newly built list
    $("#mylist").listview("refresh");

  });
}










//----------------------------





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
