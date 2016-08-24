(function () {
  'use strict';

  // if we're not in print mode start impress
  if ( !window.location.search.match(/print/) ) {


  //and inject svgs
  var mySVGsToInject = document.querySelectorAll('img.svg');
  SVGInjector(mySVGsToInject);


    if (impress) {
      try{
        impress().init();

        //video 
        var video = document.querySelector('video');
        if(video){
          document.addEventListener('impress:stepenter', function(e){
            if(e.srcElement.id == 'in-action-2'){
              video.addEventListener('click', function(){
                if (video.requestFullscreen) {
                  video.requestFullscreen();
                } else if (video.mozRequestFullScreen) {
                  video.mozRequestFullScreen();
                } else if (video.webkitRequestFullscreen) {
                  video.webkitRequestFullscreen();
                }
                video.play();
              })
              
            }else{
               video.pause();
               video.currentTime = 0;
            }
          });
        }
      }catch(e){
        //no impress maybe we are in ASQ
      }

      //on ESC go to overview
      document.addEventListener("keydown", function ( event ) {
        if ( event.keyCode == 27 ) {
            event.preventDefault();
            try{
              impress().goto("overview");
            }catch(e){
              //no impress maybe we are in ASQ
            }
          }
      }, false);          
    }

    if (typeof hljs != "undefined") {
         hljs.initHighlightingOnLoad();
    }

  } else {
    //show all substeps
    var substeps = document.querySelectorAll(".substep");
    Array.prototype.forEach.call(substeps,function(dom, index) {
      dom.classList.add("active");
    });

    //we use the preview class on print
    document.body.classList.add("preview");
  }

  //Add slide counters
  var forEach = Array.prototype.forEach
    , keys = Object.keys
    , steps = document.querySelectorAll("div.step:not([data-support='true'])")

  forEach.call(steps, function (dom, index) {
      if (dom.id !== 'overview') {
          var wrap = document.createElement("div");
          wrap.className = 'wrap';
          while (dom.firstChild) {
              wrap.appendChild(dom.firstChild);
          }
          dom.appendChild(wrap);
          var counter = wrap.appendChild(document.createElement('div'));
          counter.className = "counter";
          counter.innerHTML = (index + 1) + " / " + steps.length;
      }
  });

  if ("ontouchstart" in document.documentElement) { 
      document.querySelector(".hint").innerHTML = "<p>Tap on the left or right to navigate</p>";
  }

  if ( window.location.search.match(/print/) ) {
    window.print();
  } 

}());