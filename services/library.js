/*
testing area for javascript functions
*/
var OptionPrice = [    
	150.00,    
	100.00,    
	100.00,    
	75.00,    
	75.00,
	100.00,
	300.00,
	500.00
	];
	
var fltBase = 0.0;
var fltTaxRate = 0.095;

/*function orderSummary()
purpose: recalculate the current order information
parameters: none
*/

function orderSummary(){
	var fltSub = fltBase;
	var intService = 1;
	var intTime = 0;
	var fltTax = 0;
	var fltTotal = 0;
	var intOptionCount = 0;
	var strMusic = "<strong>Order Summary:</strong><br />";
	var strSummary = "";
	var strPriceSum = "";
	var intOption = 0;
	
// check to see which services is selected

for (var i = 0; i < document.forms[0].rdoService.length; i++){
	if (document.forms[0].rdoService[i].checked)
	{
		intService = i;
	}
	}

// set the DHTML display to include the time due

switch(intService){
	case 0:  
		strMusic = strMusic + '<strong><br />Vocal Session - $150<br></strong>';  
		fltSub = 150;  
		break;
	case 1:  
		strMusic = strMusic + '<strong><br />Toplining - $300<br></strong>';  
		fltSub = 300;  
		break;
	case 2:  strMusic = strMusic + '<strong><br />Custom Songwriting - $500<br></strong>';  
		fltSub = 700;  
		break;
	case 3: strMusic = strMusic + '<strong><br />Music Production - $100<br></strong>';
		fltSub = 300;
		break;
		}
		
// check to see which time is chosen

for (var i = 0; i < document.forms[0].rdoTimeDue.length; i++){
	if (document.forms[0].rdoTimeDue[i].checked){
		intTime = i;
		}
	}
		
// set the DHTML display 

switch(intTime){
	case 0:  
		strMusic = strMusic + "<strong> 5+ days - $0</strong>";  
		break;
	case 1:  
		strMusic = strMusic + "<strong> 3-4 days - $100</strong>";  
		fltSub += 100;  
		break;
	case 2:
		strMusic = strMusic + "<strong> 24-48 hours - $200</strong>";
		fltSub += 200;
		break;
	}

if(document.forms[0].rdoOption[0].checked) {
		strMusic = strMusic + "<br><br><strong>Additional Services:</strong><br /> ";
	}
	else{
		for (var i = 1; i < document.forms[0].rdoOption.length; i++){
			if (document.forms[0].rdoOption[i].checked){
				intOption = i;
			}
		}
		switch(intOption){
		case 1:
			strMusic = strMusic + "<br><br><strong>Vocal Production - $100</strong>";
			fltSub += OptionPrice[5];
			break;
		case 2:
			strMusic = strMusic + "<br><br><strong>Acoustic Demo - $300</strong>";
			fltSub += OptionPrice[6];
			break;
		case 3:
			strMusic = strMusic + "<strong><br><br>Full Production - $500</strong>";
			fltSub += OptionPrice[7];
			break;
			
		}
	}
	for (var i = 0; i < document.forms[0].chkOption.length; i++){
		if (document.forms[0].chkOption[i].checked){
			fltSub += OptionPrice[i];
			strMusic = strMusic + "" + document.forms[0].chkOption[i].value + "<br />";
		}
	}
	
	fltSub = fltSub.toFixed(2);
	fltTax = fltSub * fltTaxRate;
	fltTax = fltTax.toFixed(2);
	fltTotal = parseFloat(fltSub) + parseFloat(fltTax);
	fltTotal = parseFloat(fltTotal);
	fltTotal = fltTotal.toFixed(2);
	
	SetCookie("strMusic", strMusic);
	SetCookie("fltSub", fltSub);
	SetCookie("fltTax", fltTax);
	SetCookie("fltTotal", fltTotal);
	
	var fltSub = fltSub.bold();
	var fltTax = fltTax.bold();
	var fltTotal = fltTotal.bold();
	
	strSummary = strMusic;strPriceSum = "<table> <tr><td><strong>Subtotal:</strong></td> <td align='right'><strong>$</strong>" + fltSub + "</td></tr><tr><td>" + "<strong>Tax:</strong></td> <td align='right' style='border-bottom-color: White; border-bottom-width: 1px; border-bottom-style: solid;'>" + fltTax + "</td></tr><tr> <td><strong>Total:</strong></td> <td align='right'><strong>$</strong>" + fltTotal + "</td></tr></table>"
	
	document.getElementById("orderSum").innerHTML = strSummary;
	document.getElementById("priceSum").innerHTML = strPriceSum;
	return true;
	}
	
/*
function changeOption()
purpose: Make the options visible to user
parameters: none
*/

function changeOption(){
	document.getElementById("options").style.visibility = "visible";
	
// uncheck and enable
	
	for (var i = 0; i < document.forms[0].chkOption.length; i++){
		document.forms[0].chkOption[i].checked = false;
		document.forms[0].chkOption[i].disabled = false;
		}
		orderSummary();
		}
		
/*
function hideOption()
purpose: Make the options invisible to user
parameters: none
*/

function hideOption(){
	document.getElementById("options").style.visibility = "hidden";
	// uncheck and disable
	for (var i = 0; i < document.forms[0].chkOption.length; i++){
		document.forms[0].chkOption[i].checked = false;
		document.forms[0].chkOption[i].disabled = true;
		}
		orderSummary();
		}
		
/*
function ckform(formIndex)
purpose: verify that required fields are completed
parameters: formIndex as an integer, representing the form number within the page
*/

function ckform(formIndex){
	// identifed txtFName as the field 15 of the form
	var intStartCheck = 15;
	var intNumFields = document.forms[formIndex].elements.length;
	var strCustomer = "";
	
	for (var i = intStartCheck; i < intNumFields; i++){
		if (document.forms[formIndex].elements[i].name != "txtApartment"){
			if (document.forms[formIndex].elements[i].value == ""){
				document.getElementById(document.forms[formIndex].elements[i].name).innerHTML = "<span style='color:black;'>Required Field</span>";
				document.forms[formIndex].elements[i].focus();
				return false;
				}
			strCustomer += document.forms[formIndex].elements[i].value + " ";
			if (document.forms[formIndex].elements[i].name != "txtFName"){strCustomer += "<br />";
			}
			}
			}

	orderSummary();
	// remove the value of the submit button from the string
	strCustomer = strCustomer.slice(0, (strCustomer.length - 23));
	SetCookie("Customer", strCustomer);
	SetCookie("custFName", document.forms[0].txtFName.value);
	SetCookie("custLName", document.forms[0].txtLName.value);
	
	return true;
	}

function clearThis(){
	var formIndex = 0;
	var intStartCheck = 0;
	var intNumFields = document.forms[formIndex].elements.length - 1;
	
	for (var i = intStartCheck; i < intNumFields; i++){
		if (document.forms[formIndex].elements[i].name != "txtApartment"){
			document.getElementById(document.forms[formIndex].elements[i].name).innerHTML = "";
			}
		}
			return true;
	}

/* ----------------------------------------------
function replaceString(stringValue)
purpose: replaces special HTML characters in cookie values
parameters: stringValue as string, the value to be encoded
notes: can be used for more than cookies
---------------------------------------------- */

function replaceString(stringValue){
	newString = stringValue;
	/*newString = newString.replace('"','&quot;');
	newString = newString.replace("'", '&apos;');
	newString = newString.replace("–", '&ndash;');
	newString = newString.replace("—", '&mdash;');
	newString = newString.replace("¡", '&iexcl;');
	newString = newString.replace("¿", '&iquest;');
	newString = newString.replace("“", '&ldquo;');
	newString = newString.replace("”", '&rdquo;');
	newString = newString.replace("‘", '&lsquo;');
	newString = newString.replace("’", '&rsquo;');
	newString = newString.replace("«", '&laquo;');
	newString = newString.replace("»", '&raquo;');
	newString = newString.replace(" ", '&nbsp;');
	newString = newString.replace("&", '&amp;');
	newString = newString.replace("¢", '&cent;');
	newString = newString.replace("©", '&copy;');
	newString = newString.replace("÷", '&divide;');
	newString = newString.replace(">", '&gt;');
	newString = newString.replace("<", '&lt;');
	newString = newString.replace("<", '&lt;');*/
	
	return newString;
	}
/* ----------------------------------------------
function writePCCookies(){
purpose: writes the PC information cookies 
author:
parameters: none
---------------------------------------------- */

function writePCCookies(){
	SetCookie("MusicService", document.getElementById("orderSum").innerHTML);
	SetCookie("PriceSum", document.getElementById("priceSum").innerHTML);
	window.location.href = "custInfo.html";
	return true;
	}
	
/* ----------------------------------------------
function chForm(){
purpose: checks the customer information form for complete and correct information
author:
parameters: none
---------------------------------------------- */

function chForm(){
	var intNumFields = document.forms[0].elements.length;
	var phoneExp = /\d\d\d-\d\d\d-\d\d\d\d/;
	var zipExp = /\d{5}/;
	var emailExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	
	// check that values have been entered into required fields
	for (var i = 0; i < intNumFields; i++){
		if (document.forms[0].elements[i].name != "txtApartment"){
			if (document.forms[0].elements[i].value.length == 0){
				document.getElementById(document.forms[0].elements[i].name).innerHTML = "<span style='color:black;'>Required Field</span>";
				document.forms[0].elements[i].focus();
				document.forms[0].elements[i].select();
				return false;
				}
			}
		}
		if (!emailExp.test(document.forms[0].txtEmail.value)){
			document.getElementById("txtEmail").innerHTML = "<span style='color:black;'>Please enter a valid email address</span>";
			document.forms[0].txtEmail.focus();
			document.forms[0].txtEmail.select();
			return false
			}
		if (!phoneExp.test(document.forms[0].txtPhone.value)){
			document.getElementById("txtPhone").innerHTML = "<span style='color:black;'>Please enter a valid phone number</span>";
			document.forms[0].txtPhone.focus();
			document.forms[0].txtPhone.select();
			return false
		}
		
		// customer order information is correct write cookie for customer information
		
		writeCustCookie();return true;
		//return false;
		}
		/* ----------------------------------------------
		function writeCustCookie(){
		purpose: Writes the customer informstion cookiesauthor:
		parameters: none
		---------------------------------------------- */
		function writeCustCookie(){
			var strCustName = document.forms[0].txtFName.value + " " + document.forms[0].txtLName.value;
			
			SetCookie("custName", document.forms[0].txtFName.value + " " + document.forms[0].txtLName.value);
			SetCookie("custAddress", document.forms[0].txtAddress.value + " " + document.forms[0].txtApartment.value);SetCookie("custCity", document.forms[0].txtCity.value + ", " + document.forms[0].txtState.value + " " + document.forms[0].txtZip.value);
			SetCookie("custEmail", document.forms[0].txtEmail.value);
			SetCookie("custPhone", document.forms[0].txtPhone.value);return true;
			}
			var milisec=0;
			var seconds=60;
			var minutes=29;
		/* ----------------------------------------------
		function secondPassed(){
		purpose: Count down clock for deliveryauthor:
		parameters: none
		---------------------------------------------- */
		// 1800 seconds in 30 minutes
		
		var seconds = 30*24*3600;
		
		// seconds set at 20 for testing
		
		var seconds = 20;
		function secondPassed() {
		// Calculate the number of days left    
			var days=Math.floor(seconds / 86400); 
		// After deducting the days calculate the number of hours left    
			var hours = Math.floor((seconds - (days * 86400 ))/3600)
		// After days and hours , how many minutes are left     
			var minutes = Math.floor((seconds - (days * 86400 ) - (hours *3600 ))/60)
		// Finally how many seconds left after removing days, hours and minutes.    
			var secs = Math.floor((seconds - (days * 86400 ) - (hours *3600 ) - (minutes*60)))   
			var x = secs + " Seconds ";   
			document.getElementById('countdown').innerHTML = x;
		// create an alternate display if PC has not arrived
		if (seconds == 0) {      
			clearInterval(countdownTimer);
			window.location.href = "order.html";
			document.getElementById('countdown').innerHTML = "Please call us, your PC should have arrived!";   
			}
			else {      
				seconds--;   
				}
				return true;
				}
				
				var countdownTimer = setInterval('secondPassed()', 1000);