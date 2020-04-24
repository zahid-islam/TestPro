let startDateTime = new Date("2019-08-31 08:59:13 am").getTime();
let endDateTime = new Date("2019-08-31 09:00:39 am").getTime();

let tempStartDateTime = startDateTime;

// Peak hour start time 9.00.00 am equals in milisecond
let peakHourStart = 32400000;
// Peak hour end time 10.59.59 pm equals in milisecond
let peakHourEnd = 82799000;

let breakDownCount = 0;

function calculateMobileBill(){
    let mobileBill = 0;
    breakDownCount = Math.ceil((endDateTime - startDateTime) / (1000 * 20));
    for(let i = 1; i <= breakDownCount; i++){
      let eachBreakdownEndDateTime = (tempStartDateTime + 20000);

      // Extract only time from temporary start date-time in milisecond
      // The reasone is compare between peak hour time 
      let tempStartOnlyTime = (new Date(tempStartDateTime).getHours() * 60 * 60 * 1000 + 
        new Date(tempStartDateTime).getMinutes() * 60 * 1000 + new Date(tempStartDateTime).getSeconds() * 1000);

      // Extract only time from each breakdown end date-time in milisecond
      // The reasone is compare between peak hour time 
      let tempBreakdownEndOnlyTime = (new Date(eachBreakdownEndDateTime).getHours() * 60 * 60 * 1000 + 
        new Date(eachBreakdownEndDateTime).getMinutes() * 60 * 1000 + new Date(eachBreakdownEndDateTime).getSeconds() * 1000);
      
      // Calculate mobile bill by finding pulse rate 
      // If start or end time of a breakdown exist between peak hour the rate is .30
      if((tempStartOnlyTime >= peakHourStart && tempStartOnlyTime <= peakHourEnd) || 
          (tempBreakdownEndOnlyTime >= peakHourStart && tempBreakdownEndOnlyTime <= peakHourEnd)){
          mobileBill = mobileBill + .3;
      }
      else{
        mobileBill = mobileBill + .2;
      }

      // Update temporary start date-time by current breakdown's end date-time
      tempStartDateTime = eachBreakdownEndDateTime;
    }
    return mobileBill;
}

let totalMobileBill = calculateMobileBill() + ' Taka';
console.log(totalMobileBill);