var scheduleArea = $(".schedule");
var currentDay = $('#currentDay');
var timeBlocks = $('.time-block');
var toDoItems = {};

// Setting time using momentjs
var currentDate = moment().format("dddd, MMM Do");
var currentHour = moment().format("H");

// Inputs Current Day
currentDay.text(currentDate);

// On click of save button, info is saved to local storage
$('button').on('click', function(){
    var time = $(this).closest('div').find('.hour').text();
    var note = $(this).closest('div').find('.note').val();
    toDoItems[time] = note;
    saveToLocalStorage();
});

// Save to Local Storage
function saveToLocalStorage(){
    localStorage.setItem('toDos', JSON.stringify(toDoItems));
};

// Applies class to each time block
function setUpTimeBlocks(){
    timeBlocks.each(function(){
        var thisBlock = $(this);
        var thisBlockHr = parseInt(thisBlock.attr('data-hour'));

        if(thisBlockHr == currentHour){
            thisBlock.addClass('present').removeClass('past future');
        } 
        
        if(thisBlockHr < currentHour){
            thisBlock.addClass('past').removeClass('present future');
        }

        if(thisBlockHr > currentHour){
            thisBlock.addClass('future').removeClass('past present');
        }
    });
};

// Pulls local storage and applies into time blocks
function generateSchedule(){
    toDoItems = JSON.parse(localStorage.getItem('toDos'));
    if(!toDoItems){
        toDoItems = {}
    }
    $.each(toDoItems, function(key, value){
        var hour = key;
        var note = value;
        var hourElement = timeBlocks.find('.hour').filter(function(){
            return $(this).text() === hour;
        });
        var hourNote = hourElement.siblings('.note');
        hourNote.val(note);
    });
};

setUpTimeBlocks();
generateSchedule();