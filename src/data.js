let usersDataTable=document.getElementById('udt');

//usersDataTable.addEventListener('click',computeUsersStats(users, progress, courses));

    usersDataTable.addEventListener(
        'click',
        function() {

        	computeUsersStatsDataTable();



        },
        false
      );



const computeUsersStats= (users, progress, courses)=>{
	
	
		
    };



const computeUsersStatsDataTable= ()=>{
	
	debugger;
		var Table = document.getElementById("TableBody");

		Table.innerHTML = "";
		
		for(let i = 0 ; i<users.length;i++){
		  var existeSignupCohort = users[i].signupCohort;
              let cohort;
            let valoresPantalla;
            let arraySplitUserData;
            if(existeSignupCohort != undefined){
            arraySplitUserData = users[i].signupCohort.split("-");

            cohort = arraySplitUserData[0]+ "-" + arraySplitUserData[1];
            valoresPantalla = cohortsSeleccionado + "-" + anioSeleccionado ;
            }
			
        

			if(cohort === valoresPantalla ){//para que entre a la funcion que cumpla lo seleccionado


			   var objetoProgresoQuiz = progress[users[i].id];

               var objetoVacio = objetoProgresoQuiz.intro;
               if(objetoVacio!= undefined){
			   var quizIntroduction = objetoProgresoQuiz.intro.units["01-introduction"];
			   var quizIntroductionParts = quizIntroduction.parts["04-quiz"].completed;

			   var quizDesign = objetoProgresoQuiz.intro.units["03-ux-design"];
			   var quizDesignParts = quizDesign.parts["03-quiz"].completed;
			   var quizVariables = objetoProgresoQuiz.intro.units["02-variables-and-data-types"];
			   var quizVariablesParts = quizVariables.parts["05-quiz"].completed;
			   var totalQuiz = parseInt(quizIntroductionParts) + parseInt(quizDesignParts)+ parseInt(quizVariablesParts)
			 

               var objetoProgressPractice = progress[users[i].id];
               var practiceIntroductionUnits = objetoProgressPractice.intro.units;
               var practiceIntroduction;
               var practiceIntroductionParts;
               var practiceGuidedExercises;

               if(practiceIntroductionUnits != undefined){

                practiceIntroduction=objetoProgressPractice.intro.units["02-variables-and-data-types"];



               practiceIntroductionParts=practiceIntroduction.parts["06-exercises"].completed;
               practiceGuidedExercises = practiceIntroduction.parts["04-guided-exercises"].completed;
               }else{
                practiceGuidedExercises="0";
                practiceIntroductionParts="0";
               }
             

               var totalPractice = parseInt(practiceIntroductionParts)+parseInt(practiceGuidedExercises)


               var objetoProgressRead = progress[users[i].id];

               var readIntroduction =objetoProgressRead.intro.units["01-introduction"];
               var readWhyLearn = readIntroduction.parts["02-why-learn-to-code"].completed;
               var readGrowth = readIntroduction.parts["01-growth-mindset"].completed;
               var readWelcome = readIntroduction.parts["00-welcome-and-orientation"].completed;
               var readYourFirst = readIntroduction.parts["03-your-first-website"].completed;

               var readUxDesign = objetoProgressRead.intro.units["03-ux-design"];
               var readDevelopment = readUxDesign.parts["00-development-team"].completed;
               var readUxVsDesign = readUxDesign.parts["02-ux-design-vs-ui-design"].completed;
               var readUx = readUxDesign.parts["01-ux-design"].completed;

               var readVariables = objetoProgressRead.intro.units["02-variables-and-data-types"];
               var readComments = readVariables.parts["03-comments"].completed;
               var readValuesData = readVariables.parts["00-values-data-types-and-operators"].completed;
               var readVariables1 = readVariables.parts["01-variables"].completed;
               var readSelf = readVariables.parts["02-self-learning-MDN"].completed;

               var totalRead = parseInt(readWhyLearn)+parseInt(readGrowth)+parseInt(readWelcome)+parseInt(readYourFirst)+parseInt(readDevelopment)+parseInt(readUxVsDesign)+parseInt(readUx)+parseInt(readComments)+parseInt(readValuesData)+parseInt(readVariables1)+parseInt(readSelf)



			
				let TableRow="<tr></tr>";
               TableRow = "<td>" + users[i].name+ "</td>"+
               			  "<td>" + totalRead + "</td>"+
               			  "<td>" + totalPractice + "</td>"+
               			  "<td>" + totalQuiz + "</td>"+
						  "<td>" + totalPractice+ "</td>"+
                          
                          
                          
						   '<td><button onclick="showDetails(this)" class="delete" >Ver</button></td>';
						  
			  // var objetoProgress = progress.jsonData[i].id;		  
			   var TrElement = document.createElement("tr");
               TrElement.innerHTML = TableRow;
			   
			   
               document.getElementById("TableBody").appendChild(TrElement);
               }	   
			}

		}
	
    };