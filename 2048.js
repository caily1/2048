// JavaScript Document
var board=new Array();
var score=0;
var noconflicted=new Array();
$(function(){
	newgame();
})
function newgame(){
	init();
	score=0;
	updateScore(score);
	genarateOneNumber();
	genarateOneNumber();
}
function genarateOneNumber(){
	if(!nospace()){
		return false;
	}
	var randX=parseInt(Math.floor(Math.random()*4));
	var randY=parseInt(Math.floor(Math.random()*4));
	while(true){
		if(board[randX][randY]==0){
			break;
		}else{
			randX=parseInt(Math.floor(Math.random()*4));
			randY=parseInt(Math.floor(Math.random()*4));
		}
	}
	var randNumber=Math.random()<0.5?2:4;
	board[randX][randY]=randNumber;
	showNumberAnimation(randX,randY,randNumber);
}
function showNumberAnimation(i,j,rnumber){
	var numberCell=$("#number-cell-"+i+"-"+j);
	numberCell.text(rnumber);
	numberCell.css("background",getNumberBackgroundColor(board[i][j]));
	numberCell.css("color",getNumberColor(board[i][j]));
	numberCell.animate({width:"100px",height:"100px",top:20+120*i,left:20+120*j},20);
}
function nospace(){
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			if(board[i][j]==0){
				return true;
			}	
		}
	}
	return false;
}
function init(){
	for(var i=0;i<4;i++){
		noconflicted[i]=new Array();
		board[i]=new Array();
		for(var j=0;j<4;j++){
			noconflicted[i][j]=0;
			board[i][j]=0;
			noconflicted[i][j]=false;
			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css("left",20+120*j);
			gridCell.css("top",20+120*i);
		}

	}
	updateBoardView();
}
function updateBoardView(){
	$(".number-cell").remove();
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			$("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'> </div>");
			if(board[i][j]==0){
				$("#number-cell-"+i+"-"+j).css("width","0px");
				$("#number-cell-"+i+"-"+j).css("height","0px");
				$("#number-cell-"+i+"-"+j).css("left",20+120*j);
				$("#number-cell-"+i+"-"+j).css("top",20+120*i);
			}else{
				$("#number-cell-"+i+"-"+j).css("width","100px");
				$("#number-cell-"+i+"-"+j).css("height","100px");
				$("#number-cell-"+i+"-"+j).css("left",20+120*j);
				$("#number-cell-"+i+"-"+j).css("top",20+120*i);
				$("#number-cell-"+i+"-"+j).css("background",getNumberBackgroundColor(board[i][j]));
				$("#number-cell-"+i+"-"+j).css("color",getNumberColor(board[i][j]));
				$("#number-cell-"+i+"-"+j).text(board[i][j]);
			}
			noconflicted[i][j]=false;
		}

	}
}
function getNumberBackgroundColor(number){
	switch (number) {
		case 2: return '#eee4da'; break;
		case 4: return '#ede0c8'; break;
		case 8: return '#f2b179'; break;
		case 16: return '#f59563'; break;
		case 32: return '#f67c5f'; break;
		case 64: return '#f65e3b'; break;
		case 128: return '#edcf72'; break;
		case 256: return '#edcc61'; break;
		case 512: return '#9c0'; break;
		case 1024: return '#33b5e5'; break;
		case 2048: return '#09c'; break;
		case 4096: return '#a6c'; break;
		case 8192: return '#93c'; break;
	}
	return 'black';
}

function getNumberColor(number){
	if(number < 4){
		return '#776e65';
	}else{
		return "white";
	}
}
