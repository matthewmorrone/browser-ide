function get_tree()
{
	$.post
	(
		"functions.php", 
		{
			"mode" : 1
		}, 
		function(data) 
		{
			$("#directory_div").html(data)
			$(function()
			{
				$(".list").toggle
				(
					function()
					{
						$(this).next().children("ul, li, .list, .rem").each(function() {$(this).hide()})
					},
					function()
					{
						$(this).next().children("ul, li, .list, .rem").each(function() {$(this).show()})
					}				
				)
			})
			$("#toggle_all").toggle
			(
				function()
				{
					$(this).html("Expand All")
					$("ul, li, .list").each(function()
					{
						$(this).next().children("ul, li, .list, .rem").each(function() {$(this).hide()})
					})
				},
				function()
				{
					$(this).html("Collapse All")
					$("ul, li, .list").each(function()
					{
						$(this).next().children("ul, li, .list, .rem").each(function() {$(this).show()})
					})
				}
			)
			$("#directory_div a").click(function(e)
			{
				e.preventDefault()
				var href = $(this).attr("href")
				$("iframe").attr("src", href)
				$.post
				(
					"functions.php",
					{
						"mode": 2, 
						"href": href
					},	
					function(data) 
					{
						$("#filename_input").val(href)
						$("#text_edit").html(data)
					},
					'text'
				)
			})
		}, 
		'text'
	)
}	
	
$(function() 
{	
	$("#text_edit").change(function()
	{
		name = $("#iframe_output").attr("src")
		$.post
		(
			"functions.php", 
			{
				"mode" : 3,
				"name" : name,
				"text" : $("#text_edit").val()
			}, 
			function(data)
			{
				$("#iframe_output").attr("src", data)
			},
			'text'
		)
	})
	$("#new_file").click(function()
	{
		//window.prompt('<input id="new_file_name"></input><select id="new_file_extn"><option val=""></option><option val=".txt">.txt</option><option val=".html">.html</option><option val=".css">.css</option><option val=".js">.js</option><option val=".php">.php</option><optgroup label="images"><option val=".png">.png</option><option val=".jpg">.jpg</option><option val=".gif">.gif</option></optgroup></select>')
	
		var name = prompt("new file name")
		var extn = prompt("choose an extension", ".txt, .csv, .html...")
		
		$.post
		(
			"functions.php", 
			{
				"mode" : 3,
				"name" : name,
				"extn" : extn,
				"text" : $("#text_edit").val()
			}, 
			function(data) 
			{
				$("#iframe_output").attr("src", data)
				get_tree()
			}, 
			'text'
		)
	})
	$("#delete").click(function() 
	{
		$(".rem:checked").each(function() 
		{
			var path = $(this).parent().children("a").attr("href") || $(this).next("li").children("a").attr("href") || $(this).next("li").find("a").attr("href")
			
			$.post
			(
				"functions.php", 
				{
					"mode" : 4,
					"path" : path
				}, 
				function(data) 
				{
					get_tree()
				}, 
				'text'
			)
		})
	})
	var s = 38
	$("#find_button").toggle
	(
		function()
		{	
			$("#find").children(".con").animate({width: "00%"}, 500)
			if ($("#edit").children(".con").css("width") != "0px" && $("#view").children(".con").css("width") != "0px")
			{
				$("#edit").children(".con").animate({width: (s+9)+"%"}, 500)	
				$("#view").children(".con").animate({width: (s+9)+"%"}, 500)	
			}
			else if ($("#edit").children(".con").css("width") != "0px")
			{
				$("#edit").children(".con").animate({width: ((s+9)*2)+"%"}, 500)
			}
			else if ($("#view").children(".con").css("width") != "0px")
			{
				$("#view").children(".con").animate({width: ((s+9)*2)+"%"}, 500)
			}
		},
		function()
		{	
			$("#find").children(".con").animate({width: (s-20)+"%"}, 500)
			if ($("#edit").children(".con").css("width") != "0px" && $("#view").children(".con").css("width") != "0px")
			{
				$("#edit").children(".con").animate({width: (s)+"%"}, 500)
				$("#view").children(".con").animate({width: (s)+"%"}, 500)
			}					
			else if ($("#edit").children(".con").css("width") != "0px")
			{
				$("#edit").children(".con").animate({width: (s*2)+"%"}, 500)
			}
			else if ($("#view").children(".con").css("width") != "0px")
			{
				$("#view").children(".con").animate({width: (s*2)+"%"}, 500)
			}
		}
	)
	$("#edit_button").toggle
	(
		function()
		{	
			if ($("#find").children(".con").css("width") == '0px')
			{
				$("#edit").children(".con").animate({width: ((s+9)*2)+"%"}, 500)	
				$("#view").children(".con").animate({width: "00%"}, 500)				
			}
			else
			{
				$("#edit").children(".con").animate({width: ((s)*2)+"%"}, 500)
				$("#view").children(".con").animate({width: "00%"}, 500)
			}
		},
		function()
		{	
			if ($("#find").children(".con").css("width") == '0px')
			{
				$("#edit").children(".con").animate({width: (s+9)+"%"}, 500)	
				$("#view").children(".con").animate({width: (s+9)+"%"}, 500)
			}
			else
			{
				$("#edit").children(".con").animate({width: (s)+"%"}, 500)
				$("#view").children(".con").animate({width: (s)+"%"}, 500)
			}
		}
	)			
	$("#view_button").toggle
	(
		function()
		{	
			if ($("#find").children(".con").css("width") == '0px')
			{
				$("#edit").children(".con").animate({width: "00%"}, 500)	
				$("#view").children(".con").animate({width: ((s+9)*2)+"%"}, 500)		
			}
			else
			{
				$("#edit").children(".con").animate({width: "00%"}, 500)
				$("#view").children(".con").animate({width: ((s)*2)+"%"}, 500)
			}
		},
		function()
		{	
			if ($("#find").children(".con").css("width") == '0px')
			{
				$("#edit").children(".con").animate({width: (s+9)+"%"}, 500)	
				$("#view").children(".con").animate({width: (s+9)+"%"}, 500)
			}
			else
			{
				$("#edit").children(".con").animate({width: (s)+"%"}, 500)
				$("#view").children(".con").animate({width: (s)+"%"}, 500)
			}
		}
	)
	$("#find").children(".con").animate({width: "18%"}, 500)
	$("#edit").children(".con").animate({width: "38%"}, 500)
	$("#view").children(".con").animate({width: "38%"}, 500)	
	$(function()
	{
		$("#css_format").click(function() 
		{
			$("#text_edit").val(function(i, val) 
			{
				var		result =	val.replace(new RegExp('\r+', 	'g'), 	'')
				var		result = result.replace(new RegExp('\n+', 	'g'), 	'')
				var		result = result.replace(new RegExp('\t+', 	'g'), 	'')
				var		result = result.replace(new RegExp(' +', 	'g'), 	'')
				var		result = result.replace(new RegExp(',', 	'g'), 	', ')
				var		result = result.replace(new RegExp(':', 	'g'), 	': ')
				var		result = result.replace(new RegExp(';', 	'g'), 	';\n\t')
				var		result = result.replace(new RegExp('\{', 	'g'), 	'\n\{\n\t')
				var		result = result.replace(new RegExp('\t\}', 	'g'), 	'\}\n')
				return 	result
			})	
			$("#text_edit").change()
		})
	})
	
})