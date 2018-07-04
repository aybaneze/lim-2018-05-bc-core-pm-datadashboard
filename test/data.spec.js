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
      assert.equal(users.length, processed.length);
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
          scoreSum: 57, 
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
      assert.deepEqual(window.sortUsers(usersArray, 'Promedio de Quizzes', 'ASC'), [secondUser, firstUser, thirdUser])
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC',() => {
      assert.deepEqual(window.sortUsers(usersArray, 'Promedio de quizzes', 'DESC'), [thirdUser, firstUser, secondUser])
    });

    
  });


  describe('filterUsers(users, filterBy)', () => {

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)',() => {
    let usersArrayFilter = [{
        "id": "TXjs0pFNJbcFFPqc2IiYvFRv3a22",
        "name": "Leydy Mayumy",
        "locale": "es-ES",
        "signupCohort": "lim-2018-03-pre-core-pw",
        "timezone": "America/Lima",
        "role": "student"
    },
    {
        "id": "uHDoLip0sERFAgPkyl1e9xUrvlo2",
        "signupCohort": "lim-2018-03-pre-core-pw",
        "timezone": "America/Lima",
        "name": "Leydy  peralta",
        "locale": "es-ES",
        "role": "student"
    }]
    assert.deepEqual(window.filterUsers(users, 'leydy'), usersArrayFilter);
    assert.deepEqual(window.filterUsers(users, 'LEYDY'), usersArrayFilter);
  });
});
   
   describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {
    
   it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter',() =>{
      assert.deepEqual(window.processCohortData(options),[{
        stats: {
          name: "Lucia",
          percent: 20,
          exercises: {
            total: 2, 
            completed: 0, 
            percent: 0
          },
          reads: {
            total: 11, 
            completed: 3, 
            percent: 27
          },

          quizzes: {
            total: 3, 
            completed: 0, 
            percent: 0, 
            scoreSum: 0, 
            scoreAvg: 0
          }
        }
      }]);
    });
  }); 
  });  