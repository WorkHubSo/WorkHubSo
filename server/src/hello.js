function monthly_paid(money, arr) {
    console.log('arr', arr);
    const fridays_in_month = parseInt(arr[0])
    const days_in_month = parseInt(arr[1])
    const per_monthly = days_in_month - fridays_in_month
    console.log('monthly days', per_monthly);
    const day_income = money / per_monthly
    const weekly_icome = day_income * 6
    const monthly_icome = day_income * per_monthly
    const year_income = monthly_icome * 12
    console.log(`day_income : ${day_income}`);
    console.log(`weekly_icome : ${weekly_icome}`);
    console.log(`monthly_income : ${monthly_icome.toFixed(2)}`);
    console.log(`year_income : ${year_income.toFixed(2)}`);
}


function countFridaysInMonth(year, month) {

    const currentDate = new Date(year, month);

    console.log('currendate : ', currentDate);

    const daysInMonth = new Date(year, month, 0).getDate();

    console.log('daysInMonth : ', daysInMonth);

    let fridaysCount = 0;

    for (let day = 1; day <= daysInMonth; day++) {

        currentDate.setDate(day);

        if (currentDate.getDay() === 5) {

            fridaysCount++;

            console.log('fridayCount', fridaysCount);

        }
    }
    const count_days_in_month = [fridaysCount, daysInMonth]

    return count_days_in_month;
}


var number_of_fridays_in_month = countFridaysInMonth(2023, 10);

monthly_paid(435, number_of_fridays_in_month);



// function validate_monthly(arr) {
//     const start_date_string = '2023-10-01';
//     const end_date_string = '2023-10-31';
//     let current_date = ''
//     if (end_date_string.substring(8, 10) == 31) {
//         current_date = end_date_string.substring(0, 8) + 31
//         console.log(`month completed : ${end_date_string.substring(8, 10)}\ncurrent_date: ${current_date}`);
//     } else
//     if (end_date_string.substring(8, 10) == 30) {
//         current_date = end_date_string.substring(0, 8) + 30
//         console.log(`month completed : ${end_date_string.substring(8, 10)}\ncurrent_date: ${current_date}`);
//     } else if (end_date_string.substring(8, 10) == 29) {
//         current_date = end_date_string.substring(0, 8) + 29
//         console.log(`month completed : ${end_date_string.substring(8, 10)}\ncurrent_date: ${current_date}`);
//     } else if (end_date_string.substring(8, 10) == 28) {
//         current_date = end_date_string.substring(0, 8) + 28
//         console.log(`month completed : ${end_date_string.substring(8, 10)}\ncurrent_date: ${current_date}`);
//     } else {
//         console.log('invalid date');
//     }
//     console.log(start_date_string, current_date);
//     monthly_paid(435, start_date_string, end_date_string);
// }