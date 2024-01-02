const DAY = 1000 * 60 * 60 * 24;
const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export const getParams = () => {
    const form = document.forms.generate;
    const startDate = new Date(`${form.startDate.value}T00:00:00`);
    const endDate = new Date(`${form.endDate.value}T00:00:00`);
    const prefill = [];
    form.prefill?.forEach(input => {
        prefill.push(input.value);
    });
    return {startDate, endDate, prefill};
};

export const generate = () => {
    const {startDate, endDate, prefill} = getParams();

    const numDays = Math.round((endDate.getTime() - startDate.getTime()) / DAY);
    const numLines = prefill.length;
    const lineHeight = 8.5 / numLines;
    // const line = `<div class="line" style="height: ${lineHeight}in"></div>`;

    let body = '';
    for (let i = 0; i < numDays + 1; i++) {
        const day = new Date(startDate.getTime() + DAY * i);
        const title = `<div class="title">${DAYS[day.getDay()]}, ${MONTHS[day.getMonth()]} ${day.getDate()}</div>`;

        const hours = prefill.map(txt => {
return `<div class="line" style="height: ${lineHeight}in"><div class="txt">${txt}</div></div>`;
        });
        // for (let j = startTime; j < endTime; j++) {
        //     const hour = j === 12 ? 12 : j % 12;
        //     // const hourWith0 = hour < 10 ? '0' + hour : hour;
        //     // const ampm = j < 12 ? 'AM' : 'PM';
        //     const time = hour;
        //     hours.push(`<div class="line" style="height: ${lineHeight}in"><div class="txt">${hour}</div></div>`);
        //     for (let k = 1; k < linesPerHour; k++) {
        //         hours.push(`<div class="line" style="height: ${lineHeight}in"></div>`);
        //     }
        // }

        const page = `<div class="page">${title}${hours.join('')}</div>`;
        body += page;

    }

    return body;
};


