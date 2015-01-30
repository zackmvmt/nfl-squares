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
  
});