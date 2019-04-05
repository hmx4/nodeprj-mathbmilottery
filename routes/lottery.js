module.exports.genLotteryNum = GenLotteryNum; // 匯出GenLotteryNum方法

// 產生樂透號碼方法只要輸入樂透型別(0:大樂透,1:威力彩)與組數(times)
function GenLotteryNum(type, times)
{
	// delcare local variables
	var num, count, num2, biggestNum;
	var flag;
	var lotteryNum = [];
	var result;
	var i,j;
	//
	if (type == 0) //大樂透
	{
		biggestNum = 49;
		result = "大樂透 " + times + " 組號碼:\r\n";
	}
	else           //威力彩
	{
		biggestNum = 38;
		result = "威力彩 " + times + " 組號碼:\r\n";
		result += "                  第一區                 第二區\r\n";
	}
	
	//
	for (i=0; i < times; i++)
	{
		var count = 0;
		lotteryNum = [];
		for (j = 0; j < 6; j++) lotteryNum[j] = 0;
		//
		do
		{
			// generate a random integer ranging from 1 to beggest number
			num = Math.floor((Math.random() * biggestNum) + 1);
			//console.log(num);
			flag = exist(lotteryNum, count, num);
			//console.log(flag);
			if (flag == false)
			{
				lotteryNum[count] = num;
				count++;
			}
		}while(count<6);
		// sorting the array numerically
		lotteryNum.sort(function(a, b){return a-b});

		//
		result += "第" + twodigits((i + 1)) + "組: ";
		// 將數字轉成2位數格式
		for (k = 0; k < 6; k++)
		{
			result += twodigits(lotteryNum[k]) + "   ";
		}
		//
		if (type == 0)  //大樂透
		{
			result += "\r\n";
		}
		else            //威力彩
		{
			// 利用亂數產生一個1-8的整數
			num2 = Math.floor((Math.random() * 8) + 1);
			result += "      " + num2 + "\r\n";
		}
		
	}
	return result;
}

// 判斷數字是否已經在樂透數字陣
function exist(numarray, count, number)
{
	var status = false;
	for (i = 0; i < count; i++)
	{
		if (numarray[i] == number)
		{
			status = true;
			break;
		}
	}
	return status;
}

//將個位數整數轉成2位數，例如:1轉成01，好讓格式對齊
function twodigits(value)
{
	var digit2 = Math.floor(value/10);
	var digit1 = value % 10;
	return  digit2.toString() + digit1.toString();
}