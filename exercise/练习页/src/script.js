

/*
 * based on this dribbble shot by Andrew Baygulov: https://dribbble.com/shots/6427548-Kaiser-Slideshow
 */

(function ($) {
    var isActive = false;

    $.fn.shuffleText = function(shuffleResult, options){
        var $this = $(this);

        // Add/Remove Chars You Want To Appear During Shuffle In This Array
        var aChars = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","k","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");

        // Defaults Settings
        var defaults = $.extend({
            time     : 40,    // Time In ms (Milliseconds) Of Shuffle For Each Letter
            maxTime  : 1000,  // Max Time In ms (Milliseconds) Of Global Shuffle
            amount   : 3,     // Amount Of Shuffle For Each Letter
            complete : null   // Do Something When Shuffle Is Completed
        }, options);

        if(shuffleResult == undefined)
            shuffleResult = '';

        // Init Variables
        var aToShuffle     = $this.text().split(''),
            aShuffleResult = shuffleResult.split(''),
            iFlag = 0, n = 0, duration = 0, iLenght = 0,
            interval, aLetters;

        if(!isActive){
            isActive = true;
            // Launch Shuffle
            return $this.each(function(){
                replaceEntry();

                aLetters = $this.find('span');

                // Debugging
                if(defaults.amount < 0)
                    defaults.amount = 0;

                // Calculate Duration Of Global Shuffle
                if((iLength * (defaults.amount + 1) * defaults.time) > defaults.maxTime){
                    duration = defaults.maxTime / (iLength * (defaults.amount + 1));
                }else{
                    duration = defaults.time;
                }

                randomChars();
                interval = setInterval(randomChars,Math.floor(duration));

                // Create The Correct DOM Structure
                function replaceEntry(){
                    $this.empty();

                    if(aToShuffle.length > aShuffleResult.length)
                        iLength = aToShuffle.length;
                    else
                        iLength = aShuffleResult.length;

                    for(i = 0; i < iLength; i++){
                        if(aToShuffle[i] == undefined)
                            $this.append($('<span></span>'));
                        else
                            $this.append($('<span>'+aToShuffle[i]+'</span>'));
                    }
                }

                // The Shuffle Function
                function randomChars(){
                    var randomChars = aChars[Math.floor(Math.random() * aChars.length)];

                    if(iFlag >= iLength){
                        isActive = false;
                        $this.text(shuffleResult);

                        clearInterval(interval);
                        if(typeof defaults.complete == 'function')
                            defaults.complete.call($this);
                    }else{
                        if(n == defaults.amount){
                            if(iFlag >= aShuffleResult.length)
                                $(aLetters[iFlag]).text('');
                            else
                                $(aLetters[iFlag]).text(aShuffleResult[iFlag]);

                            iFlag++; n = 0;
                        }else{
                            $(aLetters[iFlag]).text(randomChars);
                            n++;
                        }
                    }
                }
            });
        }
    };
}(jQuery));


$("#trigger").click(function(){
      $('.card').removeClass("active");
      $('#wrapper').prepend($('#wrapper .card:last'));
      $(this).addClass("flash");
      $('#wrapper').addClass("flash");
      $('.card:nth-of-type(2)').addClass("active");
      $text = $('.active .word').text();
      setTimeout(function(){
        $(".active .word").shuffleText($text, {
          frames   : 2000,  
          maxSpeed : 1,
          amount   : 35,
          complete : null  
          });
        
          }, 1200);
      setTimeout(function(){
        $("#trigger").removeClass("flash");
        $("#wrapper").removeClass("flash");
        
                }, 2000);
});