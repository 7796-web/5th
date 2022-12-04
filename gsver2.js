		           /*思路：獲取座標--陣列arr 
			 		執行軌跡--獲取最外圈陣列 runArr
			 		高亮顯示--根據runArr的下標來更換背景色和字型顏色
			 		速度變化--改變定時器的執行頻率 setTimeIterver(function(),time)
			 		停止點--獲取隨機數付給runArr，並清除定時器
			 		加速減速 轉動圈數：計數器
			       */
			       /*定義二維陣列  為了易於維護修改，長寬設為引數m，n*/

			function getSide(m,n){
				var arr=[m];//先宣告m長度的一維
				for(var i=0;i<m;i++){
// original code
					// arr[i]=[n];//宣告n長度的二維(代表是入大括弧時i每次設定為0)
					// for(var j=0;j<n;j++){
					// 	arr[i][j]=i*n+j; //給陣列元素賦值
					// }
// Original code after change
						arr[i]=0;//宣告n長度的二維(代表是入大括弧時i每次設定為0)
						for(var j=0;j<n;j++){
							arr[i][j]=j; //給陣列元素賦值
						}
				}
				console.log(m);
				console.log(n);
// *****原來封住20row and 83row*****
				//檢測二維陣列
				for(var i=0;i<arr.length;i++){
				document.write("第"+i+"行: "+arr[i]+"<br/>");
				}
				/*獲取運動軌跡 -- 最外圈的陣列*/
				var runArr=[];
				var tempX=0, //定義座標
					tempY=0,
					direction="straight",
            		count=0;
            	while(tempX>=0 && tempX<n && tempY>=0 && tempY<m && count<m*n){//迴圈條件 tempX tempY在 n和m的長度範圍內
            		count++;
            		runArr.push([tempY,tempX]);
            		
            		if(direction=="straight"){//亮塊直行的規律
            			if(tempX==n-1){
            				tempY++;
            			}
            			else{
            				tempX++;
            			}
            			if(tempX==n-1&&tempY==m-1){//亮塊處於拐點
            				direction="turn";         //改變條件 執行下面程式碼
            			}
            		}
            		else{
            			if(tempX==0){//亮塊直行的規律
            			    tempY--;	
            			}              
                	    else{
                       		tempX--;
                       }
                       	if(tempX==0 && tempY==0){
                       		break;
                       }
                      
            		}
            	}
            	return runArr;
            	
		}
				var stopNum,//停止數
					index=0,//當前亮區位置
					prevIndex, //前一位置
					speed=300,//初始速度
					timer,//定時器物件
			        downIndex=0,           //決定在哪一格變慢
			        cycle=0,           //轉動圈數   
			        EndCycle=0,           //設定轉幾圈後再減速
			        flag=false,           //結束轉動標誌 為true時停止 
			        speedUp=0;           //加速
			        tb = document.getElementById("tb"),     //獲取tb物件 
			        btn = document.getElementById("btn1"),//獲取按鈕物件
			 	 	runArr=[];
// 重點改寫此方陣,75行,221201
                    runArr=getSide(7,7);//初始化陣列
// ****原來封住*****
					for(var i=0;i<runArr.length;i++){
					document.write(runArr[i]+"<br/>");
				}
			
				//定義啟動函式
				function start(){
					btn.disabled = true;
					stopNum = Math.floor(Math.random() * 16);//點選產生隨機數，最後將停在次數上 
					downIndex=Math.floor(Math.random() * 16);
					EndCycle=1;
					clearInterval(timer);
      			   	cycle=0;
         			flag=false;//結束轉動標誌
         			timer=setInterval(run,speed);//啟動定時器
				}
				
				//執行函式
				function run(){
					  change();//背景變化函式
					//跑馬燈加速
					if(flag==false){
						if(speedUp==5){   		  //走5格後加速
							clearInterval(timer); //先清除定時器，再改變速度
			                speed=50;
			                timer=setInterval(run,speed);
						}
						
					}
					//跑N圈後減速
					if(cycle==EndCycle+1 && index==downIndex){
		                	 clearInterval(timer);
			                 speed=300;
			                 flag=true;       //觸發結束			 
			                 timer=setInterval(run,speed);//減速
            	 }
					//計算轉了幾圈
       				if(index>=runArr.length){
                			index=0;
               				cycle++;
				}
		
          		 //停止並選中號碼
       				  if(flag==true && index==stopNum){ 
         					speedUp=0;
        		 	 		clearInterval(timer);
        		 	 		btn.disabled = false;
           		}
        }
				//單元格背景變亮
				function change(){
						tb.rows[runArr[index][0]].cells[runArr[index][1]].className="playcurr"; //給當前單元格新增樣式，換高亮的背景色；
            		  if(index>0){
                	 		 prevIndex=index-1;//前一位置
                	 	}
			          else{
			                prevIndex=runArr.length-1;
			            }
			            tb.rows[runArr[prevIndex][0]].cells[runArr[prevIndex][1]].className="playnormal";//游標走過後恢復背景色；
			            index++;
			           	speedUp++;
				}