# Bridging Scripts #

GMaptBrowser allows users to use their own bridging scripts to feed coordinates from GMaptBrowser to another external program.  GMaptBrowser can thus easily be made a browser for more programs than just Maptitude (which comes hardwired in).  Here are some sample bridging scripts.  If you write more, please, let me know, as I'd love to hear/see/make available different uses that people find for GMaptBrowser.

# Requirements #

A bridging script has only a few specific requirements.
Bridging scripts must...
  1. Be .exe files.
  1. Accept command line parameters of decimal degrees latitude and longitude, separated by a single space.
  1. Be placed in the same directory as GMaptBrowser.hta
  1. Be named such as llApp-`*`.exe, where `*` is whatever you want the text to be on the button in GMaptBrowser

# Gallery #

> Unless specifically mentioned otherwise, Bridging scripts are user written, and do not represent any endorsement, support, or warranty by either me or parties responsible for programs the bridging scripts interact with.

The source currently contains two bridging scripts, along with AutoHotKey source.

llApp-EFS.exe is a bridging script for Pictometry's Electronic Field Study.  This is an unoffical, user built script that allows a basic connection to Pictometry's EFS by switching to EFS, opening the Go to ... dialog and entering the coordinates.

llApp-Export.exe is a simple export function that will prompt the user for notes, and store coordinates with timestamp and notes in a TSV on the desktop.