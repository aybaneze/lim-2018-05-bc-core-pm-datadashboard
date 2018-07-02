# Data Dashboard

## Preámbulo

En Laboratoria, las Training Managers (TMs) hacen un gran trabajo al analizar la
mayor cantidad de datos posibles respecto al progreso de las estudiantes para
apoyarlas en su aprendizaje.

La principal medida de progreso de una estudiante en Laboratoria es su avance
completando los proyectos de la [Ruta de Aprendizaje](https://docs.google.com/spreadsheets/d/1AoXQjZnZ5MTPwJPNEGDyvn5vksiOUoPr932TjAldTE4/edit#gid=536983970)
y su desempeño en función a la [Rúbrica de Niveles Esperados](https://docs.google.com/spreadsheets/d/e/2PACX-1vSkQy1waRpQ-16sn7VogiDTy-Fz5e7OSZSYUCiHC_bkLAKYewr4L8pWJ_BG210PeULe-TjLScNQQT_x/pubhtml).
Sin embargo, para completar estos proyectos las estudiantes acceden a contenidos
de aprendizaje (lecturas, videos, ejercicios y quizzes) en un sistema que
llamamos LMS (Learning Management System). El LMS acumula data sobre quién
leyó qué, qué ejercicios se han completado, los resultados de los quizzes, etc.

A pesar de que la data de progreso del LMS (ej. lecturas leídas, ejercicios
  completados, nota en quizzes, etc.) no impacta directamente en la evaluación
  de una estudiante, sí es una pieza de información relevante que las TMs
  quisieran visualizar para tener un mejor entendimiento de cómo va cada
  estudiante en su proceso de aprendizaje.

Así, el reto de este proyecto es crear una interfaz donde las TMs puedan
_ver_ y _usar_ la data de progreso del LMS. Para ello, proponemos crear un
**data dashboard** (_tablero de visualización de datos_).

## DEFINICIÓN DEL PRODUCTO

Para poder entender las dificultades y/o limitaciones se tuvo un contacto directo con la usuaria final del producto a realizar, esto se llevo a cabo con una de las TMs. en base a una breve entrevista que constaba de las siguientes interrogantes:

* ¿Qué herramienta utilizas actualmente?
* ¿Tienes alguna limitación tecnológica?
* ¿Què datos son màs releantes mostrar y porquè?.
* ¿Estàs esperando algùn entregable en especial?
* Es mejor tener una lista de estudiantes o un buscador de estudiantes?, ¿ambos?
* De la herramienta que utlizas actualmente. ¿Qué es lo màs indispensable?

Seguidamente a la breve entrevista realizada se llegò a las siguientes conclusiones:
> Las principales usuarias son Las training managers, por la cual su objetivo es  Optimizar los tiempos en relación a la búsqueda de avances por estudiantes, además para ellas lo más fundamental son los resultados sobre los quizzes, ejercicios y lecturas, ya que según nos iban explicando en la entrevista que para ellas es muy importante saber el progreso que existe entre las alumnas que usan el LMS.
cabe destacar que ellas revisan la informacion cada vez que finaliza un sprint para ver el avance de autoaprendizaje por cada estudiante.
El hecho de tener mucha información en un archivo XLS resulta complicado además que se pierde tiempo en realizar búsquedas, y si se tiene un sitio web donde manipular esos datos el flujo se vuelve un tanto más sencillo y amigable.

El proceso de diseño se fue realizando a medida que se iban determinando los requerimientos del usario.
> Se realizaron sketch's de baja fidelidad en varias oportunidades con el fin de llegar a plasmar la idea y posteriormente llevarlo a un prototipo de alta fidelidad.

## SKETCH DatadashBoard (prototipo de baja fidelidad)

Utilizando unas hojas de papel se procedió a la elaboración del sketch inicial que contenía básicamente las pantallas ha realizar y las funcionalidades a implementar.

**pantalla N° 1 : Inicio deSesión del usuario**
![Preview](https://github.com/Leydy/lim-2018-05-bc-core-pm-datadashboard/blob/master/src/images/sketch/1.jpeg)

**pantalla N° 2 : Pantalla principal de los cohort**
![Preview](https://github.com/Leydy/lim-2018-05-bc-core-pm-datadashboard/blob/gh-pages/src/images/sketch/2.jpeg)

**pantalla N° 3 : Tablas de Cohorts**
![Preview](https://github.com/Leydy/lim-2018-05-bc-core-pm-datadashboard/blob/gh-pages/src/images/sketch/3.jpeg)

**pantalla N° 4 : Tablas de Estudiantes y progreso de cada estudiante**
![Preview](https://github.com/Leydy/lim-2018-05-bc-core-pm-datadashboard/blob/gh-pages/src/images/sketch/4.jpeg)

**pantalla N° 5 : ajustes para el usuario**
![Preview](https://github.com/Leydy/lim-2018-05-bc-core-pm-datadashboard/blob/gh-pages/src/images/sketch/5.jpeg)

## DISEÑO DE LA INTERFAZ DE USUARIO (prototipo de alta fidelidad)

Se realizó el prototipo de alta fidelidad utilizando la herramienta FIGMA, abordando ya estilos y las funcionalidades principales del producto,
A continuación las imagénes de captura del figma

![Preview](https://github.com/aybaneze/lim-2018-05-bc-core-pm-datadashboard/blob/master/src/images/prototipofigma/pantalla1.jpg)
![Preview](https://github.com/aybaneze/lim-2018-05-bc-core-pm-datadashboard/blob/master/src/images/prototipofigma/pantalla2.jpg)
![Preview](https://github.com/aybaneze/lim-2018-05-bc-core-pm-datadashboard/blob/master/src/images/prototipofigma/pantalla3.jpg)
![Preview](https://github.com/aybaneze/lim-2018-05-bc-core-pm-datadashboard/blob/master/src/images/prototipofigma/pantalla4.jpg)
![Preview](https://github.com/aybaneze/lim-2018-05-bc-core-pm-datadashboard/blob/master/src/images/prototipofigma/pantalla5.jpg)
![Preview](https://github.com/aybaneze/lim-2018-05-bc-core-pm-datadashboard/blob/master/src/images/prototipofigma/pantalla6.jpg)
![Preview](https://github.com/aybaneze/lim-2018-05-bc-core-pm-datadashboard/blob/master/src/images/prototipofigma/pantalla7.jpg)
![Preview](https://github.com/aybaneze/lim-2018-05-bc-core-pm-datadashboard/blob/master/src/images/prototipofigma/pantalla8.jpg)

## JavaScript
>Respecto a la lógica se usó 4 funciones:
* computeUsersStats(users, progress, courses)
* sortUsers(users, orderBy, orderDirection)
* filterUsers(users, search)
* processCohortData(options) 
> para poder obtener la data de los archivos JSON realizamos un llamado con FETCH, esto se hizo por cada archivo.
**users.json**
**cohorts.json**
**progress.json**

# Link del proyecto
dar click --> https://leydy.github.io/lim-2018-05-bc-core-pm-datadashboard/src/
