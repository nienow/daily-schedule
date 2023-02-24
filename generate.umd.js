const DAY = 1000 * 60 * 60 * 24;
var DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const params = new URLSearchParams(window.location.search);


const startDate = new Date(`${params.get('startDate')}T00:00:00`);
const endDate = new Date(`${params.get('endDate')}T00:00:00`);
const startTime = Number(params.get('startTime'));
const endTime = Number(params.get('endTime'));
const linesPerHour = Number(params.get('lines') || 2);

const numDays = Math.round((endDate.getTime() - startDate.getTime()) / DAY);
const numHours = endTime - startTime;
const numLines = numHours * linesPerHour;
const lineHeight = 8.5 / numLines;
const line = `<div class="line" style="height: ${lineHeight}in"></div>`;

let body = '';
for (let i = 0; i < numDays + 1; i++) {
    const day = new Date(startDate.getTime() + DAY * i);
    const title = `<div class="title">${DAYS[day.getDay()]}, ${MONTHS[day.getMonth()]} ${day.getDate()}</div>`;

    const hours = [];
    for (let j = startTime; j < endTime; j++) {
        const hour = j === 12 ? 12 : j % 12;
        // const hourWith0 = hour < 10 ? '0' + hour : hour;
        // const ampm = j < 12 ? 'AM' : 'PM';
        const time = hour;
        hours.push(`<div class="hour">
            <div class="time">${time}</div>
            ${line}
        </div>`);
        for (let k = 1; k < linesPerHour; k++) {
            hours.push(`<div class="hour">
                <div class="time"></div>
                ${line}
            </div>`);
        }
    }

    const page = `<div class="page">${title}${hours.join('')}</div>`;
    body += page;

}

document.getElementById('output').innerHTML = body;


function print() {
    var prtContent = document.getElementById('output');
    var WinPrint = window.open('', '', 'toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
}

