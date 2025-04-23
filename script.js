document.addEventListener('DOMContentLoaded', () => {
  const titlesEl  = document.querySelector('.nav-titles');
  const indicator = document.getElementById('selectedIndicator');
  let activeBtn;

  function moveIndicator(btn) {
    const btnRect    = btn.getBoundingClientRect();
    const parentRect = titlesEl.getBoundingClientRect();
    const offset     = btnRect.left - parentRect.left;
    indicator.style.width     = `${btnRect.width}px`;
    indicator.style.transform = `translateX(${offset}px)`;
  }

  function activateButton(btn) {
    titlesEl
      .querySelectorAll('.nav-title.active')
      .forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
  }

  fetch('navigation.json')
    .then(res => res.json())
    .then(data => {
      const { cities } = data;
      if (!Array.isArray(cities)) throw new Error('Expected data.cities to be an array');

      cities.forEach((city, i) => {
        const btn = document.createElement('button');
        btn.className   = 'nav-title';
        btn.textContent = city.label;
        titlesEl.appendChild(btn);

        // make the very first button active immediately
        if (i === 0) {
          activeBtn = btn;
          btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
          activateButton(btn);
          activeBtn = btn;
          moveIndicator(btn);
        });

        // mark the first one active
        if (i === 0) activeBtn = btn;
      });

      // 2) once all buttons are appended, wait for the next paint
      //    so that justify-content:center is applied, then position
      requestAnimationFrame(() => {
        if (activeBtn) moveIndicator(activeBtn);
      });
    })
    .catch(err => console.error(err));

  // 3) keep it in place on resize
  window.addEventListener('resize', () => {
    if (activeBtn) moveIndicator(activeBtn);
  });
});

