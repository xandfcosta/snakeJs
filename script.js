$("#board").width($("body").innerWidth() * 0.8);
$("#board").height($("body").innerHeight() * 0.8);

canvas_context = $("#board")[0].getContext("2d");
canvas_context.fillStyle = "gray";
canvas_context.fillRect(0, 0, $("#board").innerWidth(), $("#board").innerHeight());
