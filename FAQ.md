# FAQ #

  1. How do I install the program?
> > You don't.  Just download the zip, extract it all, and run GMaptBrowser.hta.  You'll need to maintain the directory structure.
  1. Ewww!   HTAs?  Why HTAs?  What is an HTA anyway?
> > Actually, they're a convenient way of working with the Google Maps Javascript APIs in a desktop context, with filesystem access.  HTAs are HTML Applications.  Basically, a browser model without any of the security, so they're just as dangerous as any other program you'd run on your computer.  Note that HTAs use Internet Explorer, so it must be installed on the system.
  1. I don't care about Maptitude.  How do I get GMaptBrowser to work with `WidgetFooSoft`?
> > A few possibilities.
      * First, if the program has a COM interface, and you ask nicely, I might add it.
      * Second, you can write a bridging script.  GMaptBrowser scans its main directory for files of the name llApp-`*`.exe, and if they exist, asks the user if they'd like to link to them.  Such programs need to take command line arguments of latitude and longitude, in other words: `llApp-EFS.exe 42.32 -73.21`  Perhaps the easiest way to make such programs is with `AutoHotKey` or `AutoIt` which both allow easy scripting and compiling to executables.  The most primitive forms of bridging scripts will work through th interface of the other programs - ie: switch windows, open the "Zoom To" tool, enter the coordinates and be done.  Awkward, but only a couple lines of code in `AutoHotKey`, so you can build them as necessary.
      * Third, note that in the settings screen, you can turn off the Maptitude button, so you don't have to see it if you don't want to.
  1. Why version 3 of the Google Maps API?
> > This was just happenstance.  I started toying with the idea of needing something like this a day before v3 was announced.  I figured I might as well try writing it in version 3 as a learning exercise, and now here we are.
  1. What external libraries do you use?
> > In addition to the Google Maps API (v3), GMaptBrowser makes use of two open source google maps utilities for better zooming, and proj4js for converting between coordinate systems.
    * http://google-maps-utility-library-v3.googlecode.com/svn/tags/keydragzoom/1.0/docs/examples.html
    * http://google-maps-utility-library-v3.googlecode.com/svn/tags/scrollwheelzoom/1.0/docs/examples.html
    * http://proj4js.org/
  1. This is really a pathetic excuse for a program.  Why is it even up here?
> > Ouch.  I didn't think it was quite that bad.  For a rather specific use case (needing to browse geographically, looking at aerial data, in several programs at the same time), it's actually quite helpful.  However, one can only use the Google Maps API for a desktop application if one makes it freely available.  I didn't like the 'letter of the law' idea of putting something on a random website without advertising it, and hardwiring in code so that it was really only useful to my precise case, so I tried to broaden it out until it would be at least somewhat useful to others.  This is what I've come up with so far.
  1. Why doesn't GMaptBrowser do....?
> > Maybe it could.  Send suggestions!