// JavaScript Document
$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://左边
			//向左移动，生成一个随机数，判断游戏是否结束
			if(moveLeft()){
				genarateOneNumber();
				 if(isgameover()) gameover();
				//gameover();
			}
			break;
		case 38://上边
			if(moveUp()){
				genarateOneNumber();
				//gameover();
				 if(isgameover()) gameover();
			}
			break;
		case 39://右边
			if(moveRight()){
				genarateOneNumber();
				//gameover();
				 if(isgameover()) gameover();
			}
			break;
		case 40:
			if(moveDown()){
				genarateOneNumber();
				//gameover();
				 if(isgameover()) gameover();
			}
			break;
		default:break;
	}
	return false;
})
function isgameover(){
    if(canmoveUp() || canmoveDown() || canmoveLeft() || canmoveRight()) {
		return false;
	}
    return true;
}
function gameover(){
	$('body').append("<div id='gameover'><h4>最终得分</h4><p>"+ score +"</p><a href='javascript:resert();'>restart</a></div> ");
	$("#score").text("gameover");
	score=0;
}
function resert(){
  $('#gameover').remove();
  score=0;
  updateScore(score);
  newgame();
}
function updateScore(num){
  $('#score').text(num);
}
function moveLeft(){
	if(!canmoveLeft()){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0 && noBlock(i,k,j)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j] && noBlock(i,k,j)&&!noconflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;	
						score += board[i][k];
						updateScore(score);	
						noconflicted[i][j]=true;				
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	//updateBoardView();
	return true;
}
function showMoveAnimation(fromX,fromY,toX,toY){
	var numberCell=$("#number-cell-"+fromX+"-"+fromY);
	numberCell.animate({left:20+120*toY,top:20+120*toX},200);
}
function noBlock(row,col1,col2){
	for(var i=col1+1;i<col2;i++){
		if(board[row][i]!=0){
			return false;
		}
	}
	return true;
}
function canmoveLeft(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				if(board[i][j-1]==0 || board[i][j]==board[i][j-1]){
					return true;
				}
			}
		}
	}
	return false;
}
function moveUp(){
	if(!canmoveUp()){
		return false;
	}
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0 && noBlockUp(j,k,i)){						
						board[k][j]=board[i][j];
						board[i][j]=0;
						showMoveAnimation(i,j,k,j);
						continue;
					}else if(board[k][j]==board[i][j] && noBlockUp(j,k,i)&&!noconflicted[k][j]){
						board[k][j]+=board[i][j];
						board[i][j]=0;
						showMoveAnimation(i,j,k,j);	
						score += board[k][j];
						updateScore(score);	
						noconflicted[i][j]=true;			
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function noBlockUp(col,row1,row2){
	for(var i=row1+1;i<row2;i++){
		if(board[i][col]!=0){
			return false;
		}
	}
	return true;
}
function canmoveUp(){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i-1][j]==0 || board[i][j]==board[i-1][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function moveRight(){
	if(!canmoveRight()){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0 && noBlockRight(i,j,k)){				
						board[i][k]=board[i][j];
						board[i][j]=0;
						showMoveAnimation(i,j,i,k);
						continue;
					}else if(board[i][k]==board[i][j] && noBlock(i,j,k)&&!noconflicted[i][k]){
						board[i][k]+=board[i][j];
						board[i][j]=0;
						showMoveAnimation(i,j,i,k);		
						score += board[i][k];
						updateScore(score);	
						noconflicted[i][j]=true;	
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	//updateBoardView();
	return true;
}
function noBlockRight(row,col1,col2){
	for(var i=col1+1;i<col2;i++){
		if(board[row][i]!=0){
			return false;
		}
	}
	return true;
}
function canmoveRight(){
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if(board[i][j]!=0){
				if(board[i][j+1]==0 || board[i][j]==board[i][j+1]){
					return true;
				}
			}
		}
	}
	return false;
}
function moveDown(){
	if(!canmoveDown()){
		return false;
	}
	for(var i=2;i>=0;i--){	
		for(var j=0;j<4;j++){	
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
					if(board[k][j]==0 && noBlockDown(j,k,i)){						
						board[k][j]=board[i][j];
						board[i][j]=0;
						showMoveAnimation(i,j,k,j);
						continue;
					}else if(board[k][j]==board[i][j] && noBlockDown(j,i,k)&&!noconflicted[k][j]){			
						board[k][j]+=board[i][j];
						board[i][j]=0;
						showMoveAnimation(i,j,k,j);	
						score += board[k][j];
						updateScore(score);	
						noconflicted[i][j]=true;	
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function noBlockDown(col,row1,row2){
	for(var i=row1+1;i<row2;i++){
		if(board[i][col]!=0){
			return false;
		}
	}
	return true;
}
function canmoveDown(){
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i+1][j]==0 || board[i][j]==board[i+1][j]){
					return true;
				}
			}
		}
	}
	return false;
}