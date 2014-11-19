function processData(data) {

  var outputData = {}; //initialize array

  // handle case of search error
  if (typeof data.query === 'undefined') {
    $('#mylist').html("<h3>No results found.</h3>");
    return;
  } 

  // handle case of 0 results found
  if (!data.query.results) {
    $('#mylist').html("<h3>No results found.</h3>");
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

