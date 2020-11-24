
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
        if(screen.lockOrientation) {
		    screen.lockOrientation('portrait');
		} else {
		screen.orientation.lock('portrait');
		}
		generateMainPage();
        
        

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

/*var alarmFrame = document.getElementById("alarmFrame");
if (alarmFrame.innerHTML == ""){
	document.getElementById("alarmStatus").innerHTML = "No active alarms";
}*/

//generateMainPage();

//alert (localStorage.getItem('FoldersStored'));

function generateMainPage(){

	for (var i = 1; i<999; i++){
		var lastId = ("00" + i).slice(-3);
		if (localStorage.getItem('FoldersStored'+lastId) != null && localStorage.getItem('FoldersStored'+lastId) != "deleted"){
			document.getElementById("lastId").value = lastId;
			var foundFolder = localStorage.getItem('FoldersStored'+lastId);
			foldersPage.innerHTML += '<tr id="folder'+lastId+'" class="lineBreaker"><td width="1%" id="changeAlarms'+lastId+'" onclick="changeAlarms(this.id);"><img src="img/folderOff.png" width="60px" id="folderChAlarms'+lastId+'"></td><td align="left" width="90%" class="folderName" id="folderName'+lastId+'" onclick="openFolder(this.id);">'+foundFolder+'</td><td class="dots" id="folderDots'+lastId+'" onclick="showDropDown(this.id);" style="font-size:250%;">...</td></tr>';
		}
		else if(localStorage.getItem('FoldersStored'+lastId) == "deleted"){
		}
		else{
			document.getElementById("lastId").value = lastId;
			break;
		}
	}

	var lineBreaker = document.getElementsByClassName("lineBreaker");
	if (lineBreaker.length == 0){
		document.getElementById("noFoldersValue").innerHTML = "No Folder Available";
		localStorage.clear();
		document.getElementById("lastId").value = "001";
	}

	/*if (localStorage.getItem('FoldersStored') != ""){ 
		//alert ("coming here");
		var FoldersStored = localStorage.getItem("FoldersStored");
		var foldersPage = document.getElementById("foldersPage");
		var numArr = FoldersStored.split(';');
		for(var i = 0; i < numArr.length; i++) {
			var lastId = foldersPage.rows.length;
			lastId = lastId + 1;
			lastId = ("00" + lastId).slice(-3);
			
			document.getElementById("lastId").value = lastId;
			foldersPage.innerHTML += '<tr id="folder'+lastId+'" class="lineBreaker"><td width="1%" id="changeAlarms'+lastId+'" onclick="changeAlarms(this.id);"><img src="img/folderOff.png" width="60px" id="folderChAlarms'+lastId+'"></td><td align="left" width="90%" class="folderName" id="folderName'+lastId+'" onclick="openFolder(this.id);">'+numArr[i]+'</td><td class="dots" id="folderDots'+lastId+'" onclick="showDropDown(this.id);" style="font-size:250%;">...</td></tr>';
			//foldersPage.innerHTML += '<tr onclick="openFolder();"><td width="1%"><img src="img/folder.png" width="60px"></td><td align="left" width="90%" class="folderName">'+numArr[i]+'</td><td class="dots" style="font-size:250%;">...</td></tr>';
		}
	}*/
	/*else{
		foldersPage.innerHTML == "";
	}*/
	//var folders = JSON.parse(localStorage.getItem("FoldersStored"));
	//internalSorage.getItem()
	//alert (folders);
	//alert (localStorage.getItem("FoldersStored"));
}

function myStorage(folder){
	var lastId = document.getElementById("lastId").value;
	//if(localStorage.getItem('FoldersStored') == "" || localStorage.getItem('FoldersStored') == null){
	localStorage.setItem("FoldersStored"+lastId, folder);
	//}
	/*else{
		var oldV = localStorage.getItem("FoldersStored");
		localStorage.setItem("FoldersStored", oldV+";"+folder);	
	}*/
}

function changeAlarms(x){
	var key = x.substr(x.length - 3);
	var imgOn = '<img src="img/folderOn.png" width="60px" id="folderChAlarms'+key+'">';
	var imgOff = '<img src="img/folderOff.png" width="60px" id="folderChAlarms'+key+'">';
	if (document.getElementById("changeAlarms"+key).innerHTML == imgOn){
		document.getElementById("changeAlarms"+key).innerHTML = imgOff;
	}
	else{
		document.getElementById("changeAlarms"+key).innerHTML = imgOn;
	}
}

function showDropDown(x){
	var key = x.substr(x.length - 3);
	document.getElementById("modifyFolder").style.display = "block";
	document.getElementById("newAlarmMenu").style.display = "none";
	document.getElementById("addAlarm").style.display = "none";
	document.getElementById("foldersPage").style.display = "none";
	var folderName = document.getElementById("folderName"+key).innerHTML;
	document.getElementById("modifyFolder").innerHTML = '<div style="font-size:200%; font-weight: bolder; color: #DDD; text-transform: capitalize;"><u>Editing '+folderName+'</u></div><br><input type="text" placeholder="Press to set '+folderName+'" id="modifyInputFolder" autocomplete="off" style="font-size: 150%; width: 65%; background-color: transparent; border: none; border-bottom: 1px blue solid;"><br><br><table width="80%" align="center" border="0"><tr><td onclick="goBack2();"><div class="buttonGrey">Cancel</div></td><td><div class="buttonGrey" onclick="modifyInputFolder(\''+key+'\');">Change</div></td></tr><tr><td colspan="2">&nbsp;</td></tr><tr><td colspan="2"><div class="buttonRed"  onclick="deleteInputFolder(\''+key+'\');"><img src="img/delete.png">Delete</div></td></tr></table><br><br>';
}

function addAlarm(){
	document.getElementById("addAlarm").style.display = "none";
	document.getElementById("setFolderName").style.display = "block";
	document.getElementById("inputFolder").focus();
}

function switched(x, y){
	var key = y.substr(y.length - 3);
	if (x){
		document.getElementById("alarmImg" + key).src = "img/alarmOn.png";
		document.getElementById("alarmFrame" + key).style.color = "#FFF";
	}
	else{
		document.getElementById("alarmImg" + key).src = "img/alarmOff.png";
		document.getElementById("alarmFrame" + key).style.color = "#AAA";
	}
}


function chooseDay(x){
	var currx = document.getElementById(x);
	if (currx.className == "daySelect"){
		currx.className = "daySelect2";
	}
	else{
		currx.className = "daySelect";
	}
}

function goBack(){
	if (document.getElementById("mainPage").style.display != "none"){
		document.getElementById("setFolderName").style.display = "none";
		document.getElementById("addAlarm").style.display = "block";
	}
}

function goBack2(){
	document.getElementById("addAlarm").style.display = "block";
	document.getElementById("foldersPage").style.display = "block";
	document.getElementById("newAlarmMenu").style.display = "block";
	document.getElementById("modifyFolder").style.display = "none";
}

function modifyInputFolder(x){
	var modifiedFolder = document.getElementById("modifyInputFolder").value;
	
	if (modifiedFolder == ""){
		alert ("you need to spicify a folder name");
	}
	else if (modifiedFolder == "deleted"){
		alert ("This folder name is not allowed");
	}
	else{
		localStorage.setItem("FoldersStored"+x, modifiedFolder);
		location.reload();
	}
}

function deleteInputFolder(x){
	/*var deleteFolder = localStorage.getItem("FoldersStored");
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
	}*/
	//('FoldersStored'+lastId)
	localStorage.setItem('FoldersStored'+x, "deleted");
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

function backToFolders(){
	document.getElementById("mainPage").style.display = "block";
	document.getElementById("allAlarms").style.display = "none";
	document.getElementById("backToFolders").style.display = "none";
}