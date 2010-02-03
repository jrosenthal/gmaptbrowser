IfWinExist, ElectronicFieldStudy
; 2.7 v 10, 11
{

	IfWinExist, Go to...
	{
		WinClose, Go to...
	}
   	WinActivate, ElectronicFieldStudy
    ;SendInput ^g 
    ;!ng
	SendInput !n
	SendInput g
    WinWait, Go to...,,3
    if (ErrorLevel=0) 
    {
     ControlFocus, Edit1, Go to...
     SendInput %1%{Tab}%2%{Tab}{Enter} 
    }
    else {
    	MsgBox, Timed out waiting for Go to...
    }
}
else
{
IfWinExist, Pictometry EFS
; 2.7 v 12
{

	IfWinExist, Go to...
	{
		WinClose, Go to...
	}

	    	WinActivate, Pictometry EFS
    SendInput ^g 
    ;SendInput !n
	;SendInput g
    WinWait, Go to...,,3
    if (ErrorLevel=0) 
    {
     ControlFocus, Edit1, Go to...
     SendInput %1%{Tab}%2%{Tab}
	 SendInput {Enter}{Enter}{Enter}
    }
    else {
    	MsgBox, Timed out waiting for Go to...
    }
}
else
{
MsgBox, Please open EFS first
}
}