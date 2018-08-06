/*1 search*/

var UI = {};

UI.EnterPress = function(){

	document.querySelector('.js-search').addEventListener('keyup', function(e){

		var input = document.querySelector('input').value;//grabs the value or what user inputs in search bar
		//if user presses enter. if event(e) and which one, 13 which is enter
		if(e.which === 13) {
			//pushToDOM(input);
			SoundCloudApi.getTrack(input);
		}	
	});
};

UI.EnterPress();

UI.SumbitClick = function(){
	document.querySelector('.js-submit').addEventListener('click', function(){
		var input = document.querySelector('input').value;
		SoundCloudApi.getTrack(input);

	});
};

UI.SumbitClick();

/*2 Query Soundcloud api*/

//acts as  a class but is called an object in javascript

// to create the SC object
var SoundCloudApi = {};

SoundCloudApi.init = function(){
	SC.initialize({
		client_id: '340f063c670272fac27cfa67bffcafc4'
	});
}

SoundCloudApi.init();

//to get a track

SoundCloudApi.getTrack = function(inputValue){
	SC.get('/tracks', {
	  q: inputValue
	}).then(function(tracks) {
	  console.log(tracks);
	  SoundCloudApi.renderTracks(tracks);
	});

	// SC.stream('/tracks/268562411').then(function(player){
	// 	player.play();
	//   });

}

UI.prettyTime = function(str){
	const min = Math.floor(str/60000) 
	const sec = Math.floor(str/1000 % 60)

	return min + ':' + (sec.toString().length === 1 ? '0' + sec : sec)
}
// the tracks are presented as cards
SoundCloudApi.renderTracks = function(tracks){

	var searchResults = document.querySelector('.js-search-results');
	searchResults.innerHTML = '';
	
	tracks.forEach(function(track){

		let card = `<div class="col-xs-12 col-sm-6 col-md-4">
						<div class="image-flip" ontouchstart="this.classList.toggle('hover');">
							<div class="mainflip">
								<div class="frontside">
									<div class="card">
										<div class="card-body text-center">
											<p><img class=" img-fluid" src=${track.artwork_url || 'https://i1.sndcdn.com/avatars-000131869186-my9qya-t500x500.jpg'} alt="card image"></p>
											<h4 class="card-title">${track.title}</h4>
											<p class="card-text">${track.genre || 'pop'}</p>
											<p class="card-text">Track duration: ${UI.prettyTime(track.duration)} </p>
										</div>
									</div>
								</div>
								<div class="backside">
									<div class="card">
										<div class="card-body text-center mt-4">
											<h4 class="card-title">${track.title}</h4>
											<p class="card-text">This is basic card.</p>
											<ul class="list-inline">
												<li class="list-inline-item">
													<a href="#" class="btn btn-primary btn-sm play-button" id="${track.permalink_url}"><i class="fa fa-plus"></i></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>`
				
		//var searchResults = document.querySelector('.js-search-results');
		searchResults.insertAdjacentHTML('beforeend', card);		
	});	

	Array.from(document.getElementsByClassName("play-button")).forEach(function(node) {
		node.addEventListener('click', function(){
			SoundCloudApi.getEmbed(node.id);
		});
	});

};



/*4 Add to playlist and play*/



SoundCloudApi.getEmbed =  function(trackURL){
	console.log("click inside embed");
	SC.oEmbed(trackURL, {
	  auto_play: true,
	  maxheight: 100,
	}).then(function(embed){
	  console.log('oEmbed response: ', embed);


	  var playerDiv = document.querySelector('.player');
	  playerDiv.innerHTML = ''
	  
	  var box = document.createElement('div');
	  box.innerHTML = embed.html;

	  playerDiv.insertBefore(box, playerDiv.firstChild);
	});
}








