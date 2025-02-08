document.addEventListener("DOMContentLoaded", function () {
  // =====================================
  // 1) Sidebar link click: Smooth scroll & add 'active' class
  // =====================================
  const sidebarLinks = document.querySelectorAll("#sidebarNav .nav-link");
  sidebarLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      // Убираем 'active' у всех ссылок, чтобы потом поставить на текущую
      sidebarLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      // Берём ID целевого блока
      const targetId = link.getAttribute("data-target") || link.getAttribute("href").replace("#", "");
      const targetSection = document.getElementById(targetId);

      // Плавная прокрутка к разделу
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // =====================================
  // 2) Charts for "Успеваемость" section
  //    (sectionPerformance)
  // =====================================

  // График 1: Работа на уроке
  const ctxClassWork = document.getElementById('chartClassWork');
  if (ctxClassWork) {
    new Chart(ctxClassWork, {
      type: 'pie',
      data: {
        labels: ['Вовлечен', 'Вовлечен с нарушениями', 'Не вовлечен', 'Не вовлечен с нарушениями'],
        datasets: [{
          label: 'Работа на уроке',
          data: [12, 5, 7, 3], // заглушка
          backgroundColor: ['#4CAF50', '#FFB74D', '#E91E63', '#BDBDBD']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  // График 2: Освоение материала
  const ctxMaterial = document.getElementById('chartMaterialUnderstanding');
  if (ctxMaterial) {
    new Chart(ctxMaterial, {
      type: 'bar',
      data: {
        labels: ['Низкое', 'Среднее', 'Высокое'],
        datasets: [{
          label: 'Освоение материала',
          data: [4, 8, 10], // заглушка
          backgroundColor: ['#EF5350', '#FFEE58', '#66BB6A']
        }]
      },
      options: {
        responsive: true,
        indexAxis: 'y', // горизонтальные столбики
        scales: {
          x: { beginAtZero: true }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  // График 3: Самоподготовка
  const ctxSelfPrep = document.getElementById('chartSelfPreparation');
  if (ctxSelfPrep) {
    new Chart(ctxSelfPrep, {
      type: 'pie',
      data: {
        labels: ['В полном объёме', 'Частично', 'Не выполняет'],
        datasets: [{
          label: 'Самоподготовка',
          data: [9, 4, 2],
          backgroundColor: ['#2196F3', '#FFC107', '#F44336']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  // График 4: Динамика успеваемости
  const ctxDynamics = document.getElementById('chartProgressDynamics');
  if (ctxDynamics) {
    new Chart(ctxDynamics, {
      type: 'doughnut',
      data: {
        labels: ['Положительная', 'Нет изменений', 'Отрицательная'],
        datasets: [{
          label: 'Динамика успеваемости',
          data: [7, 10, 3],
          backgroundColor: ['#4CAF50', '#9E9E9E', '#F44336']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }


  // =====================================
  // 3) Charts for "Самоподготовка" section
  //    (sectionSelfStudy)
  // =====================================

  // График 1: Общая посещаемость самоподготовки
  const ctxAttendance = document.getElementById('chartAttendance');
  if (ctxAttendance) {
    new Chart(ctxAttendance, {
      type: 'pie',
      data: {
        labels: ['Регулярно посещает', 'Эпизодически посещает', 'Не посещает'],
        datasets: [{
          data: [12, 7, 4],
          backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  // График 2: Посещаемость по предметам (группированный Bar Chart)
  const ctxSubjects = document.getElementById('chartSubjects');
  if (ctxSubjects) {
    new Chart(ctxSubjects, {
      type: 'bar',
      data: {
        labels: ['Русский', 'Математика', 'Физика'],
        datasets: [
          { label: 'Регулярно',     data: [10, 8, 6], backgroundColor: '#4CAF50' },
          { label: 'Эпизодически', data: [5, 6, 3], backgroundColor: '#FFC107' },
          { label: 'Не посещает',   data: [2, 3, 5], backgroundColor: '#F44336' }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  // График 3: Работа на занятии
  const ctxClassworkSelf = document.getElementById('chartClasswork'); 
  if (ctxClassworkSelf) {
    new Chart(ctxClassworkSelf, {
      type: 'pie',
      data: {
        labels: ['Самостоятельно', 'Иногда за помощью', 'Не может сам'],
        datasets: [{
          data: [10, 6, 5],
          backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  // График 4: Полнота выполнения заданий (Stacked Bar Chart)
  const ctxTasks = document.getElementById('chartTasks');
  if (ctxTasks) {
    new Chart(ctxTasks, {
      type: 'bar',
      data: {
        labels: ['Русский', 'Математика', 'Физика'],
        datasets: [
          { label: 'В полном объёме', data: [8, 7, 5], backgroundColor: '#4CAF50' },
          { label: 'Частично',        data: [4, 5, 6], backgroundColor: '#FFC107' }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          x: { stacked: true },
          y: { stacked: true }
        }
      }
    });
  }


  // =====================================
  // 4) Charts for "Индивидуальный трек" section
  //    (sectionIndividual)
  // =====================================

  // Пример данных (замените на реальные)
  const individualTrackData = [
    { discipline: "Математика",    classwork: [8, 5, 3, 2], understanding: [4, 6, 7] },
    { discipline: "Физика",        classwork: [6, 4, 5, 3], understanding: [3, 5, 7] },
    { discipline: "Русский язык",  classwork: [7, 6, 2, 1], understanding: [2, 4, 9] },
    { discipline: "Математика",    classwork: [8, 5, 3, 2], understanding: [4, 6, 7] },
    { discipline: "Физика",        classwork: [6, 4, 5, 3], understanding: [3, 5, 7] },
    { discipline: "Русский язык",  classwork: [7, 6, 2, 1], understanding: [2, 4, 9] },
    { discipline: "Математика",    classwork: [8, 5, 3, 2], understanding: [4, 6, 7] },
    { discipline: "Физика",        classwork: [6, 4, 5, 3], understanding: [3, 5, 7] },
    { discipline: "Русский язык",  classwork: [7, 6, 2, 1], understanding: [2, 4, 9] },
    { discipline: "Математика",    classwork: [8, 5, 3, 2], understanding: [4, 6, 7] },
    { discipline: "Физика",        classwork: [6, 4, 5, 3], understanding: [3, 5, 7] },
    { discipline: "Русский язык",  classwork: [7, 6, 2, 1], understanding: [2, 4, 9] }

  ];
  
  // Подготовка данных для графиков
  const disciplineLabels = individualTrackData.map(d => d.discipline);

  // График "Работа на занятии" (4 категории)
  const ctxIndividualClasswork = document.getElementById('chartIndividualClasswork');
  if (ctxIndividualClasswork) {
    new Chart(ctxIndividualClasswork, {
      type: 'bar',
      data: {
        labels: disciplineLabels,
        datasets: [
          { label: 'Вовлечен',                data: individualTrackData.map(d => d.classwork[0]), backgroundColor: '#4CAF50' },
          { label: 'Вовлечен с нарушением',   data: individualTrackData.map(d => d.classwork[1]), backgroundColor: '#FFC107' },
          { label: 'Не вовлечен',             data: individualTrackData.map(d => d.classwork[2]), backgroundColor: '#E91E63' },
          { label: 'Не вовлечен с нарушением',data: individualTrackData.map(d => d.classwork[3]), backgroundColor: '#9C27B0' }
        ]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  // График "Освоение материала" (3 категории)
  const ctxIndividualUnderstanding = document.getElementById('chartIndividualUnderstanding');
  if (ctxIndividualUnderstanding) {
    new Chart(ctxIndividualUnderstanding, {
      type: 'bar',
      data: {
        labels: disciplineLabels,
        datasets: [
          { label: 'Низкое',   data: individualTrackData.map(d => d.understanding[0]), backgroundColor: '#EF5350' },
          { label: 'Среднее',  data: individualTrackData.map(d => d.understanding[1]), backgroundColor: '#FFEE58' },
          { label: 'Высокое',  data: individualTrackData.map(d => d.understanding[2]), backgroundColor: '#66BB6A' }
        ]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }


  // =====================================
  // 5) Charts for "Мягкие навыки" section
  //    (sectionSoftSkills)
  // =====================================

  // Пример данных (замените на реальные)
  const softSkillsData = {
    emotionalIntelligence: [10, 5, 3, 2], // 4 категории
    leadership: [8, 6, 4, 2],            // 4 категории
    discipline: [12, 5, 3]               // 3 категории
  };

  // График "Эмоциональный интеллект"
  const ctxEmotionalIntelligence = document.getElementById('chartEmotionalIntelligence');
  if (ctxEmotionalIntelligence) {
    new Chart(ctxEmotionalIntelligence, {
      type: 'pie',
      data: {
        labels: ['Вовлечен и проявляет инициативу', 'Вовлечен с нарушением', 'Не вовлечен', 'Не вовлечен с нарушением'],
        datasets: [{
          data: softSkillsData.emotionalIntelligence,
          backgroundColor: ['#4CAF50', '#FFC107', '#E91E63', '#9C27B0']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  // График "Лидерство и стратегия"
  const ctxLeadership = document.getElementById('chartLeadership');
  if (ctxLeadership) {
    new Chart(ctxLeadership, {
      type: 'pie',
      data: {
        labels: ['Вовлечен и проявляет инициативу', 'На базовом уровне', 'Редко посещает', 'Не посещает'],
        datasets: [{
          data: softSkillsData.leadership,
          backgroundColor: ['#4CAF50', '#FFC107', '#E91E63', '#9C27B0']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  // График "Соблюдение правил поведения"
  const ctxDiscipline = document.getElementById('chartDiscipline');
  if (ctxDiscipline) {
    new Chart(ctxDiscipline, {
      type: 'bar',
      data: {
        labels: ['Нет замечаний', 'Редкие нарушения', 'Частые нарушения'],
        datasets: [{
          label: 'Количество учеников',
          data: softSkillsData.discipline,
          backgroundColor: ['#4CAF50', '#FFC107', '#E91E63']
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }


  // =====================================
  // 6) Charts for "Развитие личностных качеств"
  //    (sectionPersonalDevelopment)
  // =====================================

  // Пример данных (замените на реальные)
  const personalSkillsData = {
    labels: [
      "Самостоятельность",
      "Креативность",
      "Коммуникабельность",
      "Критическое мышление",
      "Стрессоустойчивость",
      "Умение работать в команде"
    ],
    datasets: [{
      label: "Уровень владения навыками",
      data: [4, 3, 5, 2, 4, 3], // 1-5 шкала
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2,
      pointBackgroundColor: "rgba(54, 162, 235, 1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(54, 162, 235, 1)"
    }]
  };

  // График "Развитие личностных качеств" (Radar Chart)
  const ctxPersonalSkills = document.getElementById("chartPersonalSkills");
  if (ctxPersonalSkills) {
    new Chart(ctxPersonalSkills, {
      type: "radar",
      data: personalSkillsData,
      options: {
        responsive: true,
        scales: {
          r: {
            suggestedMin: 1,
            suggestedMax: 5,
            ticks: { stepSize: 1 }
          }
        },
        plugins: { legend: { position: "bottom" } }
      }
    });
  }


  // =====================================
  // 7) Highlight active section on scroll
  // =====================================
  const sections = document.querySelectorAll("section");

  function highlightCurrentSection() {
    let scrollPosition = window.scrollY + 100; // небольшой отступ

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        sidebarLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(`#sidebarNav a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }

  window.addEventListener("scroll", highlightCurrentSection);
});
