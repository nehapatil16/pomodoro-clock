
var mm = document.getElementById("minute");
var ss = document.getElementById("second");
var start = document.getElementById("start");
var reset =  document.getElementById("reset");

var headings = document.getElementById("heading");
var sessiontime = document.getElementById("session");
var breaktime = document.getElementById("break");

var sessionplus = document.getElementById("sessionplus");
var sessionminus = document.getElementById("sessionminus");
var breakplus = document.getElementById("breakplus");
var breakplus = document.getElementById("breakplus");

var currentTime = 0;
var isRunning = false;
var clockId = 0;

var session = sessiontime.innerText;
var breaks = breaktime.innerText;
var heading = headings.innerText;

function updateTime()
{
  var minutes = parseInt(currentTime/60);
  var seconds = currentTime%60;

  mm.innerHTML = minutes;
  ss.innerHTML = seconds;
}

function updateButton()
{
  if(isRunning)
  {
    start.innerText = "Pause";
    return;
  }
  start.innerText = "Start";
}

start.addEventListener("click",function(){
  isRunning = !isRunning;
  updateButton();
  
  if(isRunning)
  {
    clockId = setInterval(function()
    {
      currentTime++;
      updateTime();
      heading = headings.innerText;
      if(heading == "-- Session Time --" && (currentTime/60) == session)
      {
        isRunning = false;
        clearInterval(clockId);
        currentTime = 0;
        updateTime();
        updateButton();
        headings.innerText = "-- Break Time --";
        start.click();
      }
      if(heading == "-- Break Time --" && (currentTime/60) == breaks)
      {
        isRunning = false;
        clearInterval(clockId);
        currentTime = 0;
        updateTime();
        updateButton();
        headings.innerText = "-- Session Time --";
        start.click();
      }
    },1000);
    console.log(currentTime);
  }
  else
  {
    clearInterval(clockId);
  }
});

reset.addEventListener("click", function(){
  isRunning = false;
  updateButton();
  clearInterval(clockId);
  currentTime = 0;
  updateTime();
  if(heading == "-- Break Time --")
  {
    headings.innerText = "-- Session Time --";
  }
});

sessionplus.addEventListener("click", function()
{
  if(isRunning)
  {
    return;
  }
  sessiontime.innerText = ++session;
});
sessionminus.addEventListener("click", function()
{
  if(isRunning)
  {
    return;
  }
  if(session == 1)
  {
    return;
  }
  sessiontime.innerText = --session;
});
breakplus.addEventListener("click", function()
{
  if(isRunning)
  {
    return;
  }
  breaktime.innerText = ++breaks;
});
breakminus.addEventListener("click", function()
{
  if(isRunning)
  {
    return;
  }
  if(breaks == 1)
  {
    return;
  }
  breaktime.innerText = --breaks;
});




