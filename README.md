# Virus Launcher

<img src="https://raw.githubusercontent.com/Eliastik/fake-virus-launcher/master/screenshot.png" width="640" alt="Screenshot" />

## English

Fake Virus Launcher is a launcher for fake viruses - see [https://www.eliastiksofts.com/faux-virus/](https://www.eliastiksofts.com/faux-virus/)

### About

* Version: 2.0.1 (27/02/2023)
* By Eliastik - [eliastiksofts.com](http://eliastiksofts.com) - Contact : [eliastiksofts.com/contact](http://eliastiksofts.com/contact)
* License: GNU GPLv3 (see the LICENCE.txt file)

#### Technologies

* Angular
* ElectronJS
* TypeScript

### How to build?

To build the app, you need to have installed Node.js and npm.

To start, run this command:

`npm install`

Then run one of these command to compile the application (Angular) then package it into an executable (Electron).

The executable will then be packaged in the electron/output folder.

#### For Windows (64 bits)

Please keep in mind that if you want to build the Windows executable on a Linux environment, you will need to install Wine.

`npm run package`

#### For Windows (32 bits)

Please keep in mind that if you want to build the Windows executable (32-bits) on a Linux environment, you will need to install the 32-bit version of Wine.

`npm run package:32`

#### For Linux (32 bits)

`npm run package-linux`

## Français

Fake Virus Launcher est un lanceur de faux virus - voir https://www.eliastiksofts.com/faux-virus/

### À propos
* Version : 2.0.1 (27/02/2023)
* Par Eliastik - eliastiksofts.com - Contact : eliastiksofts.com/contact
* Licence : GNU GPLv3 (voir le fichier LICENCE.txt)

### Technologies

* Angular
* ElectronJS
* TypeScript

### Comment compiler ?

Pour compiler l'application, vous devez avoir installé Node.js et npm.

Pour commencer, exécutez cette commande :

`npm install`

Ensuite, exécutez l'une de ces commandes pour compiler l'application (Angular) puis la compiler dans un exécutable (Electron).

L'exécutable sera alors empaqueté dans le dossier electron/output.

#### Pour Windows (64 bits)

Veuillez noter que si vous souhaitez compiler l'exécutable Windows sur un environnement Linux, vous devrez installer Wine.

`npm run package`

#### Pour Windows (32 bits)

Veuillez noter que si vous souhaitez compiler l'exécutable Windows (32 bits) sur un environnement Linux, vous devrez installer la version 32 bits de Wine.

`npm run package:32`

#### Pour Linux (32 bits)

`npm run package-linux`