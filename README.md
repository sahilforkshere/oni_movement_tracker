->>> How to run the project
follow these steps to set up and run the app:

0. **clone the repo**:
   git clone https://github.com/sahilforkshere/oni_movement_tracker.git
   cd oni_movement_tracker

1. **install dependencies**:
   run `npm install` in your terminal to install all required packages.
2. **start the server**:
   run `npx expo start` to launch the expo development server.
3. **open on mobile**:
   scan the qr code using the **expo go** app on your android or ios device.

  ->>> Libraries used
these libraries were chosen to ensure the app is maintainable and functional:

* **@react-navigation/native & stack**: used for moving between the home and counter screens.
* **@react-native-async-storage/async-storage**: used to save and load kick sessions from local storage.

--->> **screen recording**

https://drive.google.com/file/d/1tH-rrL4UPrxo3T9BMNoh6vhJIiR2ZRr3/view?usp=sharing


->> **example object:**
```json
{
  "id": "1735660800000",
  "timestamp": "2025-12-31T12:00:00Z",
  "displayDate": "wednesday, 31 dec 2025",
  "duration": 12
}

