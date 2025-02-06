document.addEventListener('DOMContentLoaded', function() {
    // Ищем все ссылки в сайдбаре, которые ведут к секциям
    const sidebarLinks = document.querySelectorAll('.nav-link[data-target]');
  
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault(); // Предотвращаем переход по умолчанию (если href="#...")
        
        const targetId = this.getAttribute('data-target');
        const targetElement = document.querySelector(targetId);
        
        // Плавная прокрутка к нужному разделу
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });
  