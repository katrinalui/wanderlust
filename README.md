# Wanderlust
![logo](https://raw.githubusercontent.com/katrinalui/wanderlust/master/docs/readme_images/Wanderlust_long_multi.png)

[Link to Wanderlust Demo](https://www.google.com)

## Summary
[Wanderlust](https://www.google.com) is a collaborative mobile app that allows users to plan an itinerary in realtime by utilizing a chatroom and a Google map.

Wanderlust allows user to:
- Login/Logout (using Facebook)
- View all user trips
  - with an option to share, edit or delete a trip
- Join a trip with a unique code
- Create a trip
- Send instant messages in chatroom for each trip they are a part of
- Add markers locations to trip's map
  - specifying marker's title and day

## Overall Structure

### Backend
Wanderlust was built using Firebase in the backend as an application development platform. Firebase was used to have a seamless connection and integration between data, users and authentication. Firebase Realtime Database stored data into as JSON object creating a JSON tree. It incorporates NO-SQL database.

### Frontend
The frontend is built with React-Native to compose rich mobile UI components. React Native was used to build cross-platform mobile app using JavaScript and React/Redux.

### Libraries
- [firebase](https://www.npmjs.com/package/firebase)
- [react-native](https://www.npmjs.com/package/react-native)
- [react-native-datepicker](https://www.npmjs.com/package/react-native-datepicker)
- [react-native-fbsdk](https://www.npmjs.com/package/react-native-fbsdk)
- [react-native-google-places-autocomplete](https://www.npmjs.com/package/react-native-google-places-autocomplete)
- [react-native-maps](https://www.npmjs.com/package/react-native-maps)
- [react-native-material-ui](https://www.npmjs.com/package/react-native-material-ui)
- [react-native-swipeout](https://www.npmjs.com/package/react-native-swipeout)
- [react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons)
- [react-navigation](https://www.npmjs.com/package/react-navigation)


## Primary Components

### OAuth with Facebook
Wanderlust uses Facebook OAuth to allow users to sign in using their Facebook credentials.
Data returned includes user's name, email and profile picture.

### Dashboard
The dashboard allows users to view all participated trips.

Using the swipe feature on a trip, user has an option to:
- Share a trip to a friend with a unique code
- Edit a trip (renders edit trip form)
- Delete a trip from dashboard

Users can create a new trip by pressing the add button (render new trip form)
- Allows users to create title and dates of trips

User can join a trip by clicking on Join Trip and submitting a unique code.

![dashboard](https://raw.githubusercontent.com/katrinalui/wanderlust/master/docs/readme_images/dashboard.png)
![create_trip](https://raw.githubusercontent.com/katrinalui/wanderlust/master/docs/readme_images/create_trip.png)
![edit_trip](https://raw.githubusercontent.com/katrinalui/wanderlust/master/docs/readme_images/edit_trip.png)
![join_trip](https://raw.githubusercontent.com/katrinalui/wanderlust/master/docs/readme_images/join_trip.png)

### Chat
Each trip has a dedicated chatroom that allows participate to discuss traveling plans.

Top navigation bar allows users to go back to their dashboard or the current trip's map

![chat](https://raw.githubusercontent.com/katrinalui/wanderlust/master/docs/readme_images/chat_demo2.gif)

### Map
User can search point of interest and create a marker

Each marker allows users to add a note and select the day of the visit or delete a marker. 

![japan_search](https://raw.githubusercontent.com/katrinalui/wanderlust/master/docs/readme_images/japan_search.png)
![creating_marker](https://raw.githubusercontent.com/katrinalui/wanderlust/master/docs/readme_images/creating_marker.png)
![marker_option](https://raw.githubusercontent.com/katrinalui/wanderlust/master/docs/readme_images/marker_options.png)
