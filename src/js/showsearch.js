function showSearchResults(mydata) {

  $.each(mydata, function (i, entry) {

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

  });
}
