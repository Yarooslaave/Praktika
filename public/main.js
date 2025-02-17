document.addEventListener("DOMContentLoaded", function () {

    // ============================
    // 1) Логика показа секций + хранение Chart'ов
    // ============================
    const sidebarLinks = document.querySelectorAll("#sidebarNav .nav-link");
    const allSections = document.querySelectorAll("main section");
  
    let charts = {};
  
    function showOnlySection(targetId) {
      allSections.forEach(section => {
        section.classList.remove("show");
      });
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add("show");
      }
      recreateChartsForSection(targetId);
    }
  
    allSections.forEach(sec => sec.classList.remove("show"));
    showOnlySection("sectionPerformance");
  
    const defaultLink = document.querySelector(`#sidebarNav a[data-target="sectionPerformance"]`);
    if (defaultLink) {
      defaultLink.classList.add("active");
    }
  
    sidebarLinks.forEach(link => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        sidebarLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        showOnlySection(link.getAttribute("data-target"));
      });
    });
  
  
    // ============================
    // 2) Пересоздание графиков
    // ============================
    function recreateChartsForSection(sectionId) {
      switch (sectionId) {
        case "sectionPerformance":
          createPerformanceCharts();
          break;
        case "sectionSelfStudy":
          createSelfStudyCharts();
          break;
        case "sectionIndividual":
          createIndividualCharts();
          break;
        case "sectionSoftSkills":
          createSoftSkillsCharts();
          break;
        case "sectionPersonalDevelopment":
          createPersonalDevelopmentChart();
          break;
      }
    }
  
    // ============================
    // 3) Палитра для значения
    // ============================
    function getColorByValue(value) {
      switch (value) {
        case 4: return '#4DD0E1';
        case 3: return '#FFD54F';
        case 2: return '#FF8A80';
        case 1: return '#CE93D8';
        default: return '#999999';
      }
    }
  
    // ============================
    // 4) "Успеваемость": 4 графика
    // ============================
    function createPerformanceCharts() {
      const cwCtx = document.getElementById('chartClassWork');
      if (cwCtx) {
        if (charts.classWork) charts.classWork.destroy();
        charts.classWork = buildClassWorkChart(cwCtx);
      }
  
      const spCtx = document.getElementById('chartSelfPreparation');
      if (spCtx) {
        if (charts.selfPrep) charts.selfPrep.destroy();
        charts.selfPrep = buildSelfPrepChart(spCtx);
      }
  
      const dynCtx = document.getElementById('chartProgressDynamics');
      if (dynCtx) {
        if (charts.dynamics) charts.dynamics.destroy();
        charts.dynamics = buildDynamicsChart(dynCtx);
      }
  
      const matCtx = document.getElementById('chartMaterialUnderstanding');
      if (matCtx) {
        if (charts.material) charts.material.destroy();
        charts.material = buildMaterialChart(matCtx);
      }
    }
  
    // ============================
    // 5) "Самоподготовка": 4 графика
    // ============================
    function createSelfStudyCharts() {
      const attCtx = document.getElementById('chartAttendance');
      if (attCtx) {
        if (charts.attendance) charts.attendance.destroy();
        charts.attendance = buildAttendanceChart(attCtx);
      }
  
      const cwSelf = document.getElementById('chartClasswork');
      if (cwSelf) {
        if (charts.classworkSelf) charts.classworkSelf.destroy();
        charts.classworkSelf = buildClassworkSelfChart(cwSelf);
      }
  
      const subjCtx = document.getElementById('chartSubjects');
      if (subjCtx) {
        if (charts.subjects) charts.subjects.destroy();
        charts.subjects = buildSubjectsChart(subjCtx);
      }
  
      const tasksCtx = document.getElementById('chartTasks');
      if (tasksCtx) {
        if (charts.tasks) charts.tasks.destroy();
        charts.tasks = buildTasksChart(tasksCtx);
      }
    }
  
    // ============================
    // 6) "Индивидуальный трек": 2 графика
    // ============================
    function createIndividualCharts() {
      const cwInd = document.getElementById('chartIndividualClasswork');
      if (cwInd) {
        if (charts.individualCW) charts.individualCW.destroy();
        charts.individualCW = buildIndividualClassworkChart(cwInd);
      }
  
      const undInd = document.getElementById('chartIndividualUnderstanding');
      if (undInd) {
        if (charts.individualUN) charts.individualUN.destroy();
        charts.individualUN = buildIndividualUnderstandingChart(undInd);
      }
    }
  
    // ============================
    // 7) "Мягкие навыки": 3 графика
    // ============================
    function createSoftSkillsCharts() {
      const emoCtx = document.getElementById('chartEmotionalIntelligence');
      if (emoCtx) {
        if (charts.emotional) charts.emotional.destroy();
        charts.emotional = buildEmotionalChart(emoCtx);
      }
  
      const leadCtx = document.getElementById('chartLeadership');
      if (leadCtx) {
        if (charts.leadership) charts.leadership.destroy();
        charts.leadership = buildLeadershipChart(leadCtx);
      }
  
      const discCtx = document.getElementById('chartDiscipline');
      if (discCtx) {
        if (charts.discipline) charts.discipline.destroy();
        charts.discipline = buildDisciplineChart(discCtx);
      }
    }
  
    // ============================
    // 8) "Развитие личностных качеств" (радар)
    // ============================
    function createPersonalDevelopmentChart() {
      const persCtx = document.getElementById('chartPersonalSkills');
      if (persCtx) {
        if (charts.personalSkills) charts.personalSkills.destroy();
        charts.personalSkills = buildRadarChart(persCtx);
      }
    }
  
    // ============================
    // 9) Реализация отдельных графиков (меняем только логику меток)
    // ============================
  
    // ---------- УСПЕВАЕМОСТЬ ----------
    function buildClassWorkChart(ctx) {
      const values = [4, 3, 2, 1, 4, 3, 2, 1, 4, 3];
      const labels = [
        '2025-01-01','2025-01-02','2025-01-03','2025-01-04',
        '2025-01-05','2025-01-06','2025-01-07','2025-01-08',
        '2025-01-09','2025-01-10'
      ];
      const categories = {
        4:'Вовлечён',
        3:'Вовлечён с нарушениями',
        2:'Не вовлечён',
        1:'Не вовлечён с нарушениями'
      };
      const backgroundColors = values.map(getColorByValue);
  
      return new Chart(ctx, {
        type:'bar',
        data:{
          labels: labels,
          datasets:[{
            label:'Данные',
            data: values,
            backgroundColor: backgroundColors
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          animation:{duration:800,easing:'easeInOutQuart'},
          plugins:{
            tooltip:{
              callbacks:{
                label:(info)=>{
                  const val = info.parsed.y;
                  return `${val} — ${categories[val]||'Неизвестно'}`;
                }
              }
            },
            legend:{display:false}
          },
          scales:{
            y:{beginAtZero:true},
            x:{ticks:{autoSkip:false}}
          }
        }
      });
    }
  
    function buildSelfPrepChart(ctx) {
      const values = [3,2,1,3];
      const labels = ['2025-01-01','2025-01-02','2025-01-03','2025-01-04'];
      const categories = {3:'В полном объёме',2:'Частично',1:'Не выполняет'};
      const backgroundColors = values.map(getColorByValue);
  
      return new Chart(ctx, {
        type:'bar',
        data:{
          labels,
          datasets:[{
            label:'Данные',
            data: values,
            backgroundColor: backgroundColors
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          animation:{duration:800,easing:'easeInOutQuart'},
          plugins:{
            legend:{display:false},
            tooltip:{
              callbacks:{
                label:(ctx)=>{
                  const val = ctx.parsed.y;
                  return `${val} — ${categories[val]||'Неизвестно'}`;
                }
              }
            }
          },
          scales:{y:{beginAtZero:true}}
        }
      });
    }
  
    function buildDynamicsChart(ctx){
      const values=[3,2,1,3];
      const labels=['2025-01-01','2025-01-02','2025-01-03','2025-01-04'];
      const categories={3:'Положительная',2:'Нет изменений',1:'Отрицательная'};
      const backgroundColors=values.map(getColorByValue);
  
      return new Chart(ctx,{
        type:'bar',
        data:{
          labels,
          datasets:[{
            label:'Данные',
            data: values,
            backgroundColor: backgroundColors
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          animation:{duration:800,easing:'easeInOutQuart'},
          plugins:{
            legend:{display:false},
            tooltip:{
              callbacks:{
                label:(c)=>{
                  const val=c.parsed.y;
                  return `${val} — ${categories[val]||'Неизвестно'}`;
                }
              }
            }
          },
          scales:{y:{beginAtZero:true}}
        }
      });
    }
  
    function buildMaterialChart(ctx){
      const values=[1,2,3,2];
      const labels=['2025-01-01','2025-01-02','2025-01-03','2025-01-04'];
      const categories={1:'Низкое',2:'Среднее',3:'Высокое'};
      const backgroundColors=values.map(getColorByValue);
  
      return new Chart(ctx,{
        type:'bar',
        data:{
          labels,
          datasets:[{
            label:'Данные',
            data: values,
            backgroundColor: backgroundColors
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          animation:{duration:800,easing:'easeInOutQuart'},
          plugins:{
            legend:{display:false},
            tooltip:{
              callbacks:{
                label:(c)=>{
                  const val=c.parsed.y;
                  return `${val} — это ${categories[val]||'Неизвестно'}`;
                }
              }
            }
          },
          scales:{y:{beginAtZero:true}}
        }
      });
    }
  
    // ---------- САМОПОДГОТОВКА ----------
  
    function buildAttendanceChart(ctx){
      const values=[3,2,1,3];
      const labels=['2025-01-01','2025-01-02','2025-01-03','2025-01-04'];
      const categories={3:'Регулярно посещает',2:'Эпизодически посещает',1:'Не посещает'};
      const backgroundColors=values.map(getColorByValue);
  
      return new Chart(ctx,{
        type:'bar',
        data:{
          labels,
          datasets:[{
            label:'Данные',
            data:values,
            backgroundColor:backgroundColors
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          animation:{duration:800,easing:'easeInOutQuart'},
          plugins:{
            legend:{display:false},
            tooltip:{
              callbacks:{
                label:(c)=>{
                  const val=c.parsed.y;
                  return `${val} — это ${categories[val]||'Неизвестно'}`;
                }
              }
            }
          },
          scales:{y:{beginAtZero:true}}
        }
      });
    }
  
    function buildClassworkSelfChart(ctx){
      const values=[3,2,1,2];
      const labels=['2025-01-01','2025-01-02','2025-01-03','2025-01-04'];
      const categories={3:'Самостоятельно',2:'Иногда за помощью',1:'Не может сам'};
      const backgroundColors=values.map(getColorByValue);
  
      return new Chart(ctx,{
        type:'bar',
        data:{
          labels,
          datasets:[{
            label:'Данные',
            data:values,
            backgroundColor:backgroundColors
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          animation:{duration:800,easing:'easeInOutQuart'},
          plugins:{
            legend:{display:false},
            tooltip:{
              callbacks:{
                label:(c)=>{
                  const val=c.parsed.y;
                  return `${val} — это ${categories[val]||'Неизвестно'}`;
                }
              }
            }
          },
          scales:{y:{beginAtZero:true}}
        }
      });
    }
  
    function buildSubjectsChart(ctx){
      const values=[3,2,2,1];
      const labels=['2025-01-01','2025-01-02','2025-01-03','2025-01-04'];
      const categories={3:'Регулярно',2:'Эпизодически',1:'Не посещает'};
      const backgroundColors=values.map(getColorByValue);
  
      return new Chart(ctx,{
        type:'bar',
        data:{
          labels,
          datasets:[{
            label:'Данные',
            data:values,
            backgroundColor:backgroundColors
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          animation:{duration:800,easing:'easeInOutQuart'},
          plugins:{
            legend:{display:false},
            tooltip:{
              callbacks:{
                label:(c)=>{
                  const val=c.parsed.y;
                  return `${val} — это ${categories[val]||'Неизвестно'}`;
                }
              }
            }
          },
          scales:{y:{beginAtZero:true}}
        }
      });
    }
  
    function buildTasksChart(ctx){
      return new Chart(ctx,{
        type:'bar',
        data:{
          labels:['Русский','Математика','Физика'],
          datasets:[
            {
              label:'В полном объёме',
              data:[8,7,5],
              backgroundColor:'#4DD0E1'
            },
            {
              label:'Частично',
              data:[4,5,6],
              backgroundColor:'#FFD54F'
            }
          ]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          animation:{duration:800,easing:'easeInOutQuart'},
          plugins:{
            legend:{position:'bottom'}
          },
          scales:{
            x:{stacked:true},
            y:{stacked:true}
          }
        }
      });
    }
  
   // ---------- ИНДИВИДУАЛЬНЫЙ ТРЕК ----------

// Данные как были
const subjectsData = [
    { subject: "Математика",           datasetA: [4,2,2,1],  datasetB: [2,3,4] },
    { subject: "Русский язык",         datasetA: [6,2,3,1],  datasetB: [2,4,7] },
    { subject: "История",              datasetA: [3,2,4,1],  datasetB: [2,3,5] },
    { subject: "Литература",           datasetA: [4,3,1,2],  datasetB: [2,4,6] },
    { subject: "Английский язык",      datasetA: [5,2,3,2],  datasetB: [2,3,7] },
    { subject: "География",           datasetA: [2,2,3,1],  datasetB: [1,4,4] },
    { subject: "Биология",            datasetA: [5,1,3,3],  datasetB: [3,2,6] },
    { subject: "Информатика",         datasetA: [6,2,1,2],  datasetB: [1,4,5] },
    { subject: "Химия",               datasetA: [3,2,4,1],  datasetB: [1,2,7] },
    { subject: "Искусство",           datasetA: [4,3,2,1],  datasetB: [3,3,6] },
    { subject: "Физическая культура", datasetA: [5,3,1,2],  datasetB: [2,3,6] }
  ];
  
  // Для оси используем .subject → это будут labels
  const labels = subjectsData.map(item => item.subject);
  
  // ----- buildIndividualClassworkChart -----
  // Здесь 4 набора данных, каждый берет один индекс из datasetA
  function buildIndividualClassworkChart(ctx) {
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels, // ["Математика","Русский язык","История",...]
        datasets: [
          {
            label: "Вовлечен",
            // берем datasetA[0] из каждого элемента
            data: subjectsData.map(d => d.datasetA[0]),
            backgroundColor: "#4DD0E1"
          },
          {
            label: "Вовлечен с нарушением",
            data: subjectsData.map(d => d.datasetA[1]),
            backgroundColor: "#FFD54F"
          },
          {
            label: "Не вовлечен",
            data: subjectsData.map(d => d.datasetA[2]),
            backgroundColor: "#FF8A80"
          },
          {
            label: "Не вовлечен с нарушением",
            data: subjectsData.map(d => d.datasetA[3]),
            backgroundColor: "#CE93D8"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // Для горизонтальной: indexAxis: "y"
        indexAxis: 'y',
        animation: { duration: 800, easing: 'easeInOutQuart' },
        layout: { padding: { left: 20, right: 20, top: 20, bottom: 20 } },
        scales: {
          x: { stacked: true, beginAtZero: true, suggestedMax: 12 },
          y: { 
            stacked: true,
            ticks: { autoSkip: false, font: { size: 12 }, padding: 6 }
          }
        },
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
  
  // ----- buildIndividualUnderstandingChart -----
  // Здесь 3 набора данных, по индексам 0..2 из datasetB
  function buildIndividualUnderstandingChart(ctx) {
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels, // те же предметы
        datasets: [
          {
            label: "Низкое",
            data: subjectsData.map(d => d.datasetB[0]),
            backgroundColor: "#FF8A80"
          },
          {
            label: "Среднее",
            data: subjectsData.map(d => d.datasetB[1]),
            backgroundColor: "#FFD54F"
          },
          {
            label: "Высокое",
            data: subjectsData.map(d => d.datasetB[2]),
            backgroundColor: "#4DD0E1"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        animation: { duration: 800, easing: 'easeInOutQuart' },
        layout: { padding: { left: 20, right: 20, top: 20, bottom: 20 } },
        scales: {
          x: { stacked: true, beginAtZero: true, suggestedMax: 12 },
          y: { 
            stacked: true,
            ticks: { autoSkip: false, font: { size: 12 }, padding: 6 }
          }
        },
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
  
  
    // ---------- МЯГКИЕ НАВЫКИ ----------
    function buildEmotionalChart(ctx){
      const values=[4,3,2,1];
      const labels=['2025-01-01','2025-01-02','2025-01-03','2025-01-04'];
      const categories={
        4:'Вовлечен и проявляет инициативу',
        3:'Вовлечен с нарушением',
        2:'Не вовлечен',
        1:'Не вовлечен с нарушением'
      };
      const backgroundColors=values.map(getColorByValue);
  
      return new Chart(ctx,{
        type:'bar',
        data:{
          labels,
          datasets:[{
            label:'Данные',
            data: values,
            backgroundColor:backgroundColors
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          animation:{duration:800,easing:'easeInOutQuart'},
          plugins:{
            legend:{display:false},
            tooltip:{
              callbacks:{
                label:(context)=>{
                  const val=context.parsed.y;
                  return `${val} — ${categories[val]||'Неизвестно'}`;
                }
              }
            }
          },
          scales:{y:{beginAtZero:true}}
        }
      });
    }
  
    function buildLeadershipChart(ctx){
      const values=[4,2,3,1];
      const labels=['2025-01-01','2025-01-02','2025-01-03','2025-01-04'];
      const categories={
        4:'Вовлечен и проявляет инициативу',
        3:'На базовом уровне',
        2:'Редко посещает',
        1:'Не посещает'
      };
      const backgroundColors=values.map(getColorByValue);
  
      return new Chart(ctx,{
        type:'bar',
        data:{
          labels,
          datasets:[{
            label:'Данные',
            data: values,
            backgroundColor: backgroundColors
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          animation:{duration:800,easing:'easeInOutQuart'},
          plugins:{
            legend:{display:false},
            tooltip:{
              callbacks:{
                label:(ctx)=>{
                  const val=ctx.parsed.y;
                  return `${val} — ${categories[val]||'Неизвестно'}`;
                }
              }
            }
          },
          scales:{y:{beginAtZero:true}}
        }
      });
    }
  
    function buildDisciplineChart(ctx){
      const values=[3,2,1,2];
      const labels=['2025-01-01','2025-01-02','2025-01-03','2025-01-04'];
      const categories={
        3:'Нет замечаний',
        2:'Редкие нарушения',
        1:'Частые нарушения'
      };
      const backgroundColors=values.map(getColorByValue);
  
      return new Chart(ctx,{
        type:'bar',
        data:{
          labels,
          datasets:[{
            label:'Данные',
            data: values,
            backgroundColor: backgroundColors
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          animation:{duration:800,easing:'easeInOutQuart'},
          plugins:{
            legend:{display:false},
            tooltip:{
              callbacks:{
                label:(cx)=>{
                  const val=cx.parsed.y;
                  return `${val} — ${categories[val]||'Неизвестно'}`;
                }
              }
            }
          },
          scales:{y:{beginAtZero:true}}
        }
      });
    }
  
    // ---------- РАДАР "Развитие личностных качеств" ----------
    function buildRadarChart(ctx){
      const labels = [
        "Самостоятельность",
        "Креативность",
        "Коммуникабельность",
        "Критическое мышление",
        "Стрессоустойчивость",
        "Умение работать в команде"
      ];
      const values = [4,3,5,2,4,3];
  
      return new Chart(ctx,{
        type:"radar",
        data:{
          labels,
          datasets:[{
            label:"Данные",
            data: values,
            backgroundColor:"rgba(77,208,225,0.3)",
            borderColor:"#4DD0E1",
            borderWidth:2,
            pointBackgroundColor:"#4DD0E1",
            pointBorderColor:"#fff",
            pointHoverBackgroundColor:"#fff",
            pointHoverBorderColor:"#4DD0E1"
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          animation:{duration:800,easing:'easeInOutQuart'},
          scales:{
            r:{
              suggestedMin:1,
              suggestedMax:5,
              ticks:{display:false},
              pointLabels:{font:{size:14},color:"#333"}
            }
          },
          plugins:{legend:{position:"bottom"}}
        }
      });
    }
  
  });
  