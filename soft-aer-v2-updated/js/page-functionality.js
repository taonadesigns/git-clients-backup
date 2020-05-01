var visibleDiv = 0;

function showDiv(){
  $(".content").hide();
  $(".content:eq(" + visibleDiv + ")").show();
}
showDiv();

function showNext(){
  if(visibleDiv == $(".content").length-1){
    visibleDiv = 0;
  }else {
    visibleDiv++;
  }
  showDiv();
}

function showPrev(){
  if(visibleDiv == 0){
    visibleDiv = $(".content").length-1;
  }else {
    visibleDiv--;
  }
  showDiv();
}

function resetForm() {
  document.getElementById("content-holder").reset();
}
