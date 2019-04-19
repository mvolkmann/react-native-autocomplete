# react-native-autocomplete

## Steps to run

- install "Expo Client" app on mobile device
- `npm install`
- `npm start`
- a browser tab will open that says "Metro Bundler" in upper-left
- in left nav, change "CONNECTION" to "Tunnel"
- launch mobile device camera and point at the QR code in the browser tab
- tap "Open in Expo" that appears at the top of the camera app
- type into the `TextInput`
- select a matching suggestion in the list that appears below the `TextInput`

## Issue

If other components are at the same y position as suggestions,
those suggestions cannot be selected.
To demonstrate this, uncomment the three `Text` components
near the bottom of the `render` method in `App.js`.

Wrapping the `Text` components in `<View pointerEvents="none">`
fixes this, but why should that be required?
