//settingsSourceArray
//importSettingsIdx - version dependent
//currSettingsIdx - current version
//settingsObj
// will have a temp outputArray which is build by looping through names in currSettingsIdx and writing outputArray[currSettingsIdx[names]] = settings[names]

 /*
 0 - define currSettingsIdx
   - initialize settingsObj, importSettingsIdx
   
 
 1 - read settingsSourceArray
 2 - get version
 3 - based on version, define importSettingsIdx
 4 - loop through currSettingsIdx, and if matching importSettingsIdx, import settingsSourceArray (based on importSettingsIdx) into settingsObj (based on currSettingsIdx)
 5 - based on currSettingsIdx, check values of settingsObj, and apply defaults if missing
 6 - initialize HTML/DHTML based upon settingsObj (apply initial settings)
 7 - onunload, create temp outputArray based upon looping through currSettingsIdx, and join, and write to cookies
 
 */
 
 function clearCookies() {
	var expDate = new Date() -10;
	setCookie("userApp","",expDate);
	setCookie("userZoomControl","",expDate);
	setCookie("userCustomSize","",expDate);
	setCookie("maptFcn","",expDate);
	setCookie("cookieArray1","",expDate);

	for (thisSetting in currSettingsIdx) {
		settingsObj[thisSetting] = getDefaultSetting(thisSetting);
		applySetting(thisSetting);
		}	
}

function getCookie(c_name) {
	if (document.cookie.length>0)
	  {
	  c_start=document.cookie.indexOf(c_name + "=");
	  if (c_start!=-1)
		{
		c_start=c_start + c_name.length+1;
		c_end=document.cookie.indexOf(";",c_start);
		if (c_end==-1) c_end=document.cookie.length;
		return unescape(document.cookie.substring(c_start,c_end));
		}
	  }
	return "";
}

function setCookie(c_name,value,expiredays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
 
var currSettingsIdx = {},importSettingsIdx = {}, settingsObj = {}, settingsSourceArray = [];

function initSettings () {
	setCurrSettingsIdx (); // defines currSettingsIdx to current settings version
	settingsSourceArray = getCookie('cookieArray1').split("|");  // get cookie fail returns "", which splits to [""]
	
	getImportSettingsIdxByVersion(settingsSourceArray[0]);  // just defines importSettingsIdx - if null, then uses currSettingsIdx
	// apply settings from settingsSourceArray using importSettingIdx according to currSettingsIdx, using defaults if necessary
	for (thisSetting in currSettingsIdx) {
		if (importSettingsIdx[thisSetting]) {  // do I actually need this?  Would the next line cause an error without it?
			settingsObj[thisSetting] = settingsSourceArray[importSettingsIdx[thisSetting]] || getDefaultSetting(thisSetting);	 // THIS DOESN"T SUPPORT falsy settings, and by extension, boolean settings.	
		} else {
			settingsObj[thisSetting] = getDefaultSetting(thisSetting);
		}
		if (thisSetting != 'userCustomSize') { applySetting(thisSetting); }
	}
	if (window.attachEvent) {
		window.attachEvent('onbeforeunload',writeSettingsToCookie);
	} else {
		alert('Error... not saving cookies, consult developers');
	}
}
	
	

function writeSettingsToCookie() {
	var tempArray = [];
	for (thisSetting in currSettingsIdx) {
		tempArray[currSettingsIdx[thisSetting]] = settingsObj[thisSetting];
	}
	setCookie('cookieArray1',tempArray.join("|"),366);
}
	
function applySetting (currSetting) {  // resize, html checking/disabled, and finding the externalApp
		switch (currSetting) {
			case 'userCustomSize':
				return; // because we should never be applying userCustomSize like this... it should only be applied in init
				break;
			
			case 'userZoomControl':  // should be irrel as this is referenced directly
				if (settingsObj[currSetting] != "ZOOM_PAN") {
					document.getElementById(currSetting + "_DOM").checked = true;
				} else {
					document.getElementById(currSetting + "_DOM").checked = false;
				}
				break; 
			
			case 'maptFcn': // needs to check/uncheck box, otherwise, referenced directly
				 if (settingsObj[currSetting] == "ON") { // on = unchecked
					document.getElementById("hideMaptButton_DOM").checked = false;
					document.getElementById("zoomMaptButton_DOM").style.display="inline";
					document.getElementById("zoomMaptOnClick_DOM").disabled=false;
					document.getElementById("zoomMaptOnSearch_DOM").disabled=false;
					document.getElementById("useGoogleZoomForMapt_DOM").disabled=false;					
				 } else { //checked, or off
					document.getElementById("hideMaptButton_DOM").checked = true;
					document.getElementById("zoomMaptOnSearch_DOM").disabled=true;
					document.getElementById("zoomMaptOnClick_DOM").disabled=true;
					document.getElementById("useGoogleZoomForMapt_DOM").disabled=true;
					document.getElementById("zoomMaptButton_DOM").style.display="none";					
				 }
				break;

			case 'zoomMaptOnClick': // needs to make sure box is unchecked, otherwise, referenced directly
			case 'zoomMaptOnSearch': // needs to make sure box is unchecked, otherwise, referenced directly
			case 'useGoogleZoomForMapt': // needs to make sure box is unchecked, otherwise, referenced directly
			case 'runAppOnClick':  // needs to make sure box is unchecked, otherwise, referenced directly	
			case 'runAppOnSearch':  // needs to make sure box is unchecked, otherwise, referenced directly			
				if (settingsObj[currSetting] == "ON") {
					document.getElementById(currSetting+"_DOM").checked = true;					
				 } else {
					document.getElementById(currSetting+"_DOM").checked = false;									 
				 }
				break;


			case 'userAppName':
				initializeExternalAppButton();
				break;			
			
			default:
				return "";
		
		}
}
			
function getDefaultSetting (thisSetting) {
	switch (thisSetting) {
		case 'userCustomSize':
			return "600_500";
			break;
		case 'userZoomControl':
			return "ZOOM_PAN";
			break;
		case 'maptFcn':
			return "ON";
			break;
		case 'zoomMaptOnClick':
			return "OFF";
			break;
		case 'zoomMaptOnSearch':
			return "OFF";
			break;
		case 'useGoogleZoomForMapt':
			return "OFF";
			break;
		case 'userAppName':
			return "NO APP CHOSEN";
			break;			
		case 'runAppOnClick':
			return "OFF";
			break;
		case 'runAppOnSearch':
			return "OFF";
			break;		
		default:
			return "";
	}
}

function setCurrSettingsIdx () {
	currSettingsIdx['version'] = 0;
	currSettingsIdx['userCustomSize'] = 1;
	currSettingsIdx['userZoomControl'] = 2;
	currSettingsIdx['maptFcn'] = 3;
	currSettingsIdx['zoomMaptOnClick'] = 4;
	currSettingsIdx['zoomMaptOnSearch'] = 5;
	currSettingsIdx['useGoogleZoomForMapt'] = 6;
	currSettingsIdx['userAppName'] = 7;
	currSettingsIdx['runAppOnClick'] = 8;
	currSettingsIdx['runAppOnSearch'] = 9;
}

function getImportSettingsIdxByVersion (loadedVersion) {
	importSettingsIdx = {};
	switch (loadedVersion) {
		case "": // case null will need to be moved when we add a new version... case null should always be the latest version.
			importSettingsIdx = currSettingsIdx;
			break;
		
		case "1":
			importSettingsIdx['version']  = 0;
			importSettingsIdx['userCustomSize'] = 1;
			importSettingsIdx['userZoomControl'] = 2;
			importSettingsIdx['maptFcn'] = 3;
			importSettingsIdx['zoomMaptOnClick'] = 4;
			importSettingsIdx['zoomMaptOnSearch'] = 5;
			importSettingsIdx['useGoogleZoomForMapt'] = 6;
			importSettingsIdx['userAppName'] = 7;
			importSettingsIdx['runAppOnClick'] = 8;
			importSettingsIdx['runAppOnSearch'] = 9;
			break;
		case "2":
			//for other versions, we basically need to translate other versions into the current version.
			break;
		default:

	}
}
/* initializeExternalAppButton()
Searches the directory of GMaptBrowser for a file of the format llApp-*.exe.
If found, prompt user if they wish to Link to that application.  If they
choose to link, display a single button with an onClick function that will
run the application with the command line arguments of latitude and longitude,
separated by spaces.

ie: llApp-EFS.exe 42.23 -71.32

Programs can be easily written in AutoHotkey, AutoIt, any other scripting
language of choice, or in more serious programming languages.
*/
function initializeExternalAppButton() {
  var lastApp = settingsObj["userAppName"];
  if (lastApp != "IGNORE") {
	  var llApplicationType = ".exe";
	  var llApplicationPrefix = "llApp-";
	  var fso, f, fc, s, folderspec;
	  var thisItem, answer,buttonObj;
	  fso = new ActiveXObject("Scripting.FileSystemObject");
	  folderspec=fso.GetAbsolutePathName("");
	  f = fso.GetFolder(folderspec);
	  fc = new Enumerator(f.files);
	  
	  s = "";
	  buttonObj = document.getElementById("externalAppButton");
	  for (; !fc.atEnd(); fc.moveNext())
	  {
	  thisItem = fc.item().Name;
		if ((thisItem.substr(thisItem.length-4, 4) == llApplicationType) && (thisItem.substr(0,6) == llApplicationPrefix)) {
			if (lastApp != "NO APP CHOSEN") {
				if (lastApp == thisItem) answer = true;
				else answer = false;
				}
			else answer = confirm("Link to "+thisItem+"?");
			if (answer) {
				settingsObj["userAppName"] = thisItem;
				s = fc.item().Path;
				// show and wire button
				buttonObj.value = thisItem.substring(6,thisItem.length-4);
				buttonObj.style.position = "static";
				buttonObj.style.left = "0px";
				var shell = new ActiveXObject("WScript.shell");
				document.getElementById('currentUserApp').innerHTML=thisItem;
				buttonObj.onclick = function () {
					if (marker)
						shell.run(fc.item().Path + " " + marker.get_position().lat() + " " + marker.get_position().lng(), 1, false);
					}
				return;
			} // end if confirmed 
			else { //IF no lastApp, but app found, and not confirmed, hide button
				buttonObj.style.position = "absolute";
				buttonObj.style.left = "-10000px";	
				document.getElementById('currentUserApp').innerHTML = '<i>inactive</i>';
				settingsObj["userAppName"] = "IGNORE";
			}
		} //
	  }
		if (lastApp != "IGNORE" && lastApp != "NO APP CHOSEN") { // if there was a lastApp, and we actually reach this point (ie:lastApp doesn't match), clear lastApp, and run again.
			settingsObj["userAppName"] = "NO APP CHOSEN";
			initializeExternalAppButton();
			}
	  } 
	}	