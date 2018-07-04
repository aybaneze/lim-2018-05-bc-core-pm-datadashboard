const filterUsers = (users, search) => {
  /*let myListFiltered = users.filter(user => (user.name.toUpperCase()).
  return myListFiltered;//lista de usuarios con coincidencia en search
}

*/
let filterName = users.filter((user) => (user.name.toUpperCase()).indexOf(search.toUpperCase()) !== -1);
  return filterName;
};
const computeUsersStats = (users, progress, courses) => {
  let myList = [];
  users.forEach(function(element1) {
  
  let uid = element1.id;
  let progressUser = progress[uid];
  let percentTotal = 0;
  let exercisesTotal = 0;
  let exercisesCompleted = 0;
  let readsTotal = 0;
  let readsCompleted = 0;
  let quizzesTotal = 0;
  let quizzesCompleted = 0;
  let quizzesScoreSum = 0;
  let empty = Object.keys(progressUser).length;
  
  if(element1.role === "student" && element1.name != ""){

  if(empty !== 0)
  {
    
    courses.forEach(courseName => {
      if(progressUser.hasOwnProperty(courseName)) {
        if(progressUser[courseName].hasOwnProperty('percent')) {
          percentTotal += progressUser[courseName].percent;
          let progressUserByCourse = progressUser[courseName];
          Object.values(progressUserByCourse.units).forEach(unit => {
            let exercises = Object.values(unit.parts);
            exercises.forEach((part) => {
              if(part.type === "read") {
                readsCompleted += part.completed;
                readsTotal++;
              }
              if(part.type === "quiz") {
                quizzesCompleted += part.completed;
                quizzesTotal++;
                if(part.hasOwnProperty('score')){
                  quizzesScoreSum += part.score;
                }
              }
              if(part.type === "practice") {
                if(part.hasOwnProperty('exercises')) {
                  Object.values(part.exercises).forEach(ejercicio => {
                      exercisesCompleted += ejercicio.completed;
                      exercisesTotal++;
                  })
                }
              }
            })
          })
        }
      }
    })
    // console.log(percentTotal);
    percentTotal = Math.round((percentTotal/courses.length)*100)/100;
    // console.log(percentTotal);
  }
 
  let percentQuiz;
  if(quizzesCompleted === 0 && quizzesTotal === 0){
    percentQuiz = 0;
  }else{
    percentQuiz = parseInt((quizzesCompleted/quizzesTotal*100).toFixed());
  }
  let scroreAvrg;
  if(quizzesScoreSum === 0 && quizzesCompleted === 0){
    scroreAvrg = 0;
  }else{
      scroreAvrg = parseInt((quizzesScoreSum/quizzesCompleted).toFixed());
  }
  let usersWithStats = {
    stats : {
      name : (element1.name).replace(/\b\w/g, function(l){ return l.toUpperCase() }),//primeraletra de caa palabra enmayuscula
      percent: percentTotal,
      exercises : {
        total: exercisesTotal,
        completed: exercisesCompleted,//autocorregidos completados
        percent: parseInt((exercisesCompleted/exercisesTotal*100).toFixed())//validator(exercisesCompleted,exercisesTotal)porcentaje de ejercicios autocorregidos autocompletados
      },
      reads : {
        total: readsTotal,//total de lecturas presentes
        completed: readsCompleted, //lecturas completadas
        percent: parseInt((readsCompleted/readsTotal*100).toFixed())//validator(readsCompleted, readsTotal)porcentaje de lecturas
      },
      quizzes : {
        total: quizzesTotal, 
        completed: quizzesCompleted, 
        percent: percentQuiz,
        scoreSum: quizzesScoreSum,
        scoreAvg: scroreAvrg
      }
    }
  }
  myList.push(usersWithStats);
  }else{
    
    element1.name;
    
  }
  });

  usersWithStats=myList;
  return myList;
}

const sortUsers = (users, orderBy, orderDirection) => {
  let myListByOrder =users;
  if(orderBy === "Nombre") {
    myListByOrder.sort( function(a, b) {
      var nameA=a.stats.name.toLowerCase(), nameB=b.stats.name.toLowerCase()
      if (nameA < nameB) //sort string ascending
          return -1
      if (nameA > nameB)
          return 1
      // return 0 //default return value (no sorting)
    });
  }
  if(orderBy === "% Total") {
    myListByOrder.sort( function(a,b) {
      return a.stats.percent - b.stats.percent;
    });
  }
  if(orderBy === "% Ejercicios") {
    myListByOrder.sort( function(a,b) {
      return a.stats.exercises.completed - b.stats.exercises.completed;
    });
  }
  if(orderBy === "% Quizzes") {
    myListByOrder.sort( function(a,b) {
      return a.stats.quizzes.completed - b.stats.quizzes.completed;
    });
  }

  if(orderBy === "% Lecturas") {
    myListByOrder.sort( function(a,b) {
      return a.stats.reads.completed - b.stats.reads.completed;
    });
  }
  if(orderBy === "Promedio de quizzes") {
    myListByOrder.sort( function(a,b) {
      return a.stats.quizzes.scoreSum - b.stats.quizzes.scoreSum;
    });
  }
  
  if (orderDirection === "DESC") {
    myListByOrder = myListByOrder.reverse();
  }

  return myListByOrder;//arreglo de usuarios ordenados
}

const processCohortData = (options) => {
  let users = options.cohortData.users;
  let progress = options.cohortData.progress;
  let orderBy = options.orderBy;
  let orderDirection = options.orderDirection;
  let search = options.search;
  let courses = options.cohortData.coursesIndex;
  let usersFiltered = filterUsers(users, search);
  let usersWithStatus = computeUsersStats(usersFiltered, progress, courses);
  let myListOrderAndFiltered = sortUsers(usersWithStatus, orderBy, orderDirection);
  return myListOrderAndFiltered;
}

window.filterUsers = filterUsers;
window.computeUsersStats = computeUsersStats;
window.sortUsers = sortUsers;
window.processCohortData = processCohortData;