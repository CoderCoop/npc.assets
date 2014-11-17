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
  
  // create array to hold result data
  var entry = new Array();
  
  // assign values from json
  entry["url"]=div.div[3].div.div[0].a.href; //plant url
  entry["thumb"]=div.div[0].a.img.src; //thumbnail image
  entry["img"]=entry["thumb"].replace("thumbs/",""); //full size image  
  entry["species"]=div.div[1].a.content; //scientific name
  entry["name"]=div.div[2].p; //common name  
  entry["commonNames"]=div.div[3].div.div[1].p.content; // all common names
  entry["plantTypes"]=div.div[3].div.div[2].p; // plant types
  entry["sunExposure"]=div.div[3].div.div[3].p; // sun exposure
  entry["soilTexture"]=div.div[3].div.div[4].p; // soil texture
  entry["soilMoisture"]=div.div[3].div.div[5].p; // soil moisture
  entry["region"]=div.div[3].div.div[6].p; // region
  
  
  // extract numeric plant id from url
  plantid = entry["url"].split("/").pop(); 
  
  //remove leading punctuation
  for (var x in entry) {
    entry[x] = entry[x].replace(":  ","");
    entry[x] = entry[x].replace(": ","");
  }      

  // save entry into mydata array
  mydata[plantid]=entry;


//----------------------


  
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
  $( "<img>").attr( "src", entry["thumb"] ).appendTo( $itemlink );
  
  // create html element with species name
  $('<h3>', {text:entry["species"]}).appendTo( $itemlink ); 

  // create html element with name
  $('<p>', {text:entry["name"]+entry["commonNames"]}).appendTo( $itemlink );

  // create html element plant type
  $('<p>', {
    text:"Plant Type: "+entry["plantTypes"],
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
