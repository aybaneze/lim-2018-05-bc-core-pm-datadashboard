let users = {};
let progress = {};
let courses = {};
let cohort = {};


window.onload = function () {

  showCohorts();
  setTimeout(function () {

    selectSede();

  }, 2000);
}
const showCohorts = (users, courses) => {
  
}

fetch('https://api.laboratoria.la/cohorts')
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log('ocurrio error')
    }
  }).then((jsonDataCohorts) => {
    courses = jsonDataCohorts;
    showCohorts(users, courses);

  })

fetch('https://leydy.github.io/lim-2018-05-bc-core-pm-datadashboard/data/cohorts/lim-2018-03-pre-core-pw/users.json')
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log('ocurrio error')
    }
  }).then((jsonDataUsers) => {
    users = jsonDataUsers;
    return fetch('https://leydy.github.io/lim-2018-05-bc-core-pm-datadashboard/data/cohorts/lim-2018-03-pre-core-pw/progress.json')
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log('ocurrio error')
    }
  }).then((jsonDataProgress) => {
    progress = jsonDataProgress;
    computeUsersStats(users, progress,courses);
  })

var grupoAnio = document.getElementById("conjuntoAnio"); /*Obtener el SELECT */
var anioSeleccionado = grupoAnio.options[grupoAnio.selectedIndex].value;

var grupoCohort = document.getElementById("selectSede"); /*Obtener el SELECT */
var cohortsSeleccionado = grupoCohort.options[grupoCohort.selectedIndex].value;

var grupoCohortCombo = document.getElementById("conjuntoBootcamp"); /*Obtener el SELECT */
var cohortsSeleccionadoCombo = grupoCohortCombo.options[grupoCohortCombo.selectedIndex].value;

//obtiene lo seleccion en el select conjuntoAnio
function ShowSelected1() {
  //Para obtener el valor
  anioSeleccionado = document.getElementById("conjuntoAnio").value;
}

//obtiene lo seleccion en el select selectSede
function selectSede() {
  // Para obtener el valor
  cohortsSeleccionado = document.getElementById("selectSede").value;
  //obtiene lo seleccion en el select conjuntoBootcamp
  select = document.getElementById('conjuntoBootcamp');
  select.innerHTML = "";
  if (courses != undefined) {
    for (let i = 0; i < courses.length; i++) {

      let anio = courses[i].start.substring(0, 4);
      var primerSegmentoCohort = courses[i].id.split("-");
      let cohort = primerSegmentoCohort[0];

      if (cohort === cohortsSeleccionado && anio === anioSeleccionado) {
        var opt = document.createElement('option');
        opt.value = courses[i].id;
        opt.innerHTML = courses[i].id;
        select.appendChild(opt);
      }
    }
  }
}
//obtiene lo seleccion en el select conjuntoBootcamp
function selectBootcamp() {
  // Para obtener el valor
  cohortsSeleccionadoCombo = document.getElementById("conjuntoBootcamp").value;
}