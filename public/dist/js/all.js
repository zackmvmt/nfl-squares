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
	$('#pps').on('change', updatePrice);
	// $('.pps').on('change', console.log);
	$('.option .player-list').on('change', 'li .num input', updateSquareCount);
	$('.add-player-btn').on('click', addPlayer);
	$('.option .player-list').on('change', 'li input', updatePlayerInfo);


	// setUpdateInterval();
	window.onbeforeunload = beforeUnload;
	loadLocalStorage();
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

function updatePlayerInfo(){
	// this is dirty
	$('.player-list li').each(function(index, el){
		$el = $(el);
		var name = $el.find('.name').val();
		var sqCount = $el.find('.num-squares').val();

		if(name && sqCount){
			info.players[index] = {
				name: name,
				sqCount: sqCount
			}
		}
	});

}

function addPlayer(event, playerDetails){
	var html = "<li><input class='name'><div class='num'><input class='num-squares' type='number'><span> Squares</span></div></li>"

	var $player = $(html);

	if(playerDetails){
		console.log('has details');
		$player.find('.name').val(playerDetails.name);
		$player.find('.num-squares').val(playerDetails.sqCount);
		$player.insertBefore('.player-list li.blank');
	}
	else {
		console.log('no details');
		$player.appendTo('.player-list');
	}
}

function updateSquareCount(){
	updatePlayerInfo();
	var sqDibbed = 0;
	$('.num input').each(function(index, el){
		sqDibbed += parseInt($(el).val());
	});

	$('.squares-remaining').text((100-sqDibbed));

	updatePayouts();
}

function updatePrice(e){
	console.log('in here');
	info.config.costPerSq = $(e.currentTarget).val();
	updatePayouts();
}

function updatePayouts(){
	var poolTotal = info.config.costPerSq * (100 - $('.squares-remaining').text());

	var payoutPercents = [0.15, 0.30, 0.15, 0.40];

	$('.payouts li span').each(function(index, spanEl){
		var payout = poolTotal * payoutPercents[index];
		payout = Math.round(payout * 100) / 100;
		$(spanEl).text('$' + payout);
	});
}

function loadLocalStorage(){

	// $('li.blank').removeClass('blank');
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