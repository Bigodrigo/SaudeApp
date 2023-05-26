# Saúde App
## (Last Update) - 26/05/2023
### This project is an application designed for health plans. It specifically facilitates the transmission of information through the utilization of a virtual card via NFC and permits the reception of personalized notifications.

<p align="center">
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>
</p>

On the website [Saúde Web](https://saude-web.vercel.app/) we can send messages to the application.
The project explained is accessible at: https://github.com/Bigodrigo/SaudeWeb

## 🚀 Technologies

This project has been developed employing the following technologies:

- HTML and CSS
- JavaScript and JSON
- React, React Native, Native Base
- [Expo](https://docs.expo.dev/)
- [HCE NFC](https://github.com/cactuser/react-native-nfc-hce#README.md)
- [Notifee](https://notifee.app/)
- [Firebase](https://firebase.google.com/docs?hl=pt-br)
- [Node and NPM](https://nodejs.org/)

## 💻 Project

(*This project is associated with the website. We highly suggest reading them concurrently to gain a comprehensive understanding.*)

The concept of the app is simple: replace physical cards, access user data, and send personalized notifications (push messages)!

It utilizes NFC (Near Field Communication) for proximity functions, API to obtain data, and rendering of a user interface in React with JavaScript. To bring the visual element to fruition, the design was perfected via prototyping. To test the application, users may download an [APK](/Apk%20Donwload/application-44d64c95-78a4-44c1-aa84-0980dac01c93.apk).

Please be advised that should you wish to clone this project, some of the files must be changed, while others have been removed to ensure safety of the data.

- [ ] android/app/google-services.json
- [ ] firebase.js
- [ ] src/screens/Login.js
- [ ] src/screens/Registro.js

## 🔖 Layout

<div align="center">
<img src="/src/assets/Saude-App.gif" width="270" height="555">
</div>

## Suggested Enhancements:
- [ ] Introduce the ability to respond to messages without requiring the application to be open;
- [ ] Expand the functionality by incorporating FB Storage in order to enable the sending of images and documents;
- [ ] Ensure that the user is reminded to fill out all fields when changing data for the first time;
- [ ] Enhance the codebase through the replacement of certain files or screens with components in order to facilitate factorization:
    - fileUpload;
    - JanelaPerfil;
    - OpenCamera;
    - GetFetureView;
    - Virtualized;
    - ic_launcher_round.
