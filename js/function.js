
function init(){
	istime=false;
	isbmi=false;
	istext=false;
	isdeposite=false;
	isloan=false;
}
//按键输入表达式
function scnclk() {
	var innerHTML = this.innerHTML;

	//是否从头输入表达式，找'_'
	if (express_str.search('_') == -1) { //是，初始化
		if (innerHTML == 'DEL') {
			express_str = express_str.substring(0, express_str.length - 1);
			express_str += "_";
			express.innerHTML = express_str;
			return 0;
		} else if (innerHTML == '=') {
			return 0;
		} else if (innerHTML == 'rdn') {
			express.innerHTML = '[0,1)之间的随机数';
			result.innerHTML = Math.random();
			return 0;
		} else {
			express_str = '';
		}
	}
	//超出input
	// else if(express_str.length>express.size-2){
	// 	show_express_str=express_str.substr(-1,2-express.size);
	// }
	else { //截去'_'
		express_str = express_str.substring(0, express_str.length - 1);
	}

	switch (innerHTML) {
		case "(&nbsp;)":
			if (!bracket) {
				express_str += '(';
				bracket = true;
			} else {
				express_str += ')';
				bracket = false;
			}
			express_str += "_";
			express.innerHTML = express_str;
			break;
		case "n!":
			express_str += '!';
			express_str += "_";
			express.innerHTML = express_str;
			break;
		case "(x,y)":
			express_str += ',';
			express_str += "_";
			express.innerHTML = express_str;
			break;
		case "AC":
			express_str = "";
			express_str += "_";
			express.innerHTML = express_str;

			break;
		case "DEL":
			express_str = express_str.substring(0, express_str.length - 1);
			express_str += "_";
			express.innerHTML = express_str;
			break;
		case "Ans":
			express_str += result.innerHTML;
			express_str += "_";
			express.innerHTML = express_str;
			break;
		case '税':
			init();
			istext=true;
			express_str = '_';
			express.innerHTML = express_str;
			result.innerHTML = "月收入=";
			istext = true;
			break;
		case '存':
			init();
			isdeposite=true;
			express_str = '_';
			express.innerHTML = express_str;
			result.innerHTML = "存款总额,存款利率,年限=";
			isdeposite = true;
			break;
		case '贷':
			init();
			isloan=true;
			express_str = '_';
			express.innerHTML = express_str;
			result.innerHTML = "贷款总额,贷款利率,年限=";
			isloan = true;
			break;
		case '时间':
			init();
			istime=true;
			express_str = '_';
			express.innerHTML = express_str;
			result.innerHTML = "2017/3/22-2017/2/20=";
			istime = true;
			break;
		case '今天':
			init();
			istime=true;
			var today = new Date();
			express_str += '' + today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + '_';
			express.innerHTML = express_str;
			result.innerHTML = "2017/3/22-2017/2/20=";
			istime = true;
			break;
		case 'BMI':
			init();
			isbmi=true;
			express_str = '_';
			express.innerHTML = express_str;
			result.innerHTML = "(1代表男,2代表女)成人:身高(cm),性别=;儿童:月龄,性别=";
			isbmi = true;
			break;
		case '换背景':
			$('body').css('background-image', 'url("img/bj_caihong.jpg")');
			$('#calbody').css('background-color', 'rgba(0,0,0,0.6)');
			break;
		case '收手掌':
			$('.draggable').css('display', 'none');
			break;
		case '关弹幕':
			$('marquee').css('display', 'none');
			break;
		case '帮助':
			window.open('help.html');
			break;
		case '?':

			// alert(help);
			help = true; //使用帮助
			// alert(help);
			// alert(express_str);
			if (express_str.search(/\*/ > -1)) { //乘法
				if (express_str.search(/^(6|7|8|9|10)\*(6|7|8|9|10)$/) > -1) { //6-10相乘
					$('.draggable').css('display', 'inline-block');
				} else if (express_str.search(/^11\*\d+$/) > -1 || express_str.search(/^\d+\*11$/) > -1) { //11*任何数
					// alert('十几乘十几\n\b\b头乘头，尾加尾，尾乘尾');
					$('#koujue').html('11乘任何数：首尾不动下落，中间之和下拉');
					$('#koujue').css('display', 'block');

				}else if (express_str.search(/^1[0-9]\*1[0-9]$/) > -1) { //十几乘十几
					// alert('十几乘十几\n\b\b头乘头，尾加尾，尾乘尾');
					$('#koujue').html('十几乘十几：头乘头，尾加尾，尾乘尾');
					$('#koujue').css('display', 'block');

				} else if (express_str.search(/^([1-9])([0-9])\*([1-9])([0-9])$/) > -1) {
					expr = express_str.replace(/^([1-9])([0-9])\*([1-9])([0-9])$/, '$1-$2-$3-$4');
					// alert(expr);
					expr_arr = expr.split('-');
					// alert(parseInt(expr_arr[0])+parseInt(expr_arr[1]));
					if ((parseInt(expr_arr[0]) == parseInt(expr_arr[2])) && (parseInt(expr_arr[1]) + parseInt(expr_arr[3]) == 10)) {
						// alert('头相同、尾数相加等于十:一个头加1后，头乘头，尾乘尾');

						$('#koujue').html('头相同、尾数相加等于十:一个头加1后，头乘头，尾乘尾');
						$('#koujue').css('display', 'block');
					}
				} else {
					alert('暂时帮不了你啦，我们会不断完善的！');
				}
			} else {
				alert('暂时帮不了你啦，我们会不断完善的！');
			}

			express_str += '_';
			break;
			//正则表达式转化成eval()能执行的js代码,输出结果
		case '=':
			// alert(express_str);
			// if (express_str === '3.14159265357979323846264338327950288') {
			if (express_str === '3.141592653589793') {
				// alert('π'); //彩蛋
				$('marquee').css('display', 'block');
				break;
			}
			if (istext) {
				var shouru = eval(express_str);
				var shui = text(shouru);
				result.innerHTML = "税后：" + (shouru - shui) + "，所得税：" + shui;
			} else if (isdeposite) { //saving:存款总额，rate:存款利率，time:年限
				var dps_arr = express_str.split(',');
				var saving = dps_arr[0];
				var rate = dps_arr[1];
				var time = dps_arr[2];
				dps(saving, rate, time);
			} else if (isloan) { //loan:贷款，rate:贷款利率，time:年限
				var ln_arr = express_str.split(',');
				var lon = ln_arr[0];
				var rate = ln_arr[1];
				var time = ln_arr[2];
				ln(lon,rate,time);
			} else if (istime) { //loan:贷款，rate:贷款利率，time:年限
				var tm_arr = express_str.split('-');
				var tm1 = tm_arr[0];
				var tm2 = tm_arr[1];
				tm(tm1, tm2);
			} else if (isbmi) { //loan:贷款，rate:贷款利率，time:年限
				var agesex_arr = express_str.split(',');
				var age = agesex_arr[0];
				var sex = agesex_arr[1];
				if(age>120){
					var height=age;
					cbmi(121,sex,height);
				}else{
					cbmi(age,sex,0);
				}
			} else {
				// alert(express_str);
				rgx(express_str);
			}

			break;
		default:
			express_str += this.innerHTML;
			express_str += "_";
			express.innerHTML = express_str;
			break;
	}
}



function rgx(express_str) {

	//有输入表达式
	if (express_str) {

		expr_str = express_str.replace(/asin\((.+)\)/g, 'Math.asin($1)'); //asin(...)--->Math.asin(...)
		// alert(expr_str);
		expr_str = expr_str.replace(/asin(\d+|π|e)/g, 'Math.asin($1)'); //asin1|π--->Math.asin(1|π)
		// alert(expr_str);
		//acos,atan同理
		expr_str = expr_str.replace(/acos\((.+)\)/g, 'Math.acos($1)');
		expr_str = expr_str.replace(/acos(\d+|π|e)/g, 'Math.acos($1)');
		expr_str = expr_str.replace(/atan\((.+)\)/g, 'Math.atan($1)');
		expr_str = expr_str.replace(/atan(\d+|π|e)/g, 'Math.atan($1)');

		//sin(1+1)...
		expr_str = expr_str.replace(/^sin\((.+)\)/g, 'Math.sin($1)');
		// alert(expr_str);
		expr_str = expr_str.replace(/^cos\((.+)\)/g, 'Math.cos($1)');
		expr_str = expr_str.replace(/^tan\((.+)\)/g, 'Math.tan($1)');

		//sin1|π
		expr_str = expr_str.replace(/^sin(\d+|π|e)/g, 'Math.sin($1)');
		// alert(expr_str);
		//cos1,tan1同理
		expr_str = expr_str.replace(/^cos(\d+|π|e)/g, 'Math.cos($1)');
		expr_str = expr_str.replace(/^tan(\d+|π|e)/g, 'Math.tan($1)');

		//sin不开头
		expr_str = expr_str.replace(/([^a.])sin\((.+)\)/g, '$1Math.sin($2)'); //...sin(...)...
		// alert(expr_str);
		expr_str = expr_str.replace(/([^a.])sin(\d+|π|e)/g, '$1Math.sin($2)'); //...sin...
		// alert(expr_str);
		expr_str = expr_str.replace(/([^a.])cos\((.+)\)/g, '$1Math.cos($2)');
		expr_str = expr_str.replace(/([^a.])cos(\d+|π|e)/g, '$1Math.cos($2)');
		expr_str = expr_str.replace(/([^a.])tan\((.+)\)/g, '$1Math.tan($2)');
		expr_str = expr_str.replace(/([^a.])tan(\d+|π|e)/g, '$1Math.tan($2)');

		//倾斜角
		expr_str = expr_str.replace(/\((.+),(.+)\)/g, 'Math.atan2($2,$1)');

		//指数计算,√2^√2
		expr_str = expr_str.replace(/\((.+)\)\^\((.+)\)/g, 'Math.pow($1,$2)');
		expr_str = expr_str.replace(/\((.+)\)\^(√\d+|\d+|π|e)/g, 'Math.pow($1,$2)');
		expr_str = expr_str.replace(/(√\d+|\d+|π|e)\^\((.+)\)/g, '$Math.pow($1,$2)');
		expr_str = expr_str.replace(/(√\d+|\d+|π|e)\^(√\d+|\d+|π|e)/g, 'Math.pow($1,$2)');

		//ln
		expr_str = expr_str.replace(/ln\((.+)\)/g, 'Math.log($1)');
		// alert(expr_str);

		expr_str = expr_str.replace(/ln(\d+|π|e)/g, 'Math.log($1)');
		// alert(expr_str);


		expr_str = expr_str.replace(/√\((.+)\)/g, 'Math.sqrt($1)');
		// alert(expr_str);
		expr_str = expr_str.replace(/√(\d+|π|e)/g, 'Math.sqrt($1)');
		// alert(expr_str);


		expr_str = expr_str.replace(/π/g, 'Math.PI');
		// alert(expr_str);
		expr_str = expr_str.replace(/e/g, 'Math.E');
		// alert(expr_str);

		//阶乘,[数字]!--->fctr(数字)
		expr_str = expr_str.replace(/(\d+)!/g, 'fctr($1)');
		// alert(expr_str);


		//科学记数法
		// expr_str=expr_str.replace(/\*10\^/g,'e');
		// expr_str=expr_str.replace(/10\^/g,'1e');

		// alert(express_str);

		if (!isFinite(eval(expr_str)) && !isNaN(eval(expr_str))) { //无穷大且不为空
			result.innerHTML = "你等着，我还在算(lll￢ω￢)";
		} else if (eval(expr_str)) { //正常执行
			result.innerHTML = eval(expr_str);
		} else if (eval(expr_str) == 0) { //结果为0
			result.innerHTML = 0;

		}
		//NaN...
		else {
			result.innerHTML = "这不科学！！";
		}
	}
	//表达式为空
	else {
		result.innerHTML = "空即是色";
	}
	// express_str='';
	// express_str+="_";
	// express_str=express_str.substring(0,express_str.length-1);
	express.innerHTML = express_str;
}

//求阶乘的函数
function fctr(n) {
	if (n == 0) {
		return 1;
	} else {
		return n * fctr(n - 1);
	}
}
//loan:贷款，rate2:贷款利率，free:年限
function ln(loan, rate, time) {

	// alert('' + loan + rate + time);
	rate = rate.replace(/(\d+|.)%/g, '$1/100');
	// alert('' + loan + rate + time);
	rate = eval(rate);
	//还款总金额
	allrepay = loan * Math.pow(1 + rate, time);
	//还款总利息
	repay = loan * Math.pow(1 + rate, time) - loan;
	result.innerHTML = '还款金额：' + Math.round(allrepay) + ' 还款利息：' + Math.round(repay);
}

function text(shouru) {
	var sum = 0;
	if (shouru <= 3500) {
		sum = 0;
	} else if (shouru > 3500 && shouru <= 5000) {
		sum = (shouru - 3500) * 0.03;
	} else if (shouru > 5000 && shouru <= 8000) {
		sum = (shouru - 3500) * 0.1 - 105;
	} else if (shouru > 8000 && shouru <= 13500) {
		sum = (shouru - 3500) * 0.2 - 555;
	} else if (shouru > 9000 && shouru <= 38500) {
		sum = (shouru - 3500) * 0.25 - 1005;
	} else if (shouru > 38500 && shouru <= 58500) {
		sum = (shouru - 3500) * 0.3 - 2755;
	} else if (shouru > 58500 && shouru <= 83500) {
		sum = (shouru - 3500) * 0.35 - 5500;
	} else {
		sum = (shouru - 3500) * 0.45 - 13505;
	}
	return sum; //税额
}
//saving:存款，rate:存款利率，time:年限
function dps(saving, rate, time) {
	// alert(''+saving+rate+time);
	rate = rate.replace(/(\d+|.)%/g, '$1/100');
	// alert(''+saving+rate+time);
	rate = eval(rate);
	// alert(''+saving+rate+time);


	var interest = saving * Math.pow(1 + rate, time) - saving; //利息
	var sum = saving * Math.pow(1 + rate, time); //本息
	// alert('' + sum + interest);
	result.innerHTML = '本息：' + Math.round(sum) + ' 利息：' + Math.round(interest);
}
// function tm(tm1,tm2){
// 	var date1=new Date(tm1);
// 	var date2=new Date(tm2);
// 	var ms=date1-date2;
// }

function tm(tm1, tm2) {


	var date1 = new Date(tm1); //结束时间
	var date2 = new Date(tm2); //开始时间
	var date3 = date1.getTime() - date2.getTime(); //时间差的毫秒数      

	//------------------------------

	//计算出相差天数
	var days = Math.floor(date3 / (24 * 3600 * 1000))

	//计算出小时数

	var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
	var hours = Math.floor(leave1 / (3600 * 1000))
		//计算相差分钟数
	var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
	var minutes = Math.floor(leave2 / (60 * 1000))
		//计算相差秒数
	var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
	var seconds = Math.round(leave3 / 1000)
	var time = document.getElementById('time');
	// str=days+"d"+hours+"h"+minutes+"m"+seconds+"s";
	if (isNaN(days)) {
		result.innerHTML = '猴年马月';
	} else {
		str = days + "d";
		result.innerHTML = str;
		// alert(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒");
	}
}

function cbmi(month, sex,height) {

	if (month < 0) {
		result.innerHTML = "error";
	} else if (month <= 1.5 && month > 0) {
		if (sex == 1) {
			result.innerHTML = "体重：3.6—5.0";
		} else if (sex == 2) {
			result.innerHTML = "体重：2.7-3.6";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 1.5 && month <= 2.5) {
		if (sex == 1) {
			result.innerHTML = "体重：4.3-6.0";
		} else if (sex == 2) {
			result.innerHTML = "体重：3.4-4.5";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 2.5 && month <= 3.5) {
		if (sex == 1) {
			result.innerHTML = "体重：5.0-6.9";
		} else if (sex == 2) {
			result.innerHTML = "体重：4.0-5.4";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 3.5 && month <= 4.5) {
		if (sex == 1) {
			result.innerHTML = "体重：5.7-7.6";
		} else if (sex == 2) {
			result.innerHTML = "体重：4.7-6.2";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 4.5 && month <= 5.5) {
		if (sex == 1) {
			result.innerHTML = "体重：6.3-8.2";
		} else if (sex == 2) {
			result.innerHTML = "体重：5.3-6.9";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 5.5 && month <= 6.5) {
		if (sex == 1) {
			result.innerHTML = "体重：6.9-8.8";
		} else if (sex == 2) {
			result.innerHTML = "体重：6.3-8.1";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 6.5 && month <= 8.5) {
		if (sex == 1) {
			result.innerHTML = "体重：7.8-9.8";
		} else if (sex == 2) {
			result.innerHTML = "体重：7.2-9.1";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 8.5 && month <= 10.5) {
		if (sex == 1) {
			result.innerHTML = "体重：8.6-10.6";
		} else if (sex == 2) {
			result.innerHTML = "体重：7.9-9.9";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 10.5 && month <= 12.5) {
		if (sex == 1) {
			result.innerHTML = "体重：9.1-11.3";
		} else if (sex == 2) {
			result.innerHTML = "体重：8.5-10.6";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 12.5 && month <= 15.5) {
		if (sex == 1) {
			result.innerHTML = "体重：9.8-12.0";
		} else if (sex == 2) {
			result.innerHTML = "体重：9.1-11.3";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 15.5 && month <= 18.5) {
		if (sex == 1) {
			result.innerHTML = "体重：10.3-12.7";
		} else if (sex == 2) {
			result.innerHTML = "体重：9.7-12.0";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 18.5 && month <= 21.5) {
		if (sex == 1) {
			result.innerHTML = "体重：10.8-13.3";
		} else if (sex == 2) {
			result.innerHTML = "体重：10.2-12.6";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 21.5 && month <= 24) {
		if (sex == 1) {
			result.innerHTML = "体重：11.2-14.0";
		} else if (sex == 2) {
			result.innerHTML = "体重：10.6-13.2";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 24 && month <= 30) {
		if (sex == 1) {
			result.innerHTML = "体重：12.1-15.3";
		} else if (sex == 2) {
			result.innerHTML = "体重：11.7-14.7";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 30 && month <= 36) {
		if (sex == 1) {
			result.innerHTML = "体重：13.0-16.4";
		} else if (sex == 2) {
			result.innerHTML = "体重：12.6-16.1";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 36 && month <= 42) {
		if (sex == 1) {
			result.innerHTML = "体重：13.9-17.6";
		} else if (sex == 2) {
			result.innerHTML = "体重：13.5-17.2";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 42 && month <= 48) {
		if (sex == 1) {
			result.innerHTML = "体重：14.8-18.7";
		} else if (sex == 2) {
			result.innerHTML = "体重：14.3-18.3";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 48 && month <= 54) {
		if (sex == 1) {
			result.innerHTML = "体重：15.7-19.9";
		} else if (sex == 2) {
			result.innerHTML = "体重：15.0-19.4";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 54 && month <= 60) {
		if (sex == 1) {
			result.innerHTML = "体重：16.6-21.1";
		} else if (sex == 2) {
			result.innerHTML = "体重：15.7-20.4";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 60 && month <= 66) {
		if (sex == 1) {
			result.innerHTML = "体重：17.4-22.3";
		} else if (sex == 2) {
			result.innerHTML = "体重：16.5-21.6";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 66 && month <= 72) {
		if (sex == 1) {
			result.innerHTML = "体重：18.4-23.6";
		} else if (sex == 2) {
			result.innerHTML = "体重：17.3-22.9";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 72 && month <= 84) {
		if (sex == 1) {
			result.innerHTML = "体重：20.2-26.5";
		} else if (sex == 2) {
			result.innerHTML = "体重：19.1-26.0";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 84 && month <= 96) {
		if (sex == 1) {
			result.innerHTML = "体重：22.2-30.0";
		} else if (sex == 2) {
			result.innerHTML = "体重：21.4-30.2";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 96 && month <= 108) {
		if (sex == 1) {
			result.innerHTML = "体重：24.3-34.0";
		} else if (sex == 2) {
			result.innerHTML = "体重：24.1-35.3";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 108 && month <= 120) {
		if (sex == 1) {
			result.innerHTML = "体重：26.8-38.7";
		} else if (sex == 2) {
			result.innerHTML = "体重：27.2-40.9";
		} else {
			result.innerHTML = "error";
		}
	} else if (month > 120 && month < 1200) {
		// result.innerHTML = "请输入身高(cm):";
		if (sex == 1)
			result.innerHTML = "体重：" + (height - 105);
		else
			result.innerHTML = "体重：" + (height - 100);
	} else {
		result.innerHTML = "Congratuation!You are such a longevity person.You can eat whatever you want.";
	}
}