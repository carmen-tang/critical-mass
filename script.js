document.addEventListener('DOMContentLoaded', () => {
  const titlesEl    = document.querySelector('.nav-titles');
  const indicator   = document.getElementById('selectedIndicator');
  const dateDisplay = document.getElementById('dateDisplay');
  const timeDisplay = document.getElementById('timeDisplay');
  let activeBtn, timeInterval;

  const tzMap = {
    cupertino:       'America/Los_Angeles',
    'new-york-city': 'America/New_York',
    london:          'Europe/London',
    amsterdam:       'Europe/Amsterdam',
    tokyo:           'Asia/Tokyo',
    'hong-kong':     'Asia/Hong_Kong',
    sydney:          'Australia/Sydney'
  };

  function moveIndicator(btn) {
    const { left: bL, width: bW } = btn.getBoundingClientRect();
    const { left: pL }            = titlesEl.getBoundingClientRect();
    indicator.style.width     = `${bW}px`;
    indicator.style.transform = `translateX(${bL - pL}px)`;
  }

  function activateButton(btn) {
    titlesEl
      .querySelectorAll('.nav-title.active')
      .forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
  }

  // now updates both date & time
  function startClock(tz, cityName) {
    clearInterval(timeInterval);

    function update() {
      const now = new Date();

      const dateFmt = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month:   'long',
        day:     'numeric',
        year:    'numeric',
        timeZone: tz
      });
      dateDisplay.textContent = dateFmt.format(now);

      // **only hour & minute, 12-hour clock with AM/PM**
      const timeFmt = new Intl.DateTimeFormat('en-US', {
        hour:   'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: tz
      });
      timeDisplay.textContent = `It is ${timeFmt.format(now)} in ${cityName}`;
    }

    update();

    // then update once a minute
    timeInterval = setInterval(update, 60_000);
  }

  fetch('navigation.json')
    .then(r => r.json())
    .then(data => {
      const { cities } = data;
      if (!Array.isArray(cities)) throw new Error('Expected cities array');

      cities.forEach((city, i) => {
        const btn = document.createElement('button');
        btn.className   = 'nav-title';
        btn.textContent = city.label;
        titlesEl.appendChild(btn);

        if (i === 0) {
          activeBtn = btn;
          btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
          activateButton(btn);
          moveIndicator(btn);
          activeBtn = btn;
          const tz = tzMap[city.section];
          if (tz) startClock(tz, city.label);
        });
      });

      // once layout settles, position indicator & start default clock
      requestAnimationFrame(() => {
        if (activeBtn) {
          moveIndicator(activeBtn);
          startClock(tzMap[cities[0].section], cities[0].label);
        }
      });
    })
    .catch(console.error);

  // keep the indicator aligned on resize
  window.addEventListener('resize', () => {
    if (activeBtn) moveIndicator(activeBtn);
  });
});
