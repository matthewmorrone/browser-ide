// for canvas
// if you want animations
// basically, you have an infinite draw loop
// that does:
// clear Screen
// draw things
// update positions
// repeat

function update(str)
{
	$("#draw").remove()
	$("#rite").html("<canvas id='draw'></canvas>")
	$("#draw").attr("width", $(window).height()*2+"px")
	$("#draw").attr("height", $(window).height()+"px")
	var pre = "var canvas = document.getElementById('draw') \n"
			+ "var c = canvas.getContext('2d') \n"
	eval(pre + str)
}

$(function()
{
	$('#edit').keyup(function()
	{
		update($(this).val())
	})
	$('#edit').trigger("keyup")
})

function insertAtCursor(myField, myValue)
{
	if (document.selection)
	{
		myField.focus()
		sel = document.selection.createRange()
		sel.text = myValue
	}
	else if (myField.selectionStart || myField.selectionStart == '0')
	{
		var startPos = myField.selectionStart
		var endPos = myField.selectionEnd
		restoreTop = myField.scrollTop

		myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length)

		myField.selectionStart = startPos + myValue.length
		myField.selectionEnd = startPos + myValue.length

		if (restoreTop > 0) {myField.scrollTop = restoreTop}
	}
	else {myField.value += myValue}
}

function interceptTabs(evt, control)
{
	key = evt.keyCode ? evt.keyCode : evt.which ? evt.which : evt.charCode
	if (key == 9)
	{
		insertAtCursor(control, '\t')
		return false
	}
	else {return key}
}

function iObject()
{
	this.i;
	return this;
}

var myObject = new iObject();
myObject.i = 0;
var myObject2 = new iObject();
myObject2.i = 0;
store_text = new Array();

//store_text[0] store initial textarea value
store_text[0] = "";

function countclik(tag)
{
	myObject.i++;
	var y = myObject.i;
	var x = tag.value;
	store_text[y] = x;
}

function undo(tag)
{
	if ((myObject2.i) < (myObject.i))
	{
		myObject2.i++;
	}
	else
	{
		alert("Finish Undo Action");
	}
	var z = store_text.length;
	z = z-myObject2.i;
	if (store_text[z])
	{
		tag.value = store_text[z];
	}
	else
	{
		tag.value = store_text[0];
	}
}

function redo(tag)
{
	if((myObject2.i) > 1)
	{
		myObject2.i--;
	}
	else
	{
		alert("Finish Redo Action");
	}
	var z = store_text.length;
	z = z-myObject2.i;
	if (store_text[z])
	{
		tag.value = store_text[z];
	}
	else
	{
		tag.value = store_text[0];
	}
}