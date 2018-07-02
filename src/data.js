const filterUsers = (users, search) => {

  let studentsTableFiltered = users.filter(user => (user.name.toUpperCase()).indexOf(search.toUpperCase()) !== -1);
  return studentsTableFiltered;
}
const computeUsersStats = (users, progress, courses) => {
  let studentsTable = [];
  users.forEach(function(element) {
  let uid = element.id;
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
  percentTotal = Math.round((percentTotal/courses.length)*100)/100;
   
  }
  let percentQuiz;
  if(quizzesCompleted === 0 && quizzesTotal === 0){
    percentQuiz = 0;
  }else{
    percentQuiz = parseInt((quizzesCompleted/quizzesTotal*100).toFixed());
  }
  let scoreAvg;
  if(quizzesScoreSum === 0 && quizzesCompleted === 0){
    scoreAvg = 0;
  }else{
      scoreAvg = parseInt((quizzesScoreSum/quizzesCompleted).toFixed());
  }
  let usersWithStats = {
    stats : {
      name : (element.name).replace(/\b\w/g, function(l){ return l.toUpperCase() }),
      percent: percentTotal,
      exercises : {
        total: exercisesTotal,
        completed: exercisesCompleted,
        percent: parseInt((exercisesCompleted/exercisesTotal*100).toFixed())
      },
      reads : {
        total: readsTotal,
        completed: readsCompleted, 
        percent: parseInt((readsCompleted/readsTotal*100).toFixed())
      },
      quizzes : {
        total: quizzesTotal, 
        completed: quizzesCompleted, 
        percent: percentQuiz,
        scoreSum: quizzesScoreSum,
        scoreAvg: scoreAvg
      }
    }
  }
  studentsTable.push(usersWithStats);
  });
  usersStats=studentsTable;
  return studentsTable;
}

const sortUsers = (users, orderBy, orderDirection) => {
  let studentsTableByOrder =users;
  if(orderBy === "Nombre") {
    studentsTableByOrder.sort( function(a, b) {
      var nameA=a.stats.name.toLowerCase(), nameB=b.stats.name.toLowerCase()
      if (nameA < nameB)
          return -1
      if (nameA > nameB)
          return 1
    });
  }
  if(orderBy === "Porcentaje General") {
    studentsTableByOrder.sort( function(a,b) {
      return a.stats.percent - b.stats.percent;
    });
  }
  if(orderBy === "Ejercicios") {
    studentsTableByOrder.sort( function(a,b) {
      return a.stats.exercises.completed - b.stats.exercises.completed;
    });
  }
  if(orderBy === "Quizzes") {
    studentsTableByOrder.sort( function(a,b) {
      return a.stats.quizzes.completed - b.stats.quizzes.completed;
    });
  }
  if(orderBy === "Promedio de Quizzes") {
    studentsTableByOrder.sort( function(a,b) {
      return a.stats.quizzes.scoreSum - b.stats.quizzes.scoreSum;
    });
  }
  if(orderBy === "Lecturas") {
    studentsTableByOrder.sort( function(a,b) {
      return a.stats.reads.completed - b.stats.reads.completed;
    });
  }
  if (orderDirection === "DESC") {
    studentsTableByOrder = studentsTableByOrder.reverse();
  }

  return studentsTableByOrder;
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
  let studentsTableOrderAndFiltered = sortUsers(usersWithStatus, orderBy, orderDirection);
  return studentsTableOrderAndFiltered;
}

window.filterUsers = filterUsers;
window.computeUsersStats = computeUsersStats;
window.sortUsers = sortUsers;
window.processCohortData = processCohortData;