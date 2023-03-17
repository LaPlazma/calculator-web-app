$(document).ready(function () {
	$("td #display").val("0");
	var resshown = false;
	$("button").click(function () {
		//Doppelklick verhindern
		if (isDoubleClicked($(this))) return;
		if (resshown) {
			$("td #display").val("0");
			resshown = false;
		}
		var operators = ["+", "-", "*", "/"];
		var button = $(this).attr("id");
		var buttoncont = $(this).text();
		var display = $("#display").val();

		if (button === "clear") {
			//LOG:CLEAR
			$("td #display").val("0");
		} else if (button === "backspace") {
			//LOG:BACKSPACE
			if (display.length === 1) {
				$("#display").val("0");
			} else {
				$("#display").val(display.substring(0, display.length - 1));
			}
		} else if (
			button === "plus" ||
			button === "minus" ||
			button === "multiply" ||
			button === "divide"
		) {
			//LOG:OPERATORS
			if (buttoncont === "x") buttoncont = "*";
			if (buttoncont === "÷") buttoncont = "/";
			if (display === "0") {
				$("#display").val("0");
			} else if (display[display.length - 1] === ".") {
				$("#display").val(
					display.substring(0, display.length - 1) + " " + buttoncont
				);
			} else {
				$("#display").val(display + " " + buttoncont);
			}
		} else if (button === "decimal") {
			//LOG:DECIMAL
			if (display[display.length - 1] !== "%") {
				if (display === "0") {
					$("#display").val("0.");
				} else if (operators.includes(display[display.length - 1])) {
					$("#display").val(display + " 0.");
				} else if (display[display.length - 1] === ".") {
					$("#display").val(display);
				} else if (getLastNumber(display).indexOf(".") === -1) {
					$("#display").val(display + ".");
				}
			}
		} else if (button === "equals") {
			//LOG:EQUALS
			if (display[display.length - 1] === ".")
				display = display.substring(0, display.length - 1);
			else if (operators.includes(display[display.length - 1]))
				display = display.substring(0, display.length - 2);
			var res = eval(display);
			$("td #display").val(res);
			resshown = true;
		} else {
			//LOG:NUMBERS
			if (display[display.length - 1] !== "%") {
				if (display === "0") {
					$("#display").val(buttoncont);
				} else if (operators.includes(display[display.length - 1])) {
					$("#display").val(display + " " + buttoncont);
				} else {
					$("#display").val(display + buttoncont);
				}
			}
		}
	});

	function getLastNumber(display) {
		var lastNumber = "";
		for (var i = display.length - 1; i >= 0; i--) {
			if (display[i] === " ") {
				break;
			} else {
				lastNumber = display[i] + lastNumber;
			}
		}
		return lastNumber;
	}

	function isDoubleClicked(element) {
		if (element.data("isclicked")) return true;
		element.data("isclicked", true);
		setTimeout(function () {
			element.removeData("isclicked");
		}, 200);
		return false;
	}
});
