var medicineNumber = 0, oldMedicineNumber = 0, fromDate, toDate;

$(function() {
  // get current date
  var currDate = new Date();

  // Set up calendar for "Prescription from"
  $('#datetimepicker1').datetimepicker({
    format: 'DD MMM YYYY',
    inline: true,
    minDate: currDate
  });
  fromDate = $('#datetimepicker1').data("DateTimePicker").date();

  // Set up calendar for "Prescription to"
  $('#datetimepicker2').datetimepicker({
    format: 'DD MMM YYYY',
    inline: true,
    minDate: fromDate
  });
  toDate = $('#datetimepicker2').data("DateTimePicker").date();

  // Get parent elements of calendars
  var fromDateParent = $('#datetimepicker1').parent();
  var toDateParent = $('#datetimepicker2').parent();

  // Update if change in FROM date
  fromDateParent.on('dp.change', function(e) {
    fromDate = e.date;

    // modify minimum date for TO calendar according to value from FROM calendar
    $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
  });

  // Update if change in TO date
  toDateParent.on('dp.change', function(e) {
    toDate = e.date;
  });
});

function countMedicine() {
  // get updated number of medicines
  medicineNumber = $('.selectpicker').selectpicker('val');

  if(medicineNumber === 'Select') {
    medicineNumber = 0;
  }
  medicineNumber = parseInt(medicineNumber);
  oldMedicineNumber = parseInt(oldMedicineNumber);

  // Toggle hidden class
  if (medicineNumber !== 1 && medicineNumber !== 2 && medicineNumber !== 3) {
    $('.medicine-container').addClass('hidden');
    for (var i = 3; i > 0; i--) {
      $('#medicineName' + i).remove();
      $('#dosageTime' + i).addClass('hidden');
      $('#dosageQuantity' + i).addClass('hidden');
    }
  }
  else {
    $('.medicine-container').removeClass('hidden');
  }

  // if current medicine number is more than previous than add input element otherwise remove
  if(medicineNumber < oldMedicineNumber) {
    //remove old input boxes and hide corresponding fields
    for (var i = oldMedicineNumber; i > medicineNumber; i--) {
      $('#medicineName' + i).remove();
      $('#dosageTime' + i).addClass('hidden');
      $('#dosageQuantity' + i).addClass('hidden');
    }
  }
  else {
    // add new input fields according to the new medicine number and make the corresponding fields visible
    for (var i = oldMedicineNumber; i < medicineNumber; i++) {
      $('.medicine-container').append('<div class="col-sm-4" name="medicineName' + (i+1) + '" id="medicineName' + (i+1) + '"><input type="text" class="form-control medicine-input" placeholder="Medicine Name ' + (i+1) + '"></div>');
      $('#dosageTime' + (i+1)).removeClass('hidden');
      $('#dosageQuantity' + (i+1)).removeClass('hidden');
    }
  }

  // update old medicine number for deletion in next iteration
  oldMedicineNumber = medicineNumber;
}
