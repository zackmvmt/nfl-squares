$(function() {

  // $.get('/api/users', function(data) {
  //   console.log('users', data);
  // });

	nextPage = function() {
		$('.content').animate({ 'margin-left': '-=800' }, 500);
	};
	prevPage = function() {
		$('.content').animate({ 'margin-left': '+=800' }, 500);
	};
	$('.pick-squares-btn').on('click', nextPage);
	$('.start-game-btn').on('click', nextPage);
	$('.settings-btn').on('click', prevPage);

	// setUpdateInterval();
});

var updateInterval = null;
function setUpdateInterval(){
	updateInterval = setInterval(fetchGameData, (1000*60)*5); // every 5 mins, update
}

var gameData = {};

function fetchGameData(){

	$.ajax({
		url: "/api/game",
		cache: false,
		type: 'GET',

	}).done(function(data){
		// console.log(data);
		gameData = data;
	}).error(function(err){
		// console.error(err);
		if(err.status === 503){
			console.log("Game doesn't exist yet on NFL servers");
		}
	});
}