// --------------------------------------------------------------------------------
// SCRIPTS - MAIN
//---------------------------------------------------------------------------------
// Init
$("#settingsbuttonclose").hide();
$("#adminscreen h1").hide();


// Click - Settings Button Open
$("#settingsbuttonopen").click(function () {
	$("#adminscreen").css("width", "100vw");
	$("#adminscreen").css("height", "100vh");
	$("#settingsbuttonopen").hide();
	$("#settingsbuttonclose").show();
	$("#adminscreen h1").fadeIn();
});


// Click - Settings Button Close
$("#settingsbuttonclose").click(function () {
	$("#adminscreen").css("width", "0");
	$("#adminscreen").css("height", "0");
	$("#settingsbuttonclose").hide();
	$("#settingsbuttonopen").show();
	$("#adminscreen h1").fadeOut();

});


function timeloop(timeIndex) {
	//console.log("tick - " + timeIndex);

	// Update longest wait now progress bar
	calculateLongestWaitNow(timeIndex);
}


function callloop(callIndex) {
	//console.log("callback" + callIndex);

	// Get data based on call index
	var call = appData.calls[callIndex];

	// Update tiles with call data
	$("#data-waiting-now .data").text( appData.calls[callIndex].waitingNow );
	$("#data-answered-now .data").text( appData.calls[callIndex].answeredNow );
	$("#data-overflowed-off .data").text( appData.calls[callIndex].overflowedOff );
	$("#data-inbound-abandoned .data").text( appData.calls[callIndex].inboundAbandoned );
	$("#data-inbound-answered .data").text( appData.calls[callIndex].inboundAnswered );
	$("#data-inbound-calls .data").text( parseInt(appData.calls[callIndex].inboundAbandoned) + parseInt(appData.calls[callIndex].inboundAnswered) );
	$("#data-percentage-service-level .data").text( ( (parseInt(appData.calls[callIndex].inboundAbandoned) / parseInt(appData.calls[callIndex].inboundAnswered) ) * 100 ).toFixed(1) );
	$("#data-outbound-answered .data").text( appData.calls[callIndex].outboundAnswered );
	$("#data-outbound-calls .data").text( appData.calls[callIndex].outboundCalls );
	$("#data-total-talk-time .data").text( intToTime( appData.calls[callIndex].totalTalkTime ) );
	$("#data-avg-talk-time .data").text( intToTime( appData.calls[callIndex].averageTalkTime ) );

	// Apply graient to service level
	var percentServiceLevel = "#data-percentage-service-level > div";
	var percentage =  ( ( (parseInt(appData.calls[callIndex].inboundAbandoned) / parseInt(appData.calls[callIndex].inboundAnswered) ) * 100 ).toFixed(1) );
	gradient(percentServiceLevel, percentage, threshholdServiceLevel, "UP");
}


function gradient(target, value, threshbold, direction="UP"){
	var colorRed = '#D60000';
	var colorGreen = '#33A301';
	var test = [];
	var colorCurrent;

	var colorRtoG = [colorRed, '#D02700', '#CA4C00', '#C56F00', '#BF8F00', '#B9AE00', '#9DB300', '#77AE00', '#54A800', colorGreen]
	var colorGtoR = [colorGreen, '#54A800', '#77AE00', '#9DB300', '#B9AE00', '#BF8F00', '#C56F00', '#CA4C00', '#D02700', colorRed]

	// Choose color array to use dependant on gradient directions
	if( direction == "UP"){
		for(i=0;i<11;i++){
			test[i]=colorRtoG[i];
		}
	} else {
		for(i=0;i<11;i++){
			test[i]=colorGtoR[i];
		}
	}

	// Threshold code
	if (value < 10){
		colorCurrent = test[1];
	}
	else if (value < 20){
		colorCurrent = test[2];
	}
	else if (value < 30){
		colorCurrent = test[3];
	}
	else if (value < 40){
		colorCurrent = test[4];
	}
	else if (value < 50){
		colorCurrent = test[5];
	}
	else if (value < 60){
		colorCurrent = test[6];
	}
	else if (value < 70){
		colorCurrent = test[7];
	}
	else if (value < 80){
		colorCurrent = test[8];
	}
	else if (value < 90){
		colorCurrent = test[9];
	}

	$( target ).css("background-color", colorCurrent);
}


function calculateLongestWaitNow(timeIndex) {
	// Declarations
	var isPulse = false;

	// Update time
	$("#data-longest-wait-now .data").text( intToTime( timeIndex ) );

	// Calculate progress bar
	var longestWaitingPercentage = ( (timeIndex / thresholdLongestWaitNow) * 100 ).toFixed(1);
	if(longestWaitingPercentage > 96){
		// Update progress bar
		$("#data-longest-wait-now-progress").css( "width", "auto" );
		$("#data-longest-wait-now-progress").css( "right", "10px" );

		if(!isPulse){
			$("#data-longest-wait-now .data").addClass("data-pulse");
			isPulse = true;
		}
	} else {
		// Update progress bar
		$("#data-longest-wait-now-progress").css( "width", longestWaitingPercentage + "%" );

		// Fire the gradient change
		gradient("#data-longest-wait-now-progress", longestWaitingPercentage, thresholdLongestWaitNow, "DOWN")
	}
}


function intToTime(seconds) {

    var sec_num = parseInt(seconds, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}
