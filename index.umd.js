const form = document.forms.generate;
const startDate = form.startDate;
const endDate = form.endDate;
const today = new Date(new Date().toDateString());
startDate.valueAsDate = today;
today.setMonth(today.getMonth() + 3);
endDate.valueAsDate = today;

// function generate()  {
//     alert('gen');
//     // window.open(`/generate.html?start=${startDate.value}&end=${endDate.value}`, '_blank');
//     return false;
// };


