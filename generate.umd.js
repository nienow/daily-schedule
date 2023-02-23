const DAY = 1000 * 60 * 60 * 24;
var DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function generate(options = {}) {
    const doc = new window.jspdf.default({format: 'letter'});
    doc.setFont({fontWeight: 'bold'});
    doc.setFontSize(32);
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    const startDate = new Date('2023-01-01T00:00:00');
    const endDate = new Date('2023-02-01T00:00:00');
    const startTime = 8;
    const endTime = 17;

    const numDays = Math.round((endDate.getTime() - startDate.getTime()) / DAY);
    // doc.save("a4.pdf");

    for (let i = 0; i < numDays; i++) {
        const day = new Date(startDate.getTime() + DAY * i);
        const title = `${DAYS[day.getDay()]}, ${MONTHS[day.getMonth()]} ${day.getDate()}`;
        doc.text(title, pageWidth / 2, 25, {align: 'center'});
        doc.addPage('letter');
    }

    const output = doc.output('datauristring');
    document.getElementById('output').src = output + '#toolbar=0&navpanes=0';
}


