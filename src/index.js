function preview(event)  {
    event.preventDefault();
    const formData = new FormData(document.forms.generate);
    const queryParams = new URLSearchParams(formData).toString();
    document.getElementById('output').src = '/tools/print-schedule/_generate.html?' + queryParams;
    document.getElementById('printBtn').style.visibility = 'visible';
}

function print(event) {
    event.preventDefault();
    document.getElementById('output').contentWindow.print();
}

function init() {
    const form = document.forms.generate;
    const startDate = form.startDate;
    const endDate = form.endDate;
    const today = new Date(new Date().toDateString());
    startDate.valueAsDate = today;
    today.setMonth(today.getMonth() + 3);
    endDate.valueAsDate = today;

    document.getElementById('previewBtn').addEventListener('click', preview);
    document.getElementById('printBtn').addEventListener('click', print);
}

init();



