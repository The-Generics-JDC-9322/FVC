# FVC - The Fitbit VERA Companion
This Fitbit Application is meant to be used with the [VERA Android Application](https://github.com/The-Generics-JDC-9322/VERA).


## Installation
An important prerequisite to the installation process is Node.js 8.x+ on macOS, Windows or Linux.
Once you have Node.js, to install the Fitbit SDK, Fitbit CLI and the rest of the dependencies,
clone the repository and run ```npm install```.

If this is your first time developing Fitbit Applications, please head over to the 
[Getting Started](https://dev.fitbit.com/getting-started/) Guide so you have all the necessary
prerequisites to get the FVC running on your Fitbit or Fitbit Simulator.

Currently the FVC is only targeted to build for the Fitbit Versa Lite which doesn't support
a connection to the Fitbit Studio. This means we have to use the Fitbit OS Simulator to see development
changes we are making. Go ahead and download/install/launch the simulator if you haven't already.


You are now ready to build the Fitbit app and run the Fitbit commandline CLI using 
```
npx fitbit-build
npx fitbit
fitbit$ 
```
See this Fitbit Guide [Command Line Interface Guide](https://dev.fitbit.com/build/guides/command-line-interface/)
for more information about building and running a fitbit application from the command line.


    
