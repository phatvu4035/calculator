/*
* Input nhan toan o gia tri nhap vao va chuyen no den phan calculator
*/
var Input = function(input)
{
	this.input = input.split("");
	this.calculator = new Calculator();

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
	}


}

var Calculator = function()
{
	this.currentValue = 0;
	this.level = 0;
	this.uI = {};

	this.init(12);
}

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

	    return true;
	},

	push(V, O, G)
	{
		for( var i = level; i > 0; --i) {
			this.uI[i].value = this.uI[i - 1].value;
			this.uI[i].op = this.uI[i - 1].op;
			this.uI[i].vg = this.uI[i - 1].vg;
		}

		this.uI[0].value = V;
	    this.uI[0].op = O;
	    this.uI[0].vg = G;

	    ++this.level;
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
		} else {
			calc_input += inp;
			inputArea.value = calc_input;
		}
		

	});
});


