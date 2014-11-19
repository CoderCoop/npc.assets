function showResultDetail(mydata) {
  
    // clear old results
    $('#entry-detail-a').empty();
    $('#entry-detail-b').empty();
    
    // remove old popup divs
    $('.ui-popup-container').remove(); 
    $('.ui-popup-screen').remove(); 
  
    // get current plant id from <a id="">
    var myplant = $(this).attr('id'); 
 
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
  

}
