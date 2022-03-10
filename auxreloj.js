!function(){

    window.oc.startTime=new Date().getTime() / 1000;
    window.oc.countDirection=1;
    window.oc.scale=2.0;
    window.oc.repeatMode=0;
    window.oc.showMilliseconds=false;
    window.oc.countdownExpired=function()
    {
        if(window.oc.repeatMode > 0)
        {
            if(window.oc.editor)
            {
                window.oc.editor.countdownExpired();
            }
            else
            {
                if(oc.timerRef)clearInterval(oc.timerRef);
                location.reload();
            }
        }
    }
    
    
      __scope_oc = window.oc
    var $__container_oc, backgroundPositionFor, pad, periods, update;
    
    $__container_oc = $("#cdt");
    
    periods = {
      d: 60 * 60 * 24,
      h: 60 * 60,
      m: 60
    };
    
    var animCount = 0;
    var previousLabel, requestId;
    var animations = [];
    pad = function(n) {
      while (n.toString().length < 2) {
        n = "0" + n;
      }
      return n;
    };
    
    backgroundPositionFor = function(value) {
      if(value === "x")
      {
        return {x: Math.round(-40 * __scope_oc.scale) * 7 + Math.round(-12 * __scope_oc.scale), y: (Math.round(-40 * __scope_oc.scale) * 10 -0)}
      }
      var x, y;
      value = parseInt(value);
      if ((value % 2) === 0) {
        x = Math.round(-40 * __scope_oc.scale) * 6 + Math.round(-5 * __scope_oc.scale);
      } else {
        x = Math.round(-5 * __scope_oc.scale);
      }
      if(value == 0)y = (Math.round(-40 * __scope_oc.scale) * 10 -0);
      else y = (Math.round(-40 * __scope_oc.scale)  * value -0);
      return {
        x: x,
        y: y
      };
    };
    
    update = function() {
      var bgPos, days, elapsedTime, element, extraSpacing, hours, index, items, label, minutes, now, numBlanks, pos, prox, seconds, seperatorMargin;
      now = new Date().getTime() / 1000;
      elapsedTime = now - __scope_oc.startTime;
      elapsedTime *= __scope_oc.countDirection;
      prox = Math.max(0, Math.round(__scope_oc.remainingTimeAtStartTime - elapsedTime));
      if (prox === 0) {
        __scope_oc.countdownExpired();
      }
      days = prox - prox % periods.d;
      hours = prox - days - prox % periods.h;
      minutes = prox - days - hours - prox % periods.m;
      seconds = prox - days - hours - minutes;
      label = [days / periods.d, pad(hours / periods.h), pad(minutes / periods.m), pad(seconds)].join("x");
      items = $__container_oc.find('.counter-item');
      index = items.length;
      numBlanks = index - label.length;
      while (index--) {
        element = items[index];
        $(element).removeClass();
        $(element).addClass("counter-item");
        var currentChar = label.charAt(index - numBlanks);
        if(previousLabel === undefined){
          bgPos = backgroundPositionFor(currentChar);
          $(element).css('background-position', bgPos.x + "px " + bgPos.y + "px");
    
        }
        else if(currentChar !== previousLabel.charAt(index - numBlanks))
        {
          runAnimationForChanges(element, previousLabel.charAt(index - numBlanks), currentChar)
        }
        else {
          bgPos = backgroundPositionFor(currentChar);
          $(element).css('background-position', bgPos.x + "px " + bgPos.y + "px");
        }
    
    
        if ((index - numBlanks) >= 0) {
          $(element).addClass("digit item-0");
          if(label.charAt(index - numBlanks) === "x"){
            var sepPos = backgroundPositionFor("x");
            $(element).css('background-position', sepPos.x + "px " + sepPos.y + "px");
            $(element).addClass("digit digit-x");
          }
          //$(element).addClass("spr digit item-0 digit-" + (label.charAt(index - numBlanks)) + "");
        }
      }
      //runAnimationForChanges(label);
      pos = Math.round(($__container_oc.find(".days").innerWidth() - 60 * __scope_oc.scale) / 2);
      $__container_oc.find(".days .unit-label").css("left", pos + "px");
      extraSpacing = numBlanks * 30 * __scope_oc.scale;
      seperatorMargin = Math.round(extraSpacing / 6);
      $__container_oc.find(".digit-x").css("margin-left", seperatorMargin + "px");
      previousLabel=label;
      $__container_oc.find(".digit-x").css("margin-right", seperatorMargin + "px");
    };
    
    function startAnimationFrame(){
      stopAnimationFrame();
      requestId = requestAnimationFrame(run);
    }
    
    function stopAnimationFrame(){
      if (requestId) {
         window.cancelAnimationFrame(requestId);
         requestId = undefined;
      }
    }
    
    function runAnimationForChanges(element, oldValue, newValue) {
    
      animations.push({element: element, oldValue: oldValue, newValue: newValue});
      startAnimationFrame();
    }
    
    
    update();
    
    run = function(timecode){
      var numAnims = animations.length;
      var currentAnim, element;
      var amount = animCount / 3;
      var roundedAmount = Math.floor(amount)
      while(numAnims--){
        currentAnim = animations[numAnims];
        element = currentAnim.element;
        bgPos = backgroundPositionFor(currentAnim.oldValue);
    
        var xStep = (currentAnim.oldValue % 2) ? -40 : 40;
        $(element).css('background-position', (bgPos.x + roundedAmount * Math.round(xStep * __scope_oc.scale)) + "px " + (bgPos.y +amount * 6.6 * __scope_oc.scale)  + "px");
      }
    
    
    
      if (roundedAmount < 6){
        startAnimationFrame();
      }
      else {
        animations = [];
        animCount = 0;
      }
      // else {
      //   setTimeout(resetAnim, 1000);
      // }
      animCount ++;
    }
    
    // resetAnim = function(){
    //   animCount = 0;
    //   run(false)
    // }
    //
    // animate = function(){
    //   animCount = 0;
    //   startAnimationFrame();
    // }
    
    if (__scope_oc.timerRef) {
      clearInterval(__scope_oc.timerRef);
    }
    
      __scope_oc.timerRef = setInterval(update, 100);
      //__scope_oc.timerRef = setInterval(animate, 3000);
      __scope_oc.updateCountdownClock = update
    
    }.call(this);