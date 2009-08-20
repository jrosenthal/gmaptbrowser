
#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.


thisFile = %A_Desktop%\GMapt_Export.tsv
Gui +AlwaysOnTop
Gui,Add,Text,,Notes?
Gui,Add,Edit,vNotes
Gui,Add,Button,Default x10 y50,OK
Gui,Add,Button,x85 y50,Cancel
Gui,Show

Pause

ButtonOK:
Gui, Submit
FileGetSize, FileSize, %thisFile%
if ErrorLevel 
	FileAppend, "Lat"`t"Lon"`t"Timestamp"`t"Notes"`n, %thisFile%
FileAppend, %1%`t%2%`t%A_Now%`t%Notes%`n, %thisFile%
Gui,Destroy
ExitApp
return

ButtonCancel:
Gui,Destroy
ExitApp
return

