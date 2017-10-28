$(document).ready(function(){
		//开启科学模式
		$('#shw_scn').on('click',function(){
			$('#science').show('slow');
			$('#adult').hide('slow');
			$('#child').hide('slow');
			$('#hands').hide('slow');
			$('#forchd').get(0).innerHTML='10^';
			$('body').css('background-image','url("img/bj_xingkong.jpg")');
			$('#calbody').css('background-color','rgba(0,0,0,0.4)');
			$('#nav_content').hide();
			init();
		});
		//开启家长模式
		$('#shw_adt').on('click',function(){
			$('#science').hide('slow');
			$('#adult').show('slow');
			$('#child').hide('slow');
			$('#hands').hide('slow');
			$('#forchd').get(0).innerHTML='10^';
			$('body').css('background-image','url("img/bj_family.jpg")');
			$('#calbody').css('background-color','rgba(0,0,0,0.8)');
			$('#nav_content').hide();
		});
		//开启儿童模式
		$('#shw_chd').on('click',function(){
			$('#science').hide('slow');
			$('#adult').hide('slow');
			$('#child').show('slow');
			//$('#hands').show('slow');
			$( ".draggable" ).css('display','inline-block');//！
			$('#forchd').get(0).innerHTML='?';
			$('body').css('background-image','url("img/bj_yangyang.jpg")');
			$('#calbody').css('background-color','rgba(0,0,0,0.3)');
			$('#nav_content').hide();
			init();
		});

		$('button').button();//自带cursor:hand
		$('#science button').css('box-shadow','0px 4px');
		$('#adult button').css('box-shadow','0px 4px');
		$('#child button').css('box-shadow','0px 4px');

		$('#common button').css('box-shadow','0px 5px');
		$('#common button').css('border-radius','20px 20px');
		$('#common button').css('margin','10px auto');

		$('#screen').css('margin','20px auto');
		$('#screen button').css('height','40px');


		$('body').css('display','block');
		$('marquee').css('display','none');
		$('button:not([delay="false"])').on('click',scnclk);
		
		$( ".draggable" ).draggable({ containment: "parent" });
		$( ".draggable" ).css('display','none');
		
		//全局变量
		window.express_str='';
		window.bracket=false;
		window.isloan=false;
		window.istext=false;
		window.isdeposite=false;
		window.istime=false;
		window.isbmi=false;
		window.help=false;
		window.real_express_str;
		window.express=document.getElementById('expression');
		window.result=document.getElementById('result');
	});