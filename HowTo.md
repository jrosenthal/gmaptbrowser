# Using GMaptBrowser #

## Installing ##

GMaptBrowser does not need to be installed on your computer.  Rather, you just need the file, its associated libraries, and a few small image files.  Unzip the distribution archive (downloaded from the Project main page), whereever you want the files to reside.  Maintain the directory structure.  To run, just run GMaptBrowser.hta.  When running GMaptBrowser, if there is a valid external app in the same directory, you may be prompted to link to it.  See External Linking Scripts below.

## Browsing ##
### Searching ###
Most use of GMaptBrowser begins with a search.  You can search for a complete or partial address, a coordinate (decimal degrees, in the format `lat, lon` ie: `42.358920, -71.057810`; UTM in the format `zone.easting.northing` ie: `19.330535.4691679`), and even for a landmark.  If there is not already a marker on the map, GMaptBrowser will mark the results of your search with a marker.  If there already is a marker, it will be moved to the new location.

### The Marker ###
The marker is your way of querying a specific location.  You can move the marker by dragging it, clicking on the map, or doing a search.  When the marker moves, the coordinates will always be updated to match.  In North America, the coordinates will show both UTM (NAD83) and Latitude/Longitude (WGS84), outside of North America, only Latitude/Longitude are available.

In addition, when possible, reverse geocoding will always follow the marker.  Reverse geocoding appears directly beneath the map.  If the marker has just been placed by a search, the address will be whatever geocoded to that point, otherwise the marker's location will be reverse geocoded to a result.  The reported accuracy of the geocode will be shown underneath the type of geocode.  Please note that the accuracy may be incorrect.

Moving the marker will also update the Birdseye link, and refresh the birdseye window, if already open.

### Buttons and Links ###
#### Birdseye ####
The birdseye link will appear next to the buttons after a marker has been placed. Clicking on the Birdseye link will open a new window with a Bing Maps Birdseye view set to that location.  Moving the marker on the map will refresh an open Birdseye view.  To turn off the Birdseye view just close the window, and open it again to reopen the view.

#### Maptitude ####
If Maptitude is open, with a valid map as the current view, clicking the Maptitude button will zoom and pan maptitude to the location of the current marker.  In the settings screen you can also set GMaptBrowser to zoom/pan maptitude whenever a search is performed, or whenever the marker is moved.

#### External Scripts ####
When you run GMaptBrowser, it will search it's directory for a program of the name `llApp-*.exe`.  If it finds such a program, it will ask the user if they wish to link to that program, and will remember that program linkage for the future (you can reset the program in the settings screen).  If linked, there will be a button with for the external script, labeled with the wildcard from the name above.  Pressing the button will run the script with the coordinates (in decimal degrees) as command line paramters.  One example of a script might switch to a specific program, open that program's 'Zoom To' dialog, enter the coordinates, and then Zoom to them.

## Settings ##
You can access the settings by clicking on the small gear icon in the bottom right of the window.  You can return from settings to the map by clicking the small map icon in the bottom right of the settings window.  All settings should be remembered when you close GMaptBrowser.  If you want to clear all settings, you can use Cntrl-Alt-R, or click the button in the settings screen.

### Zoom Control ###
#### Small Zoom Control ####
Selecting this option will switch to use the small zoom control (just +/-) instead of the large pan control with zoom slider.  This is appropriate if you want to use GMaptBrowser in a very small size, as a basic toolbox.

### Applications - Maptitude ###
#### Disable Maptitude Connections ####
This will cause GMaptBrowser not to ignore all other Maptitude settings, and will hide the Zoom Maptitude button.

#### Zoom on Search ####
Assuming Maptitude Connections are not disabled, selecting this will zoom maptitude whenever the user searches for an address.

#### Zoom on Click ####
Assuming Maptitude Connections are not disabled, selecting this will zoom maptitude whenever the user clicks on the map (which will also move the marker to that location).

#### Use Google Zoom level when Zooming Maptitude ####
If this is selected, whenever Maptitude is zoomed by GMaptBrowser, the scale in maptitude will be set to match the scale in GMaptBrowser.  If not selected, the same scale will be used each time.

## External Linking Scripts ##