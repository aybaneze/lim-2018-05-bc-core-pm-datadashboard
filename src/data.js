let users = {};
let progress = {};
let courses = {};

fetch('https://api.laboratoria.la/cohorts')
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log('ocurrio error')
    }
  }).then((jsonDataCohort) => {
    courses = jsonDataCohort;
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
    cargoData(users, progress)
  })

const cargoData = (users, progress) => {
  console.log(users, progress);
}


var grupoAnio = document.getElementById("conjuntoAnio"); /*Obtener el SELECT */
var anioSeleccionado = grupoAnio.options[grupoAnio.selectedIndex].value;

var grupoCohort = document.getElementById("conjuntoSede"); /*Obtener el SELECT */
var cohortsSeleccionado = grupoCohort.options[grupoCohort.selectedIndex].value;

var grupoCohortCombo = document.getElementById("conjuntoBootcamp"); /*Obtener el SELECT */
var cohortsSeleccionadoCombo = grupoCohortCombo.options[grupoCohortCombo.selectedIndex].value;

//obtiene lo seleccion en el select conjuntoAnio
function ShowSelected1() {
  /* Para obtener el valor */

  anioSeleccionado = document.getElementById("conjuntoAnio").value;

}
//obtiene lo seleccion en el select selectSede
function selectSede() {
  /* Para obtener el valor */
  debugger;
  cohortsSeleccionado = document.getElementById("selectSede").value;
  //obtiene lo seleccion en el select conjuntoBootcamp
  debugger;
  select = document.getElementById('conjuntoBootcamp');
  select.innerHTML = "";
  if (courses != undefined) {
    for (let i = 0; i < courses.length; i++) {

      let anio = courses[i].start.substring(0, 4);
      var primerSegmentoCohort = courses[i].id.split("-");
      let cohort = primerSegmentoCohort[0];

      if (cohort === cohortsSeleccionado && anio === anioSeleccionado) {
        debugger;
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
  /* Para obtener el valor */

  cohortsSeleccionadoCombo = document.getElementById("conjuntoBootcamp").value;

}

window.processCohortData = () => {
}

