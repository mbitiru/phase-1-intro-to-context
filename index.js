// createEmployeeREcord returning firstName, familyName,title,payPerHour,timeInEvents,timeOutEvents
let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}
let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}
//createTimeInEvent
function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}
//createTimeOutEvent
function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}
//create function for hoursWorkedOnDate
function hoursWorkedOnDate(employee, dateData) {
    let timeIn = employee.timeInEvents.find(function(e) {
        return e.date === dateData
    })

    let timeOut = employee.timeOutEvents.find(function(e) {
        return e.date === dateData
    })
    return (timeOut.hour - timeIn.hour) * .01
}
//create function for wagesEarnedOnDate
function wagesEarnedOnDate(employee, datedata) {
    let wage = hoursWorkedOnDate(employee, datedata) *
        employee.payPerHour
    return parseFloat(wage.toString())
}
// create function allWagesFor(employee)
function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(function(e) {
        return e.date
    })

    let wages = dates.reduce(function(arr, d) {
        return arr + wagesEarnedOnDate(employee, d)
    }, 0)
    return wages
}
//return array.find and record.firstName
let findEmployeeByFirstName = function(array, firstName) {
    return array.find(function(record) {
        return record.firstName === firstName
    })
}
//return employeeData,reduce(),elem + allWagesFor()
function calculatePayroll(employeeData) {
    return employeeData.reduce(function(elem, record) {
        return elem + allWagesFor(record)
    }, 0)
}
    