var $today = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];

// date and time variables
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

function startSchedule() {
    $timeBlocks.each(function() {
        var $thisBlock = $(this);
        var currentBlocksHour = parseInt($thisBlock.attr("data-hour"));

        var toDoObj = {
            hour: currentBlocksHour,
            text: "",
        }
        toDoItems.push(toDoObj);
    });

    localStorage.setItem('todos', JSON.stringify(toDoItems));
}

//function to set up the time block colors according to what time it is currently
function setUpTimeBlocks() {
    $timeBlocks.each(function(){
        var $thisBlock = $(this);
        var thisBlocksHour = parseInt($thisBlock.attr("data-hour"));

        if(thisBlocksHour == currentHour) {
            $thisBlock.addClass("present").removeClass("past future");
        }
        if (thisBlocksHour < currentHour) {
            $thisBlock.addClass("past").removeClass("present future");
        }
        if (thisBlocksHour > currentHour) {
            $thisBlock.addClass("future").removeClass("past present");
        }
    });
}

//function to render the 9-5 schedule
function renderSchedule() {
    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse(toDoItems);

    for (var i = 0; i < toDoItems.length; i++) {
        var itemsHour = toDoItems[i].hour;
        var itemsText = toDoItems[i].text;

        $("[data-hour=" + itemHour + "]").children("textarea").val(itemsText);
    }
}


function saveHandler() {
    var $thisBlock = $(this).parent();
    var hourToUpdate = $(this).parent().attr("data-hour");
    var toAdd = (($(this).parent()).children("textarea")).val();

    for (var i = 0; i < toDoItems.length; i++) {
        if (toDoItems[i].hour == hourToUpdate) {
            toDoItems[i].text = toAdd;
        }
    }
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    renderSchedule();
}

$(document).ready(function() {
    setUpTimeBlocks();
    if(!localStorage.getItem("todos")) {
        startSchedule();

        $scheduleArea.on("click", "button", saveHandler);
    }
});