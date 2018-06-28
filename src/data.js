const computeUsersStats = (users, progress, courses) => {
 users.forEach((user) => {
    let UserProgress = progress[user.id];     
    console.log(UserProgress);
  });
  }
   
  // const userWhitStats= users.map( (stats)=>{
  //  const  stats = {
  //     percent: 0,
  //     exercices: { 
  //       total: 3,
  //       completed: 4,
  //       percent: 75
  //     },
  //     reads: {
  //       total: 3,
  //       completed: 4,
  //       percent: 70
  //     },

  //     quizzez:{
  //       total: 3,
  //       completed: 4,
  //       percent: 75,
  //       scoreSum: 9,
  //       scoreAvg: 25
      
    //  }
    // })}


window.sortUsers = (users, orderBy, orderDirection) => {

}

//objeto option dentro del listener del boton que realizara 

window.filterUsers = (users, search) => {

}

window.processCohortData = (options) => {


}

