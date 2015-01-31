$(function() {

  // $.get('/api/users', function(data) {
  //   console.log('users', data);
  // });

	loadLocalStorage();

	nextPage = function() {
		$('.content').animate({ 'margin-left': '-=800' }, 500);
	};
	prevPage = function() {
		$('.content').animate({ 'margin-left': '+=800' }, 500);
	};

	/////// EVENTS
	// Nav
	$('.pick-squares-btn').on('click', nextPage);
	$('.start-game-btn').on('click', nextPage);
	$('.settings-btn').on('click', prevPage);
	// Settings
	$('.pps').on('change', function(e){
		info.config.costPerSq = $(e.currentTarget).val();
	});



	// setUpdateInterval();
	window.onbeforeunload = beforeUnload;
});

var info = {
	players: [],
	squares: {},
	config: {
		costPerSq: 0,
		locked: false
	}
};

var updateInterval = null;
function setUpdateInterval(){
	updateInterval = setInterval(fetchGameData, (1000*60)*5); // every 5 mins, update
}

var gameData = {};

function beforeUnload() {
	// saveLocalStorage();



	return null; // any non-void return will create an alert to the user
}

function loadLocalStorage(){

}

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