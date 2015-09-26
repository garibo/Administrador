function renderTime() {
    setTimeout('renderTime()',1000);
    moment.locale('es');
    var momento = moment().format('h:mm:ss a');
    var myClock = document.getElementById('clockDisplay');
    myClock.textContent = momento;
    myClock.innerText = momento;

    var momento = moment().format('MMMM YYYY');
    var myYear = document.getElementById('year');
    myYear.textContent = momento;
    myYear.innerText = momento;

    var momento = moment().format('YYYY, dddd');
    var myMonth = document.getElementById('month');
    myMonth.textContent = momento;
    myMonth.innerText = momento;
}
renderTime();
