# Aplicativo Saúde
## (Atualizado) - 22/05/2023
### Este projeto é aplicativo genérico para planos de saúde, permite enviar informações de um cartão virtual por NFC e recebe notificações personalizadas!

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>
</p>

Foi criado um website para o [Saúde Web](https://saude-web.vercel.app/), onde podemos enviar mensagens para o celular!
O projeto explicado está acessível em: https://github.com/Bigodrigo/SaudeWeb


## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- HTML e CSS
- JavaScript e JSON
- React, React Native, Native Base
- [Expo](https://docs.expo.dev/)
- [HCE NFC](https://github.com/cactuser/react-native-nfc-hce#README.md)
- [Notifee](https://notifee.app/)
- [Firebase](https://firebase.google.com/docs?hl=pt-br)
- [Node e NPM](https://nodejs.org/)

## 💻 Projeto

A ideia do app é simples, substituir um cartão físico, acessar as informações do usuário e enviar mensagens personalizadas através das notificações (push)!

O Cartão vai permitir NFC(Aproximação), as informações são obtidas por API e mostradas na tela.

O Desenvolvimento foi feito em React que usa linguagem de JavaScript. É necessário buscar entender o Expo GO, React, Native Base, Firebase, APIs e o funcionamento do NFC!

O projeto foi finalizado até o nível de protótipo. Se vc quiser testar o aplicativo, basta baixar o [APK](/Apk%20Donwload/application-44d64c95-78a4-44c1-aa84-0980dac01c93.apk).

Se vc deseja clonar este projeto é importante saber que alguns arquivos precisam ser alterados e outros foram removidos para garantir a segurança das informações!

- [ ] android/app/google-services.json
- [ ] firebase.js
- [ ] src/screens/Login.js
- [ ] src/screens/Registro.js

## 🔖 Layout

<div align="center">
<img src="/src/assets/Saude-App.gif" width="270" height="555">
</div>

## Melhorias?
- [ ] Responder as mensagens sem abrir o aplicativo;
- [ ] Adicionar o Storage do FB para enviar imagens e documentos;
- [ ] Informar ao usuário que todos os campos precisam ser preenchidos na primeira alteração dos dados;
- [ ] Fatorar o código, substituindo alguns arquivos ou screens por componentes:
    - fileUpload;
    - JanelaPerfil;
    - OpenCamera;
    - GetFetureView;
    - Virtualized;
    - ic_launcher_round.
