
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	
    /*var dirEntry = function (entry) {
    var dirReader = entry.createReader();
    dirReader.readEntries(
        function (entries) {
            $.each(entries, function (n, i) {
                if (i.isDirectory === true) {
                    if (i.nativeURL.indexOf('www/tones') > -1) {
                        //found the target /res directory
                        var path = i.nativeURL + '/Daybreak.mp3';
                        alert (path);
                        window.resolveLocalFileSystemURL(path, app.gotFile, app.fail);
                        return false; //no need to iterate more
                    } else {
                        // Recursive -- call back into this subdirectory
                        dirEntry(i);
                    }
                }
            });
//test
        },
        function (error) {
            alert("readEntries error: " + error.code);
        }
    );
};

var dirError = function (error) {
    alert("getDirectory error: " + error.code);
};

window.resolveLocalFileSystemURL(cordova.file.dataDirectory, dirEntry, dirError);*/

alert (cordova.file.applicationDirectory);
  
    	playAudio("file:///data/user/0/com.adobe.phonegap.app/files/phonegapdevapp/www/tones/rs//Daybreak.mp3");


       	if(screen.lockOrientation) {
		    screen.lockOrientation('portrait');
		} else {
		screen.orientation.lock('portrait');
		}

        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};

var folderName = window.location.hash;
folderName = folderName.split('#')[1];
folderName = folderName.replace("%20", " ");
document.getElementById("FolderAlarmsTitle").innerHTML = folderName;

/*alert ("selected days are: "+localStorage.getItem(folderName+keySeek+"daySelect")+newLine
		+"Alarm Timing is: "+localStorage.getItem(folderName+keySeek+"alarmTiming")+newLine
		+"Alarm Name is: "+localStorage.getItem(folderName+keySeek+"alarmName")+newLine
		+"Alarm Tone is: "+localStorage.getItem(folderName+keySeek+"tonesStored"));*/
//localStorage.clear();
for(var i = 1; i < 10; i++) {
	
	var key = ("00" + i).slice(-3);
	var selectedAlarmTime = localStorage.getItem(folderName+key+"alarmTiming");

	//alert(selectedAlarmTime);
	//alert(localStorage.getItem(folderName+"003alarmTiming"))

	if (selectedAlarmTime != null){
		var selectedTiming = localStorage.getItem(folderName+key+"daySelect");
		var selectedName = localStorage.getItem(folderName+key+"alarmName");
		var selectedTones = localStorage.getItem(folderName+key+"tonesStored");
		var selectedSwitch = localStorage.getItem(folderName+key+"alarmSwitch");

		//the time
		selectedAlarmTime = '<td id="alarmT'+key+'">'+selectedAlarmTime+'<span class="sub" id="sub'+key+'"></span>';
		
		//the days
		if (selectedTiming != null){
			if (selectedTiming == "mon;tue;wed;thu;fri"){
				var compoundingTiming = "Weekdays";
			}
			else if(selectedTiming == "sun;sat"){
				var compoundingTiming = "Weekend";
			}
			else if(selectedTiming == "sun;mon;tue;wed;thu;fri;sat"){
				var compoundingTiming = "Everyday";
			}
			else{
				//alert(selectedTiming);
				var compoundingTiming = selectedTiming;
				compoundingTiming = compoundingTiming.replace(";", ",");
			}
			selectedTiming = '<span class="days" id="days'+key+'">'+compoundingTiming+'</span>';
		}
		
		//the name //selectedName
		//the tone //selectedTones
		

		//the switch
		if (selectedSwitch != null){
			if (selectedSwitch == "Off"){
				var firstSwitch = "";
			}
			else{
				var firstSwitch = "checked";
			}
		}
		else{
			var firstSwitch = "checked";
		}

		/////////////////////////MAIN SCRIPT!!!!!
		document.getElementById("alarms").innerHTML += '<tr id="s'+key+'"><td><div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch'+key+'" tabindex="0" '+firstSwitch+' onclick="switched(this.checked, this.id);"><label class="onoffswitch-label" for="myonoffswitch'+key+'"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label></div></td>'+selectedAlarmTime+selectedTiming+'</td><td><img src="img/alarmOn.png" id="alarmImg'+key+'"></td><td class="dots" id="dots'+key+'" onclick="modifyAlarm(this.id);">...</td></tr>';
		////////////////////////////////////////
		
		//running the switch function
		if (firstSwitch == ""){
			switched(false, "myonoffswitch"+key);
		}
		else{
			switched(true, "myonoffswitch"+key);	
		}
	}
	else{
		if (key == "001"){
			document.getElementById("alarmStatus").innerHTML = "No Alarms Set";
			document.getElementById("hiddenID").value = key;
		}
		else{
			//alert (key);
			//key = ("00" + (parseInt(key) + 1)).slice(-3);
			document.getElementById("hiddenID").value = key;
		}
		break;
	}
}


var my_media = null;
var mediaTimer = null;

function playAudio(src) {
	my_media = new Media(src, onSuccess, onError);
    
    my_media.play();

    if(mediaTimer == null){
    	mediaTimer = setInterval(function(){
    		my_media.getCurrentPosition(
    			function(position){
    				if(position > -1){
    					setAudioPosition((position) + " sec");
    				}
    			},
    			function(e){
    				alert("Error getting pos=" + e);
    				setAudioPosition("Error: " + e);
    			}
    	);
    }, 1000);
}
}

function pauseAudio(type){
	if(my_media){
		if(type == 0){
			my_media.pause();
		}
		else{
			my_media.play();
		}
	}
}

function stopAudio(){
	if(my_media){
		my_media.stop();
	}
	clearInterval(mediaTimer);
	mediaTimer = null;
}

function onSuccess(){
	alert("playAudio():Audio Success");
}

function onError(error){
	alert("code: " + error.code + "\n" +
		"message: " + error.message + "\n");
}
function setAudioPosition(position){
	document.getElementById("audio_position").innerHTML = position;
}


function modifyAlarm(x){
	var x = x.substr(x.length - 3);
	var selectedAlarmTime = localStorage.getItem(folderName+x+"alarmTiming");
	var selectedTiming = localStorage.getItem(folderName+x+"daySelect");
	var selectedName = localStorage.getItem(folderName+x+"alarmName");
	var selectedTones = localStorage.getItem(folderName+x+"tonesStored");
	var selectedSwitch = localStorage.getItem(folderName+x+"alarmSwitch");
	//alert (x);
	//document.getElementById("modifyFolder").style.display = "block";
	//document.getElementById("modifyFolder")
	document.getElementById("allAlarms").style.display = "none";
	document.getElementById("backToFolders").style.display = "none";
	document.getElementById("addAlarm").style.display = "none";
	
	document.getElementById("setAlarm").style.display = "block";
	document.getElementById("newAlarmMenu").innerHTML = "MODIFY ALARM";
	document.getElementById("alarmTiming001").value = selectedAlarmTime;
	
	
	var daysArr = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
	for (var y = 0; y < daysArr.length; y++){
		document.getElementById(daysArr[y]).className = "daySelect";
	}

	if (selectedTiming.length > 3){
		var selectedTimingArr = selectedTiming.split(';');
		for(var i = 0; i < selectedTimingArr.length; i++){
			document.getElementById(selectedTimingArr[i]).className = "daySelect2";
		}
	}
	else{
		document.getElementById(selectedTiming).className = "daySelect2";
	}

	if (selectedName != null){
		document.getElementById("alarmName001").innerHTML = selectedName;
	}

	if (selectedTones != null){
		document.getElementById("toneName001").innerHTML = selectedTones;
	}



	/*document.getElementById("newAlarmMenu").style.display = "none";
	document.getElementById("addAlarm").style.display = "none";
	document.getElementById("foldersPage").style.display = "none";
	var folderName = document.getElementById("folderName"+key).innerHTML;
	document.getElementById("modifyFolder").innerHTML = '<div style="font-size:200%; font-weight: bolder; color: #DDD; text-transform: capitalize;"><u>Editing '+folderName+'</u></div><br><input type="text" placeholder="Press to set '+folderName+'" id="modifyInputFolder" autocomplete="off" style="font-size: 150%; width: 65%; background-color: transparent; border: none; border-bottom: 1px blue solid;"><br><br><table width="80%" align="center" border="0"><tr><td onclick="goBack2();"><div class="buttonGrey">Cancel</div></td><td><div class="buttonGrey" onclick="modifyInputFolder(\''+folderName+'\');">Change</div></td></tr><tr><td colspan="2">&nbsp;</td></tr><tr><td colspan="2"><div class="buttonRed"  onclick="deleteInputFolder(\''+folderName+'\');"><img src="img/delete.png">Delete</div></td></tr></table><br><br>';
*/}


function generateMainPage(){
	if (localStorage.getItem('FoldersStored') != ""){ 
		var FoldersStored = localStorage.getItem("FoldersStored");
		var foldersPage = document.getElementById("foldersPage");
		var numArr = FoldersStored.split(';');
		for(var i = 0; i < numArr.length; i++) {
			var lastId = foldersPage.rows.length;
			lastId = lastId + 1;
			lastId = ("00" + lastId).slice(-3);

			foldersPage.innerHTML += '<tr id="folder'+lastId+'"><td width="1%" onclick="openFolder(this.id);"><img src="img/folder.png" width="60px"></td><td align="left" width="90%" class="folderName" id="folderName'+lastId+'" onclick="openFolder(this.id);">'+numArr[i]+'</td><td class="dots" id="folderDots'+lastId+'" onclick="showDropDown(this.id);" style="font-size:250%;">...</td></tr>';
			//foldersPage.innerHTML += '<tr onclick="openFolder();"><td width="1%"><img src="img/folder.png" width="60px"></td><td align="left" width="90%" class="folderName">'+numArr[i]+'</td><td class="dots" style="font-size:250%;">...</td></tr>';
		}
	}
	//var folders = JSON.parse(localStorage.getItem("FoldersStored"));
	//internalSorage.getItem()
	//alert (folders);
	//alert (localStorage.getItem("FoldersStored"));
}

function myStorage(folder){
	if(localStorage.getItem('FoldersStored') === ""){
		localStorage.setItem("FoldersStored", folder);
	}
	else{
		var oldV = localStorage.getItem("FoldersStored");
		localStorage.setItem("FoldersStored", oldV+";"+folder);	
	}
}

function showDropDown(x){
	var key = x.substr(x.length - 3);
	document.getElementById("modifyFolder").style.display = "block";
	document.getElementById("newAlarmMenu").style.display = "none";
	document.getElementById("addAlarm").style.display = "none";
	document.getElementById("foldersPage").style.display = "none";
	var folderName = document.getElementById("folderName"+key).innerHTML;
	document.getElementById("modifyFolder").innerHTML = '<div style="font-size:200%; font-weight: bolder; color: #333;"><u>Editing '+folderName+'</u></div><br><input type="text" placeholder="Modify Folder '+folderName+'" id="modifyInputFolder" autocomplete="off" style="font-size: 150%; width: 65%;"><br><br><table width="80%" align="center" border="0"><tr><td onclick="goBack2();"><div class="buttonGrey">Cancel</div></td><td><div class="buttonGrey" onclick="modifyInputFolder(\''+folderName+'\');">Change</div></td></tr><tr><td colspan="2">&nbsp;</td></tr><tr><td colspan="2"><div class="buttonRed"  onclick="deleteInputFolder(\''+folderName+'\');"><img src="img/delete.png">Delete</div></td></tr></table><br><br>';
}

function addAlarm2(){
	var alarmName = localStorage.getItem(folderName+key+"alarmName");
	if (alarmName != null){
		document.getElementById("alarmName"+key).innerHTML = alarmName;
	}

	var daySelect = localStorage.getItem(folderName+key+"daySelect");
	if (daySelect != null){
		var numArr = daySelect.split(';');
		for(var i = 0; i < numArr.length; i++) {
			document.getElementById(numArr[i]).className = "daySelect2";
		}
	}

	var alarmTime = localStorage.getItem(folderName+key+"alarmTiming");
	if (alarmTime != null){
		document.getElementById("alarmTiming001").value = alarmTime;
	}

	document.getElementById("addAlarm").style.display = "none";
	document.getElementById("backToFolders").style.display = "none";
	document.getElementById("allAlarms").style.display = "none";
	document.getElementById("setAlarm").style.display = "block";

	
}

function switched(x, y){
	var key = y.substr(y.length - 3);
	//alert ("x is: "+x+" and Y is: "+y);
	if (x){
		document.getElementById("alarmImg" + key).src = "img/alarmOn.png";
		document.getElementById("alarmT" + key).style.color = "#FFF";
		localStorage.setItem(folderName+key+"alarmSwitch", "On");
	}
	else{
		document.getElementById("alarmImg" + key).src = "img/alarmOff.png";
		document.getElementById("alarmT" + key).style.color = "#AAA";
		localStorage.setItem(folderName+key+"alarmSwitch", "Off");
	}
}


function chooseDay(x){
	var currx = document.getElementById(x);
//	var daySelect = folderName+key+"daySelect";
	
	if (currx.className == "daySelect"){
		currx.className = "daySelect2";
//		if(localStorage.getItem(daySelect) == "" || localStorage.getItem(daySelect) == null){
//			localStorage.setItem(daySelect, x);
//		}
//		else{
//			var currDaySelectStorage = localStorage.getItem(daySelect);
//			currDaySelectStorage += ";"+x;
//			localStorage.setItem(daySelect, currDaySelectStorage);	
//		}
	}
	else{
		currx.className = "daySelect";
//		var currDaySelectStorage = localStorage.getItem(daySelect);
//		var fItem = currDaySelectStorage.indexOf(";"+x);
//		var bItem = currDaySelectStorage.indexOf(x+";");
		//alert (fItem);
//		if(fItem > -1){
//			var newCurrDaySelectStorage = currDaySelectStorage.replace(";"+x, "");
//		}
//		else{
//			if(bItem > -1){
//				newCurrDaySelectStorage = currDaySelectStorage.replace(x+";", "");
//			}
//			else{
//				newCurrDaySelectStorage = currDaySelectStorage.replace(x, "");
//			}
//		}
//		localStorage.setItem(daySelect, newCurrDaySelectStorage);
	}
}

function AlarmName(){
	var folderKey = folderName + key;
	document.getElementById("setAlarm").style.display = "none";
	document.getElementById("setAlarmName").style.display = "block";
	document.getElementById("setAlarmName").innerHTML = '<div style="font-size:150%; font-weight: bolder; color: #DDD; text-transform: capitalize;"><br><u>Alarm name</u></div><br><input type="text" placeholder="Press to enter name" id="modifyInputAlarmName" autocomplete="off"><br><br><table width="80%" align="center" border="0"><tr><td onclick="goBackAlarmName();"><div class="buttonGrey">Cancel</div></td><td><div class="buttonGrey" onclick="newAlarmNameCreate();">Confirm</div></td></tr><tr><td colspan="2">&nbsp;</td></tr></table><br>';
	document.getElementById("modifyInputAlarmName").focus();
}

function goBackAlarmName(){
	document.getElementById("setAlarm").style.display = "block";
	document.getElementById("setAlarmName").style.display = "none";
}

function newAlarmNameCreate(){
	var AlarmName = document.getElementById("modifyInputAlarmName").value;
	localStorage.setItem(folderName+key+"alarmName", AlarmName);
	document.getElementById("alarmName"+key).innerHTML = AlarmName;
	goBackAlarmName();
}

function goBack2(){
	document.getElementById("addAlarm").style.display = "block";
	document.getElementById("setAlarm").style.display = "none";
	document.getElementById("allAlarms").style.display = "block";
	document.getElementById("backToFolders").style.display = "block";
}

function setAlarm(){
	var alarmTiming = document.getElementById("alarmTiming001").value;
	//alert(key);
	var theseAreTheDays = "";
	var daySelect2 = document.querySelectorAll('.daySelect2');
	for(var i=0; i< daySelect2.length; i++){
		//alert (daySelect2[i].id);
		if (i == 0){
			theseAreTheDays += daySelect2[i].id;
		}
		else{
			theseAreTheDays += ";"+daySelect2[i].id;
		}
	}

	localStorage.setItem(folderName+key+"alarmTiming", alarmTiming);
	localStorage.setItem(folderName+key+"daySelect", theseAreTheDays);
	//alert (theseAreTheDays);

	var newLine = "\r\n";

	/*alert ("selected days are: "+localStorage.getItem(folderName+key+"daySelect")+newLine
		+"Alarm Timing is: "+localStorage.getItem(folderName+key+"alarmTiming")+newLine
		+"Alarm Name is: "+localStorage.getItem(folderName+key+"alarmName")+newLine
		+"Alarm Tone is: "+localStorage.getItem(folderName+key+"tonesStored"));*/

	//goBack2();
	location.reload();
}

function modifyInputFolder(x){
	var modifiedFolder = document.getElementById("modifyInputFolder").value;
	var modify = localStorage.getItem("FoldersStored");
	var modify = modify.replace(x, modifiedFolder);
	localStorage.setItem("FoldersStored", modify);
	location.reload();
}

function deleteInputFolder(x){
	var deleteFolder = localStorage.getItem("FoldersStored");
	var fItem = deleteFolder.indexOf(";"+x);
	var bItem = deleteFolder.indexOf(x+";");
	if (fItem > -1){
		var deleting = deleteFolder.replace(";"+x, "");
	}
	else{
		if(bItem > -1){
			var deleting = deleteFolder.replace(x+";", "");
		}
		else{
			var deleting = deleteFolder.replace(x, "");	
		}
	}
	localStorage.setItem("FoldersStored", deleting);
	location.reload();
}

function addFolder(){
	myStorage(inputFolder.value);
	location.reload();
	//var foldersPage = document.getElementById("foldersPage");
	//var lastId = foldersPage.rows.length;
	//lastId = lastId + 1;
	//lastId = ("00" + lastId).slice(-3);
	
	//foldersPage.innerHTML += '<tr id="folder'+lastId+'" onclick="openFolder(this.id);"><td width="1%"><img src="img/folder.png" width="60px"></td><td align="left" width="90%" class="folderName" id="folderName'+lastId+'">'+inputFolder.value+'</td><td class="dots" id="folderDots"'+lastId+' style="font-size:250%;">...</td></tr>';
	//inputFolder.value = "";
	//goBack();
	//document.getElementById("newAlarmMenu").innerHTML = "<u>My Folders</u>";

}

function openFolder(x){
	var key = x.substr(x.length - 3);
	var folderName = document.getElementById("folderName"+key).innerHTML;
	window.location = "folders.html#"+folderName;
	/*
	document.getElementById("mainPage").style.display = "none";
	document.getElementById("allAlarms").style.display = "block";
	document.getElementById("backToFolders").style.display = "block";
	document.getElementById("FolderAlarmsTitle").innerHTML = document.getElementById("folderName"+key).innerHTML*/
}

function backToFolders2(){
	window.location = "index.html";
}

function fetchFile(file1){
	//var file = file1.files[0];
    //var formData = new FormData( $("#fileUpload")[0] );
    //formData.append('formData', file);

    /*var Username = "hi";
    var Password = "bye";

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //document.getElementById("txtHintRegister").innerHTML = xmlhttp.responseText;
            alert (xmlhttp.responseText);
        }
    }
	
    xmlhttp.open("POST","http://slikke.net/Yousif/addFile.php?Username=" + Username + "&pass=" + Password, true);
    xmlhttp.send();*/

    var file = file1.files[0];
    var formData = new FormData( $("#fileUpload")[0] );
    formData.append('formData', file);
    //var formData = "testMe";
    $.ajax({
    type: "POST",
    url: "http://slikke.net/Yousif/addFile.php",    
    contentType: false,
    processData: false,
    data: formData,
    success: function (data) {
      alert(data);
      }
  });
}

function AlarmTone(){
	//selectedToneChanged = localStorage.getItem(folderName+key+"tonesStored");
	//document.getElementById("newAlarmMenu").style.display = "none";
	document.getElementById("pickAlarm").style.display = "block";

}

var selectedTone = "";
var selectedToneChanged = "";

function cancelAlarmTone(){
	selectedToneChanged = localStorage.getItem(folderName+key+"tonesStored");

	if (selectedToneChanged == selectedTone){
		alert ("No changes were made");
	}
	else{
		alert ("New Ringtone Saved");
	}
	selectedTone = localStorage.getItem(folderName+key+"tonesStored");
	document.getElementById("toneName001").innerHTML = selectedTone.substring(3);
	document.getElementById("pickAlarm").style.display = "none";

}

function AlarmsFolder(x){
	document.getElementById("alarmTones").style.display = "none";
	document.getElementById(x+"01").style.display = "block";
}

function backToAlarmTone(x){
	x = x.substring(0, x.length - 4);
	document.getElementById("alarmTones").style.display = "block";
	document.getElementById(x+"01").style.display = "none";
}

var oldToneSel = "";
function AlarmsFile(x,y){
	var tonesStored = folderName+key+"tonesStored";
	localStorage.setItem(tonesStored, x+"/"+y);
	
	if (oldToneSel != ""){
		document.getElementById(oldToneSel).style.backgroundColor = "#222";
		document.getElementById(oldToneSel).style.color = "#FFF";
		document.getElementById(oldToneSel).style.fontWeight = "normal";
		document.getElementById(oldToneSel+"01").style.backgroundColor = "#222";
	}

	document.getElementById(y).style.backgroundColor = "#678";
	document.getElementById(y).style.color = "#333";
	document.getElementById(y).style.fontWeight = "bolder";
	document.getElementById(y+"01").style.backgroundColor = "#678";
	oldToneSel = y;

	/*document.getElementById("innerAudio").pause();
	document.getElementById("innerAudio").setAttribute('src', "/tones/"+x+"/"+y+".mp3");
	document.getElementById("innerAudio").load();
	document.getElementById("innerAudio").play();
	document.getElementById("innerAudio").loop = true;*/
}

var oldPlE = "";
function plTest(x, y){
	var inaImg = document.getElementById(y);
	var playMe = '<img src="img/play.png" width="40px">';
	var stopMe = '<img src="img/stop.png" width="40px">';

	if (inaImg.innerHTML == playMe){
		y = y.substring(0, y.length - 2);
 		document.getElementById("innerAudio").pause();
		document.getElementById("innerAudio").setAttribute('src', "/tones/"+x+"/"+y+".mp3");
		


		document.getElementById("innerAudio").load();
		document.getElementById("innerAudio").play();
		inaImg.innerHTML = stopMe;
		if (oldPlE != ""){
			if (document.getElementById(oldPlE+"01").innerHTML == stopMe){
				document.getElementById(oldPlE+"01").innerHTML = playMe;
			}
		}
		oldPlE = y;


	}
	else if(inaImg.innerHTML == stopMe){
		document.getElementById("innerAudio").pause();
		inaImg.innerHTML = playMe;	
	}
 }
