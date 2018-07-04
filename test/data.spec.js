describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(window.computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(window.sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(window.filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(window.processCohortData);
  });
  describe('computeUsersStats(users, progress, courses)', () => {
    
  const cohort = window.fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
  const courses = Object.keys(cohort.coursesIndex);
  const { users, progress } = window.fixtures;
  
    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = window.computeUsersStats(users, progress, courses);
      assert.equal('727', processed.length);
      processed.forEach(user => {
      assert.ok(user.hasOwnProperty('stats'));
      assert.isNumber(user.stats.percent);
      assert.isObject(user.stats.exercises);
      assert.isObject(user.stats.quizzes);
      assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = window.computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreSum: 57,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  describe('sortUsers(users, orderBy, orderDirection)', () => {
    
    let firstUser = {
      stats: {
        name: "Aissa Navarro",
        percent: 100,
        exercises: {
          total: 2, 
          completed: 2, 
          percent: 100
        },
        reads: {
          total: 11, 
          completed: 11, 
          percent: 100
        },

        quizzes:{
          total: 3, 
          completed: 3, 
          percent: 100, 
          scoreSum: 162, 
          scoreAvg: 54
        }
      }
    }

    let secondUser = {
      stats: {
        name: "Lizeth",
        percent: 53,
        exercises: {
          total: 2, 
          completed: 0, 
          percent: 0
        },
        reads: {
          total: 11, 
          completed: 6, 
          percent: 55
        },

        quizzes:{
          total: 3, 
          completed: 2, 
          percent: 67, 
          scoreSum: 58, 
          scoreAvg: 29
        }
      }

    } 
    let thirdUser = {
      stats: {
        name: "liliana",
        percent: 34,
        exercises: {
          total: 2, 
          completed: 0, 
          percent: 0
        },
        reads: {
          total: 11, 
          completed: 4, 
          percent: 36
        },

        quizzes:{
          total: 3, 
          completed: 1, 
          percent: 33, 
          scoreSum: 100, 
          scoreAvg: 100
        }
      }

    }
    let usersArray = [firstUser, secondUser, thirdUser];

    it('debería retornar arreglo de usuarios ordenado por nombre ASC',() => {
      assert.deepEqual(window.sortUsers(usersArray, 'Nombre', 'ASC'), [firstUser, thirdUser, secondUser])
    });
    it('debería retornar arreglo de usuarios ordenado por nombre DESC',() => {
      assert.deepEqual(window.sortUsers(usersArray, 'Nombre', 'DESC'), [secondUser, thirdUser, firstUser])
    });
    
    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC',() => {
      assert.deepEqual(window.sortUsers(usersArray, '% Total', 'ASC'), [thirdUser, secondUser, firstUser])
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC',() => {
      assert.deepEqual(window.sortUsers(usersArray, '% Total', 'DESC'), [firstUser, secondUser, thirdUser])
    });

    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC',() => {
      assert.deepEqual(window.sortUsers(usersArray, '% Ejercicios', 'ASC'), [secondUser, thirdUser,firstUser])
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC',() => {
      assert.deepEqual(window.sortUsers(usersArray, '% Ejercicios', 'DESC'), [firstUser, thirdUser, secondUser])
    });  

    
    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC',() => {
      assert.deepEqual(window.sortUsers(usersArray, '% Quizzes', 'ASC'), [thirdUser, secondUser, firstUser])
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC',() => {
      assert.deepEqual(window.sortUsers(usersArray, '% Quizzes', 'DESC'), [firstUser, secondUser, thirdUser])
    });
    
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC',() => {
      assert.deepEqual(window.sortUsers(usersArray, '% Lecturas', 'ASC'), [thirdUser, secondUser, firstUser])
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC',() => {
      assert.deepEqual(window.sortUsers(usersArray, '% Lecturas', 'DESC'), [firstUser, secondUser, thirdUser])
    });
    
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC',() => {
      assert.deepEqual(window.sortUsers(usersArray, 'Promedio de quizzes', 'ASC'), [secondUser, thirdUser, firstUser])
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC',() => {
      assert.deepEqual(window.sortUsers(usersArray, 'Promedio de quizzes', 'DESC'), [firstUser, thirdUser, secondUser])
    });

    
  });


  describe('filterUsers(users, filterBy)', () => {
  const { users } = fixtures;
  const search = 'Lizeth'
  const filtered = filterUsers(users, search);
  it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)', () => {
    assert.deepEqual(filtered[0].name, 'Lizeth');
  });

});
   
  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {
   
  const cohort = window.fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
  const courses = Object.keys(cohort.coursesIndex);
  const { users, progress } = window.fixtures; 
  it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter',() =>{
    var options = {
          cohort: courses,
          cohortData : {
            users: users,
            progress: progress,
            coursesIndex : Object.keys(cohort.coursesIndex)
          },
          orderBy: 'name',
          orderDirection: 'ASC',
          search: 'DEV'
        }
        const result=processCohortData(options);
        
        const finalUser={
          name:'Devora Alexandra MiñAno Vejarano',
        };
        
        assert.equal(result[0].stats.name, finalUser.name)
      });


     
    });
  }); 
  