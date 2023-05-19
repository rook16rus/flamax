import {Timer} from "../libs/easytimer";

export default function timer() {
  const containers = document.querySelectorAll('.js-init-timer');
  containers.forEach(container => {
    const $days = container.querySelector('.js-days');
    const $hours = container.querySelector('.js-hours');
    const $minutes = container.querySelector('.js-minutes');

    if (!container.dataset.date && !$days && !$hours && !$minutes) return;

    const target = new Date(container.dataset.date).getTime();
    const now = new Date().getTime();

    if (target <= now) return;

    const diff = target - now;

    const timer = new Timer();
    timer.start({
      countdown: true,
      startValues: {
        minutes: Math.ceil(diff / (1000 * 60))
      },
      callback: function (timer) {
        container.style.opacity = 1;
        const values = timer.getTimeValues();
        $days.textContent = values.days
        $hours.textContent = values.hours
        $minutes.textContent = values.minutes
      }
    });
  })
}
