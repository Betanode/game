var player1 = prompt("Enter Player1 Name");
var play1color =  'rgb(86, 151, 255)';
var player2 = prompt("Enter Player2 name");
var play2color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

function reportWin(rowN , colN){
  console.log("You won at " + rowN + "and" + colN);
}

function changeColor(rn , cn , color){
  return table.eq(rn).find('td').eq(cn).find('button').css('background-color',color);
}

function returnColor(rn , cn){
  return table.eq(rn).find('td').eq(cn).find('button').css('background-color');
}

function firstGrey(cn){
  var color = returnColor(4,cn);
  for(var i = 4;i>-1;i--){
    color = returnColor(i,cn);
    if(color === 'rgb(128, 128, 128)'){
      return i;
    }
  }
}

function checkc(a,b,c,d){
  return (a===b && a===c && a===d && a!=='rgb(128, 128, 128)' && a!=='undefined')
}


function horiWin(){
  for(var i = 0 ; i<5 ; i++){
    for(var j = 0; j<6 ; j++){
      if(checkc(returnColor(i,j),returnColor(i,j+1),returnColor(i,j+2),returnColor(i,j+3))){
        reportWin(i,j);
        return true;
      }
      else{
        continue;
      }
    }
  }
}

function colWin(){
  for(var i = 0 ; i<6 ; i++){
    for(var j = 0; j<5 ; j++){
      if(checkc(returnColor(j,i),returnColor(j+1,i),returnColor(j+2,i),returnColor(j+3,i))){
        reportWin(j,i);
        return true;
      }
      else{
        continue;
      }
    }
  }
}

function diaWin(){
  for(var i = 0; i <6 ;i++){
    for(var j = 0 ;j<5 ;j++){
      if(checkc(returnColor(j,i),returnColor(j+1,i+1),returnColor(j+2,i+2),returnColor(j+3,i+3))){
        reportWin(j,i);
        return true;
      }
      else if (checkc(returnColor(j,i),returnColor(j-1,i+1),returnColor(j-2,i+2),returnColor(j-3,i+3))){
        reportWin(j,i);
        return true;
      }
      else{
        continue;
      }
    }
  }
}

var curr = 1;
var currName = player1;
var currColor = play1color;
$('h3').text(currName + " You Go first");
$('.chips button').on('click',function(){
  var col = $(this).closest('td').index();
  var bot = firstGrey(col);
  changeColor(bot , col , currColor);
  if(horiWin() || colWin() || diaWin()){
    $('h1').text("Hurrah "+ currName + " Won");
    $('h2').fadeOut("fast");
    $('h3').fadeOut('fast');
    return;
  }
  curr = curr*-1;
  if(curr === 1){
    currName = player1;
    $('h3').text(currName + " Your Turn");
    currColor = play1color;
  }
  else{
    currName = player2;
    $('h3').text(currName + " Your Turn");
    currColor = play2color;
  }
})
