function processSearchData(data) {

  var foodata = {}; //initialize array

  // handle case of search error
  if (typeof data.query === 'undefined') {
    $('#mylist').html("<h3>No results found.</h3>");
    $.mobile.loading( 'hide');
    return;
  } 

  // handle case of 0 results found
  if (!data.query.results) {
    $('#mylist').html("<h3>No results found.</h3>");
    $.mobile.loading( 'hide');
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
    
//    console.log(plantid);
    
    /*//remove leading punctuation TODO
    for (var x in entry) {
      entry.x = entry.x.replace(":  ","");
      entry.x = entry.x.replace(": ","");
    } 
    */     

    // save entry into foodata array
    foodata[plantid]=entry;
  });
  
//  console.log(JSON.stringify(foodata));
  
  return foodata;
}


function displaySearchResults(bardata) {  

//  console.log(bardata);

  $.each(bardata, function (i, entry) {

//  console.log(entry);

  //create li
  $listitem = $('<li>'); 
  
  //create link
  $itemlink = $('<a>').attr({
    "href":"#details-page",
    "class":"search-result",
    "id":plantid,
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
  
  // remove loading message
  $.mobile.loading( 'hide');
  });
}
  
