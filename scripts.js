const logo = document.querySelectorAll("#logo path");

for (let i = 1; i < logo.length;i++){
  console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
};

// delay subheading visibility
setTimeout(function(){
  var subHeading = document.getElementById('subHeading');
  subHeading.style.visibility = "visible";
  removeGlow(); 
},3000);

function removeGlow(){
  setTimeout(function(){
  var subHeading = document.getElementById('subHeading');
  
  subHeading.style.textShadow = "none";
  },1500);

}



// bootstrap active navbar

  