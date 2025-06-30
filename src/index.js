import {generate, getParams, writeQueryParams} from "./generate.js";

function preview(event) {
  event.preventDefault();
  const params = getParams();
  window.history.pushState({params}, null);

  const body = generate();
  document.getElementById('output').contentWindow.document.body.innerHTML = body;
  document.getElementById('output').parentElement.style.visibility = 'visible';
  document.forms.generate.style.display = 'none';
}

window.addEventListener('popstate', event => {
  const params = event.state?.params;
  if (params) {
    const body = generate();
    document.getElementById('output').contentWindow.document.body.innerHTML = body;
    document.getElementById('output').parentElement.style.visibility = 'visible';
    document.forms.generate.style.display = 'none';
  } else {
    window.location.reload();
  }
});

function print(event) {
  event.preventDefault();
  document.getElementById('output').contentWindow.print();
}

function writePrefill(initialValues) {
  const fragment = document.createDocumentFragment();
  const template = document.getElementById('prefillTemplate');

  if (initialValues) {
    initialValues.split(',').forEach(value => {
      const el = template.content.cloneNode(true);
      el.querySelector('input').value = value;
      fragment.appendChild(el);
    });
  } else {
    for (let j = 8; j < 17; j++) {
      const hour = j === 12 ? 12 : j % 12;
      const el = template.content.cloneNode(true);
      el.querySelector('input').value = '' + hour;
      fragment.appendChild(el);
      for (let k = 1; k < 2; k++) {
        fragment.appendChild(template.content.cloneNode(true));
      }
    }
  }

  document.getElementById('prefill').appendChild(fragment);
}

function init() {
  const queryParams = new URLSearchParams(window.location.search);
  const form = document.forms.generate;
  const startDate = form.startDate;
  const endDate = form.endDate;
  const today = new Date(new Date().toDateString());

  if (queryParams.has('startDate')) {
    startDate.value = queryParams.get('startDate');
  } else {
    startDate.valueAsDate = today;
  }

  if (queryParams.has('endDate')) {
    endDate.value = queryParams.get('endDate');
  } else {
    today.setMonth(today.getMonth() + 3);
    endDate.valueAsDate = today;
  }

  const activeDays = queryParams.has('activeDays') ? queryParams.get('activeDays').split(',').map((day) => day && day.toLowerCase() === 'true') : [false, true, true, true, true, true, false];
  form.sunday.checked = activeDays[0];
  form.monday.checked = activeDays[1];
  form.tuesday.checked = activeDays[2];
  form.wednesday.checked = activeDays[3];
  form.thursday.checked = activeDays[4];
  form.friday.checked = activeDays[5];
  form.saturday.checked = activeDays[6];

  writePrefill(queryParams.get('prefill'));

  document.getElementById('previewBtn').addEventListener('click', preview);
  document.getElementById('printBtn').addEventListener('click', print);
  document.getElementById('backBtn').addEventListener('click', () => {
    window.history.back();
  });
  document.getElementById('addBtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('prefill').appendChild(document.getElementById('prefillTemplate').content.cloneNode(true));
    writeQueryParams();
  });
  document.getElementById('prefill').addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.name === 'removePrefill') {
      e.target.parentElement.remove();
      writeQueryParams();
    }
  });
  document.getElementById('resetBtn').addEventListener('click', (e) => {
    e.preventDefault();
    window.history.pushState({}, null, window.location.pathname);
    window.location.reload();
  });
  document.querySelectorAll('input').forEach(el => {
    el.addEventListener('input', (e) => {
      writeQueryParams();
    });
  });
}

init();



