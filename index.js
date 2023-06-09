// Your code here

function createEmployeeRecord(employeeArray){
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents:  [],
        timeOutEvents:  []
    }
}

  function createEmployeeRecords(arrayOfArray){
    return arrayOfArray.map((array) => createEmployeeRecord(array));
  }


 function createTimeInEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(" ");

  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date,
  });

  return employeeRecord;
}

function createTimeOutEvent(object, dateStamp){
  const [date, hour] = dateStamp.split(" ");

  object.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,


  })
return object;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
  const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

  if (!timeInEvent || !timeOutEvent) {
    return 0; 
  }

  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date){
 const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
 const payRate = employeeRecord.payPerHour;
 const payOwed = hoursWorked * payRate;

 return payOwed;
}

function allWagesFor(employeeRecord) {
  const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  const totalWages = datesWorked.reduce((total, date) => {
    const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
    return total + wagesEarned;
  }, 0);
  return totalWages;
}


function calculatePayroll(employeeRecords) {
  const totalPayroll = employeeRecords.reduce((total, employee) => {
    const wages = allWagesFor(employee);
    return total + wages;
  }, 0);
  return totalPayroll;
}







//   const newEmployeeArray = []
//     arrayOfArray.forEach((array)=>{
//         const newEmployee = createEmployeeRecord(array);
        
//          newEmployeeArray.push(newEmployee)
    
//     })
//     return newEmployeeArray;