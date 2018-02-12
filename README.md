# Patient Event Scheduling App

Note: This project was bootstrapped with [Create React Native App].
To find out more, please visit [here](https://github.com/react-community/create-react-native-app).

## Overview

This is a patient events scheduling app made with react-native for ios and android devices.  This app is designed to allow for patient based events to be created for specific date periods. Upon creating or updating an event, the app queries the user for the event duration and appropriately displays events for the dates they were assigned to.

To see a simple video demonstration of the app visit [here](https://gfycat.com/PerfumedFarGallowaycow?speed=2)

## Installation and Usage

To use this application, you will need to have Expo installed on your phone.

run `npm install` to install the dependencies.

run `npm start` to run the application.

scan the provided QR Code with Expo app. Note that the app may not function if the computer and mobile device are not on the same local network.

## Technical Notes

This app was built alongside an external node.js backend application api that can be seen [here](https://github.com/VernL/p-calendar-api/)

This app was created with offline state persistence in mind using redux-persist. The normal configuration allows for state to be persisted through sessions. This can be modified, however, by uncommenting persistor.purge(); inside app/data/configureStore.js.

Despite the persistence feature of this app, since the backend server does not currently support longer term database caching, backend storage is limited to 24 hours currently.
