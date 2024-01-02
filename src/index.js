import {generate, getParams} from "./generate.js";

function preview(event)  {
    event.preventDefault();
    const params = getParams();
    window.history.pushState({params}, null);

    const body = generate();
    document.getElementById('output').contentWindow.document.body.innerHTML = body;
    // const formData = new FormData(document.forms.generate);
    // const queryParams = new URLSearchParams(formData).toString();
    // document.getElementById('output').src = '/_generate.html?' + queryParams;
    // document.getElementById('printBtn').style.visibility = 'visible';
    document.getElementById('output').parentElement.style.visibility = 'visible';
    document.forms.generate.style.display = 'none';
}

window.addEventListener('popstate', event => {
    console.log(event);
    const params = event.state?.params;
    if (params) {
        const body = generate();
        document.getElementById('output').contentWindow.document.body.innerHTML = body;
        document.getElementById('output').parentElement.style.visibility = 'visible';
        document.forms.generate.style.display = 'none';

    } else {
        document.getElementById('output').contentWindow.document.body.innerHTML = '';
        document.getElementById('output').parentElement.style.visibility = 'hidden';
        document.forms.generate.style.display = 'block';
    }
})

function print(event) {
    event.preventDefault();
    document.getElementById('output').contentWindow.print();
}

function writePrefill() {
    const fragment = document.createDocumentFragment();
    const template = document.getElementById('prefillTemplate');
    for (let j = 8; j < 17; j++) {
        const hour = j === 12 ? 12 : j % 12;
        const el = template.content.cloneNode(true);
        el.querySelector('input').value = '' + hour;
        fragment.appendChild(el);
        for (let k = 1; k < 2; k++) {
            fragment.appendChild(template.content.cloneNode(true));
        }
    }
    document.getElementById('prefill').appendChild(fragment);
}

function init() {
    const form = document.forms.generate;
    const startDate = form.startDate;
    const endDate = form.endDate;
    const today = new Date(new Date().toDateString());
    startDate.valueAsDate = today;
    today.setMonth(today.getMonth() + 3);
    endDate.valueAsDate = today;
    writePrefill();

    document.getElementById('previewBtn').addEventListener('click', preview);
    document.getElementById('printBtn').addEventListener('click', print);
    document.getElementById('backBtn').addEventListener('click', () => {
        window.history.back();
    });
    document.getElementById('addBtn').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('prefill').appendChild(document.getElementById('prefillTemplate').content.cloneNode(true));
    });
    document.getElementById('prefill').addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.name === 'removePrefill') {
            e.target.parentElement.remove();
        }
    });
}

init();



