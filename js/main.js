/*
* Input nhan toan o gia tri nhap vao va chuyen no den phan calculator
*/
var Input = function(input)
{
	this.input = input.split("");
	this.calculator = new Calculator();
	this.init();
}

Input.prototype = {
	// Chuyen input nhap thanh mang
	init() 
	{
		for (var i = 0; i < this.input.length; i++) {
			this.r(this.input[i]);
		}
	},
	
	r(A)
	{
		// Route cac gia tri nhap vao toi cac ham thich hop
		if (A == 1 || A == 2 || A == 3 || A == 4 || A == 5 || A == 6 || A == 7 || A == 8 || A == 9 || A == 0) {
			this.calculator.numInput(A);
		} else {
			if(A == "+" || A == "-" || A == "*" || A == "/") {
				this.calculator.opt(A);
			}
		}
	},

	result()
	{
		return this.calculator.enter();
	}

}

var Calculator = function()
{
	this.currentValue = 0;
	this.level = 0;
	this.uI = {};

	this.init(12);
}

var con = 1;

Calculator.prototype = {

	init(A) 
	{
		for (var i = 0; i < A; i++) {
			this.uI[i] = new stackItem();
		}
	},

	numInput(A)
	{
		this.currentValue = A;
	},

	opt(A)
	{
		if(A == "+" || A == "-") {
			var vg = 1;
		}
		else if( A == "*" || A == "/" ) {
			var vg = 2;
		}

		if( this.level > 0 && vg <= this.uI[0].vg) {
			this.evalx(A);
		}

		this.push(this.currentValue, A, vg);
	},

	evalx(A) 
	{
		if(this.level == 0) {
			return false;
		}

		var value = this.uI[0].value;
		var op = this.uI[0].op;

		if( op == "+") {
			value = this.currentValue + value;
		} else if ( op == "-") {
			value = this.currentValue - value;
		} else if(op == "*") {
			value = this.currentValue * value;
		} else if (op == "/") {
			value = this.currentValue / value;
		}

		this.uI[0].value = value;
		this.uI[0].op = A;

		this.pop();

	    return true;
	},

	push(V, O, G)
	{
		for( var i = this.level; i > 0; --i) {
			this.uI[i].value = this.uI[i - 1].value;
			this.uI[i].op = this.uI[i - 1].op;
			this.uI[i].vg = this.uI[i - 1].vg;
		}

		this.uI[0].value = V;
	    this.uI[0].op = O;
	    this.uI[0].vg = G;

	    ++this.level;
	},

	pop() {
	    if (this.level == 0) {
	        return false
	    }
	    for (i = 0; i < this.level; ++i) {
	        this.uI[i].value = this.uI[i + 1].value;
	        this.uI[i].op = this.uI[i + 1].op;
	        this.uI[i].vg = this.uI[i + 1].vg
	    }
	    --this.level;
	    return true
	},

	enter()
	{
		var calValue = Number(this.currentValue);
		for (var i in this.uI) {
			if(this.uI[i].op == "*") {
				calValue = calValue * Number(this.uI[i].value);
			}

			if(this.uI[i].op == "/") {
				calValue = calValue / Number(this.uI[i].value);
			}

			if(this.uI[i].op == "+") {
				calValue = calValue + Number(this.uI[i].value);
			}

			if(this.uI[i].op == "-") {
				calValue = calValue - Number(this.uI[i].value);
			}
		}

		return calValue;
	}

}

// packing all operation in order
function stackItem()
{
	this.value = 0;
	this.vg = 0;
	this.op = "";
}

/*
* Bat su kien khi dau bang duoc nhan
*/
var btn = document.querySelectorAll('.calc-btn');
var inputArea = document.querySelector('.calc-input');

btn.forEach(function(element) {
	element.addEventListener('click', function() {
		var inp = this.value;
		var calc_input  = document.querySelector('.calc-input').value;
		// Neu ma click dau bang thi se chuyen sang tinh toan
		if(this.value == "=") {
			var input = new Input(calc_input);
			console.log(input.result());
		} else {
			calc_input += inp;
			inputArea.value = calc_input;
		}
		

	});
});

function r(A)
{
	// Route cac gia tri nhap vao toi cac ham thich hop
	if (A == 1 || A == 2 || A == 3 || A == 4 || A == 5 || A == 6 || A == 7 || A == 8 || A == 9 || A == 0) {
		this.calculator.numInput(A);
	} else {
		if(A == "+" || A == "-" || A == "*" || A == "/") {
			opt(A);
		}
	}
}

var value = 0;
var stackItem = [];

function opt(A)
{
	if(A == "+" || A == "-") {
		var vg = 1;
	}
	else if( A == "*" || A == "/" ) {
		var vg = 2;
	}

	if(stackItem.length == 0) {
		stackItem[0].value = value;
		stackItem[0].opt = A;
		stackItem[0].vg = vg;
		return;
	}

	reOrderItem(vg, A);
}

function reOrderItem(vg, opt)
{
	var firstItem = stackItem[0];
	if(firstItem.vg < vg) {
		// Re-order all element put the higher in front
		for(let i = stackItem.length; i > 0; i--) {
			stackItem[i].value = stackItem[i - 1].value;
			stackItem[i].vg = stackItem[i - 1].vg;
			stackItem[i].opt = stackItem[i - 1].opt;
		}
		stackItem[0].value = value;
		stackItem[0].vg = vg;
		stackItem[0].opt = opt;
	}

	if(firstItem.vg >= vg) {
		// if vg > new vg we calculator the value ...
		let item = evalx(firstItem, value);
		stackItem[0].value = item.value;
		stackItem[0].opt = opt;
		stackItem[0].vg = vg;
	}

}

function evalx(item, value)
{
	if(item.opt == "+") {
		item.value = item.value + value;
	} else if(item.opt == "-") {
		item.value = item.value - value;
	} else if(item.opt == "*") {
		item.value = item.value * value;
	} else if(item.opt == "/") {
		item.value = item.value / value;
	}

	return item;
}

function 

// Press = 
function result(stackItem)
{
	// calulator the first item with value
	let firstItem = stackItem[0];
	let item = evalx(firstItem, value);

	for(let i = 1; i < stackItem.length - 1; i++) {
		
	}
}



