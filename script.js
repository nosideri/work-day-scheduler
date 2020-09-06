var $today = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];

// date and time variables
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

function initializeSchedule() {
    $timeBlocks.each(function() {
        var $thisBlock = $(this);
        var currentBlocksHour = parseInt($thisBlock.attr("data-hour"));

        var toDoObj = {
            hour: currentBlocksHour,
            text: "",
        }
        toDoItems.push(toDoObj);
    });
}