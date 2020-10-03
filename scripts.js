// -- * estetic/animations * --
// $(document).ready(function(){
  
//   var $moveable = $('.card');
//   var PosY = parseInt($('.card').css('top'), 10);
//   var PosX = parseInt($('.card').css('right'), 10);
  
//   $(".wrapper").mousemove(function(e){
//       $('.card').css({'top': PosY- e.pageY/40 , 'right': PosX - e.pageX/40});
//   });
// });


function addGlow(){
  $(".card").addClass("shadow");
}

function removeglow(){
  setTimeout(removeShadow, 2000);
  
}

function removeShadow(){
  $("div").removeClass("shadow");
}

var key="";
var ytURL ="";

function getVidData(id) {
  
  addGlow();
  removeglow();
  
  var inputVal = document.getElementById("urlSearch").value;
  var videoID= inputVal.split('=').pop();
  
  // api config
  var key= "AIzaSyAWjPHJXsNumD_0zeabUAvbT6GpNX1CGD8";

  ytURL = "https://www.googleapis.com/youtube/v3/videos?id="+videoID+"&key="+key+"&part=snippet,statistics";
  
  
  fetch(ytURL)
  .then(result => result.json())
  .then(json => {
    
    $("#vidName").text(json.items[0].snippet.title);
    document.getElementById("image").innerHTML="<img class='thumbnail' src="+json.items[0].snippet.thumbnails.medium.url+">";
    var thisViews = json.items[0].statistics.viewCount;
    $("#views").text(thisViews.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
    $("#likes").text(json.items[0].statistics.likeCount);
    $("#dislikes").text(json.items[0].statistics.dislikeCount);
    $("#comments").text(json.items[0].statistics.commentCount);
   });
   $(".card").css("display", "block");
  $(".mainView").height("80vh");
  
}


// grab youtube ID.
var urlSubmit = document.getElementById("urlSubmit");

var channelID= "UCrKZcyOJVWnJ60zM1XWllNw";

//var topTenURL = "https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCrKZcyOJVWnJ60zM1XWllNw&key=AIzaSyAWjPHJXsNumD_0zeabUAvbT6GpNX1CGD8&maxResults=50";


//3.get playlist from uploads' object
//var channelDetails = https://www.googleapis.com/youtube/v3/channels?part=contentDetails&key=AIzaSyAWjPHJXsNumD_0zeabUAvbT6GpNX1CGD8&id=UCrKZcyOJVWnJ60zM1XWllNw

//var playListID = channelDetails.items.contentDetails.uploads;


//4.
//https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUrKZcyOJVWnJ60zM1XWllNw&key=AIzaSyAWjPHJXsNumD_0zeabUAvbT6GpNX1CGD8&maxResults=10

$(document).ready(function() {
  // api config
  var key= "AIzaSyAWjPHJXsNumD_0zeabUAvbT6GpNX1CGD8";
  
  //this week's playlist
  var playlistID = "PL4fGSI1pDJn69On1f-8NAvX_CYlx7QyZc";
  
  var topTenURL = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId="+playlistID+"&key="+key+"&maxResults=10"
  
  var countArray = [];
  
  fetch(topTenURL)
  .then(result => result.json())
  .then(json => {
    
    //iterate over 10 items
    for (var i = 0; i < 10 ; i++){
      
      //videoID
      var videoID = json.items[i].snippet.resourceId.videoId;
      //console.log(videoId);
      var viewCount = "";
     
      var imgNode = document.createElement("LI");
      var smTitle = json.items[i].snippet.title;
      var smallerT = smTitle.substring(0,20);
      
      imgNode.classList.add("smCard");
      
      
      //add all data to var
        imgNode.innerHTML = "<img style='width:100%;' src="+json.items[i].snippet.thumbnails.default.url+"><br><span class='smTitle'>"+smallerT+"..."+"</span><br><button class='smDetailsButton' onclick='selectThisVideo(this.value)' value="+json.items[i].snippet.resourceId.videoId+">buy</button>";
      
      //push data to each card
      document.getElementById("vid1").appendChild(imgNode);
      
    }
    
  });
  
})


function showModal(val){
  
  // api config
    var key= "AIzaSyAWjPHJXsNumD_0zeabUAvbT6GpNX1CGD8";
    
      var ytURL = "https://www.googleapis.com/youtube/v3/videos?id="+val+"&key="+key+"&part=snippet,statistics";
      console.log(ytURL);
      
      //fetch to specific video
      fetch(ytURL)
      .then(result => result.json())
      .then(json => {
        
        //grab viewCount
        var viewCount = json.items[0].statistics.viewCount;
        document.getElementById("numViews").innerHTML = "test";
        
        // console.log(viewCount);
        
        // ytURL = "https://www.googleapis.com/youtube/v3/videos?id="+val+"&key="+key+"&part=snippet,statistics";

        document.getElementById("image").innerHTML="<img class='thumbnail' src='http://img.youtube.com/vi/"+json.items[0].snippet.thumbnails.medium.url+"/0.jpg+";
        
        
        $("#views").text(json.items[0].statistics.viewCount);
        $("#likes").text(json.items[0].statistics.likeCount);
        $("#dislikes").text(json.items[0].statistics.dislikeCount);
        $("#comments").text(json.items[0].statistics.commentCount);  
        
      });
  
}

//when clicking video to add
 function grabVideoID(){
   //   grab id from searchBox
  var inputVal = document.getElementById("urlSearch").value;
  var videoID= inputVal.split('=').pop();
   
   selectThisVideo(videoID);
 }

// --- MODAL FOR ORDER CONFIRMATION --
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//select video span on row
var videoSelect = document.getElementById('videoSelect');

//select video span on row
var priceSelect = document.getElementById('priceSelect');

//select thumbnail on clicked item
var vidThumbNail = document.getElementById('thumbNail');

function selectThisVideo(val) {
  modal.style.display = "block";
  var key= "AIzaSyAWjPHJXsNumD_0zeabUAvbT6GpNX1CGD8";
  
  var ytURL = "https://www.googleapis.com/youtube/v3/videos?id="+val+"&key="+key+"&part=snippet,statistics";
  console.log(ytURL);
  fetch(ytURL)
      .then(result => result.json())
      .then(json2 => {
    
      //create image tag
      var imgStyle = vidThumbNail.appendChild(document.createElement('img'));

      //design image tag
      imgStyle.src=json2.items[0].snippet.thumbnails.default.url;
      imgStyle.classList.add("circleID");
    
      var videoName = json2.items[0].snippet.title;
      document.getElementById("videoName").innerHTML = videoName;
      var stringViews = json2.items[0].statistics.viewCount;
      var numberViews = stringViews.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      document.getElementById("numViews").innerHTML = numberViews + " views <span class='desc-trend'><ion-icon name='flash'></ion-icon></span>";
      var currentPrice = document.getElementById("priceSelect");
      var fixedPrice = stringViews/10000000;
      var moneyPrice = "$"+fixedPrice.toFixed(2);
      currentPrice.innerHTML = moneyPrice ;
    
      //modal math
    var numberShares = document.getElementById("numberShares");
    var priceSelect = document.getElementById("priceSelect");
    var totalPurchase = document.getElementById("totalPurchase");

    //multiply on keyup
    numberShares.onchange = function(){
      //console.log(numberShares.value);
      //console.log(parseFloat(priceSelect.innerHTML.slice(1,-1)).toFixed(2));
      document.getElementById("totalPurchase").innerHTML = "$"+ (parseInt(fixedPrice)*numberShares.value);
    };
      
  })
};




// When the user clicks on (x), or cancel close the modal
  
var cancel = document.getElementsByClassName("close");
for (var y = 0; y < cancel.length; y++){
  cancel[y].onclick = function() {
    modal.style.display = "none";

    //removes recently added img
    document.querySelectorAll('.circleID').forEach(function(a){
      a.remove()
    });
 }

}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    
    //removes recently added img
   document.querySelectorAll('.circleID').forEach(function(a){
    a.remove()
    });
  }
}


// MODAL/Bet SUBMIT

var successModal = document.getElementById("modalSuccess");

var currentModal = document.getElementById("myModal");


function submit(){
  //hide confirm
  currentModal.style.display = "none";
  //show success
  successModal.style.display = "inline-block";
}

function restart(){
  //back to main
  modal.style.display = "none";
  successModal.style.display = "none";
  
  //removes recently added img
   document.querySelectorAll('.circleID').forEach(function(a){
    a.remove()
    });
  
    //clear input field and total cost from past transaction
    document.getElementById('numberShares').value = '';
    document.getElementById('totalPurchase').innerHTML = '';
}