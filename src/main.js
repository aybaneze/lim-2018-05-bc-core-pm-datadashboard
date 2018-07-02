let users = {};
let progress = {};
let courses = {};
let cohort = {};
let studentsTable;


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
    //computeUsersStats(users, progress,courses);
  })

let grupoAnio = document.getElementById("conjuntoAnio"); /*Obtener el SELECT */
let anioSeleccionado = grupoAnio.options[grupoAnio.selectedIndex].value;

let grupoCohort = document.getElementById("selectSede"); /*Obtener el SELECT */
let cohortsSeleccionado = grupoCohort.options[grupoCohort.selectedIndex].value;

let grupoCohortCombo = document.getElementById("conjuntoBootcamp"); /*Obtener el SELECT */
let cohortsSeleccionadoCombo = grupoCohortCombo.options[grupoCohortCombo.selectedIndex].value;

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
      let primerSegmentoCohort = courses[i].id.split("-");
      let cohort = primerSegmentoCohort[0];

      if (cohort === cohortsSeleccionado && anio === anioSeleccionado) {
        let opt = document.createElement('option');
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


var chargeAll = document.getElementById('udt');
chargeAll.addEventListener("click", chargeDatatable);
var chargeSearch = document.getElementById('buttonSearch');
chargeSearch.addEventListener("click", chargeDatatable);

function chargeDatatable() {
  fetch('https://api.laboratoria.la/cohorts')
  .then((response) => {return response.json();})
  .then((cohorts) => {
    //selector
  
  let selectorSede = document.getElementById('selectSede');
  let sedeName = selectorSede.options[selectorSede.selectedIndex].value;
  let selector = document.getElementById('conjuntoBootcamp');
  let selectorName = selector.options[selector.selectedIndex].value;
  let cohortByCampus = cohorts.filter(cohort => (cohort.id.toUpperCase()).indexOf(selectorName.toUpperCase()) !== -1);
  let selectorIndex = selector.selectedIndex;
  let cohortName = selectorName;
 
  
    let jsonData = "https://api.laboratoria.la/cohorts/" + cohortName + "/users";
    fetch(jsonData)
    .then((response) => {return response.json();})
    .then((users) => {
    
      jsonData = "https://api.laboratoria.la/cohorts/"+ cohortName +"/progress";
      fetch(jsonData)
      .then((response) => {return response.json();})
      .then((progress)=> {
           
        let ordenar1 = document.getElementById('orderBy');
        let orderBy = ordenar1.options[ordenar1.selectedIndex].text;
        
        let ordenar2 = document.getElementById('orderDirection');
        let orderDirection = ordenar2.options[ordenar2.selectedIndex].text;
        
        let search = document.getElementById('myInput').value;
        var options = {
          cohort: cohortByCampus[0],
          cohortData : {
            users,
            progress,
            coursesIndex : Object.keys(cohortByCampus[0].coursesIndex)
          },
          orderBy,
          orderDirection,
          search
        }
        
        let studentsTableData = window.processCohortData(options);
        let studentsOptions = document.getElementById("myTable");
        studentsOptions.innerHTML="";
        studentsOptions.innerHTML="<tr><td>Nombre</td><td>Porcentaje General</td><td>Ejercicios</td><td>Quizzes</td><td>Lecturas</td><td>Promedio de Quizzes</td><td>Evento</td></tr>";

        studentsOptions.appendChild(document.createElement('tr'));
        let count = 1;
        studentsTableData.forEach(function(element) {
        let fileStudent = document.createElement('tr');
        fileStudent.setAttribute("id", "student" + count);
        let nameOfStudents = document.createElement('td');
        nameOfStudents.innerText = element.stats.name;
        let percentStudent = document.createElement('td');
        percentStudent.innerText = element.stats.percent + "%";
        let exercisesStudent = document.createElement('td');
        let statsCompleted  = "";
    
    statsCompleted = element.stats.exercises.completed;
    if(isNaN(statsCompleted)){
      statsCompleted = "0";
    }
        exercisesStudent.innerText = statsCompleted + " de " +element.stats.exercises.total;
        let quizzesStudent = document.createElement('td');
        quizzesStudent.innerText = element.stats.quizzes.completed + " de " +element.stats.quizzes.total;
        let readsStudent = document.createElement('td');
        readsStudent.innerText = element.stats.reads.completed + " de " +element.stats.reads.total;
        let quizzesPromStudent = document.createElement('td');
        quizzesPromStudent.innerText = element.stats.quizzes.scoreSum;
        studentsOptions.appendChild(nameOfStudents);
        studentsOptions.appendChild(percentStudent);
        studentsOptions.appendChild(exercisesStudent);
        studentsOptions.appendChild(quizzesStudent);
        studentsOptions.appendChild(readsStudent);
        studentsOptions.appendChild(quizzesPromStudent);
    
    let tdButtonTD = document.createElement('td');
    tdButtonTD.innerHTML =  '<td><button onclick="showDetails(this)" class="delete" data-key="'+ (count) +'">Ver</button></td>';
    count++;        
        
    studentsOptions.appendChild(tdButtonTD);
        studentsOptions.appendChild(document.createElement('tr'));
    
       
        });
    studentsTable = studentsTableData;
      });
    });
  });
}

function showDetails(users) {
    
    var modal = document.getElementById('myModal');//oscurece la parte de atràs
    
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];//dibuja la x

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    
      var userType = parseInt(users.getAttribute("data-key")) - 1;
    debugger;
    var objetoUsersWithStats = studentsTable[userType];

    
    
    document.getElementById("pagrafo1").innerHTML = "Nombre" + " " + objetoUsersWithStats.stats.name;
    let elementProgress = document.getElementById("progresExercise");
    elementProgress.innerHTML = "";
    elementProgress.classList = "";
    elementProgress.classList.add("progress-bar");
    elementProgress.classList.add("progress-bar-primary");
    elementProgress.setAttribute("aria-valuenow",objetoUsersWithStats.stats.exercises.percent);
    
    var porcentajeExercise = objetoUsersWithStats.stats.exercises.percent;
    if(isNaN(porcentajeExercise)){
      porcentajeExercise = "0";
    }
    elementProgress.classList.add("w-"+ porcentajeExercise);
    elementProgress.innerText = porcentajeExercise +"%";
    
    
    var progresQuizzes = document.getElementById("progresQuizzes");
    progresQuizzes.innerHTML = "";
    progresQuizzes.classList = "";
    progresQuizzes.classList.add("progress-bar");
    progresQuizzes.classList.add("progress-bar-primary");
    progresQuizzes.setAttribute("aria-valuenow",objetoUsersWithStats.stats.quizzes.percent);
    var porcentajeQuizzes = objetoUsersWithStats.stats.quizzes.percent;
    if(isNaN(porcentajeQuizzes)){
      porcentajeQuizzes = "0";
    }
    progresQuizzes.classList.add("w-"+ porcentajeQuizzes);
    progresQuizzes.innerText = porcentajeQuizzes +"%";
    
    var progresReads = document.getElementById("progresReads");
    progresReads.innerHTML = "";
    progresReads.classList = "";
    progresReads.classList.add("progress-bar");
    progresReads.classList.add("progress-bar-primary");
    progresReads.setAttribute("aria-valuenow",objetoUsersWithStats.stats.reads.percent);
    
    var porcentajeReads= objetoUsersWithStats.stats.reads.percent;
    if(isNaN(porcentajeReads)){
      porcentajeReads = "0";
    }
    progresReads.classList.add("w-"+ porcentajeReads);
    progresReads.innerText = porcentajeReads +"%";
    
}
