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

	fetchGameData();

});

var gameData = {};

function fetchGameData(){

	$.ajax({
		url: "/api/game",
		cache: false,
		type: 'GET',

	}).done(function(data){
		console.log(data);
	}).error(function(err){
		console.error(err);
	})
}