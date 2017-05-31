NetTemp

Pré-requis :
* raspberry pi
* nodejs
* DS18B20
* 4,7 kΩ
* nodejs >= 8.x.x

Informations :
* Branchement: GPIO 1, 4, 5
* Module raspbian: w1-gpio et w1-therm
* Chemin de(s) capteur(s): /sys/bus/w1/devices/...
* http://www.framboise314.fr/mesure-de-temperature-1-wire-ds18b20-avec-le-raspberry-pi/

Description :
* Mesure de température via un capteur
* Affichage de la température courante
* Historique des mesures
* Graphique
* Tableau


2017 Trint@


@TODO :
-> read file system to get measure
-> save in sqlitedb
-> remote access in cloud
-> responsive design

-> Show temp in browser, table and graph

temp.txt it's necessary on root project.
Example content of temp.txt :
date,temp
08-02-2015 14:58:12, 19937
08-02-2015 15:00:02, 20000
08-02-2015 15:05:02, 19875
08-02-2015 15:10:02, 19687
08-02-2015 15:15:02, 19625
08-02-2015 15:20:02, 19625
.....


