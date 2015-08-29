(function(){
	$(document).ready(function(){
		iniciar();
	});

	var a = false;
	var b = false;
	var c = false;
	var d = false;
	var f = false;

	function iniciar()
	{
		$("#lista1").addClass("libre");
		$("ul li#lista1").hover(function(e) { 
			if(a == false)
			{
		    $(this).css("background-color",e.type === "mouseenter"?"#fafafa":"#fff") 				
			}
		});
		$("#opciones1").hide();
		$("#lista1").click(function(){
			if(a == false)
			{
				$("#lista1 > a > h3").css({"color":"#fff"})
				a = !a;
			    $(this).css("background-color","#616161");
			    $(this).removeClass("libre");
			    $(this).addClass("seleccionado");
			}
			else
			{
				$("#lista1 > a > h3").css({"color":"#000"});
				a = !a;
				$(this).css("background-color","#fafafa");
				$(this).removeClass("seleccionado");
			    $(this).addClass("libre");
			}
			
			$("ul#opciones1").toggle();
			$("#lista1").toggleClass("fondo");

		});

		$("#lista2").addClass("libre");
		$("ul li#lista2").hover(function(e) { 
			if(b == false)
			{
		    $(this).css("background-color",e.type === "mouseenter"?"#fafafa":"#fff") 				
			}
		});
		$("#opciones2").hide();
		$("#lista2").click(function(){
			if(b == false)
			{
				$("#lista2 > a > h3").css({"color":"#fff"})
				b = !b;
			    $(this).css("background-color","#616161");
			    $(this).removeClass("libre");
			    $(this).addClass("seleccionado");
			}
			else
			{
				$("#lista2 > a > h3").css({"color":"#000"});
				b = !b;
				$(this).css("background-color","#fafafa");
				$(this).removeClass("seleccionado");
			    $(this).addClass("libre");
			}
			
			$("ul#opciones2").toggle();
			$("#lista2").toggleClass("fondo");

		});



		$("#lista3").addClass("libre");
		$("ul li#lista3").hover(function(e) { 
			if(c == false)
			{
		    $(this).css("background-color",e.type === "mouseenter"?"#fafafa":"#fff") 				
			}
		});
		$("#opciones3").hide();
		$("#lista3").click(function(){
			if(c == false)
			{
				$("#lista3 > a > h3").css({"color":"#fff"})
				c = !c;
			    $(this).css("background-color","#616161");
			    $(this).removeClass("libre");
			    $(this).addClass("seleccionado");
			}
			else
			{
				$("#lista3 > a > h3").css({"color":"#000"});
				c = !c;
				$(this).css("background-color","#fafafa");
				$(this).removeClass("seleccionado");
			    $(this).addClass("libre");
			}
			
			$("ul#opciones3").toggle();
			$("#lista3").toggleClass("fondo");

		});


		$("#lista4").addClass("libre");
		$("ul li#lista4").hover(function(e) { 
			if(d == false)
			{
		    $(this).css("background-color",e.type === "mouseenter"?"#fafafa":"#fff") 				
			}
		});
		$("#opciones4").hide();
		$("#lista4").click(function(){
			if(d == false)
			{
				$("#lista4 > a > h3").css({"color":"#fff"})
				d = !d;
			    $(this).css("background-color","#616161");
			    $(this).removeClass("libre");
			    $(this).addClass("seleccionado");
			}
			else
			{
				$("#lista4 > a > h3").css({"color":"#000"});
				d = !d;
				$(this).css("background-color","#fafafa");
				$(this).removeClass("seleccionado");
			    $(this).addClass("libre");
			}
			
			$("ul#opciones4").toggle();
			$("#lista4").toggleClass("fondo");

		});


		$("#lista5").addClass("libre");
		$("ul li#lista5").hover(function(e) { 
			if(f == false)
			{
		    $(this).css("background-color",e.type === "mouseenter"?"#fafafa":"#fff") 				
			}
		});
		$("#opciones5").hide();
		$("#lista5").click(function(){
			if(f == false)
			{
				$("#lista5 > a > h3").css({"color":"#fff"})
				f = !f;
			    $(this).css("background-color","#616161");
			    $(this).removeClass("libre");
			    $(this).addClass("seleccionado");
			}
			else
			{
				$("#lista5 > a > h3").css({"color":"#000"});
				f = !f;
				$(this).css("background-color","#fafafa");
				$(this).removeClass("seleccionado");
			    $(this).addClass("libre");
			}
			
			$("ul#opciones5").toggle();
			$("#lista5").toggleClass("fondo");

		});
	}

})();