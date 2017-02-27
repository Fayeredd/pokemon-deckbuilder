/**
 * 
 */

angular.module("PokeModule").filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});

angular.module("PokeModule").controller("PokeController",['preloadService','filterFilter','$log','$scope', function(preloadService,filterFilter,$log,$scope){

	var pokeData = this;
	
	pokeData.search = [];
	
	pokeData.itemsPerPage = 20;
	pokeData.currentPage = 1;
	pokeData.setPage = function (pageNo) {
		pokeData.currentPage = pageNo;
	  };

	  pokeData.pageChanged = function() {
	    $log.log('Page changed to: ' + pokeData.currentPage);
	  };
	
	pokeData.maxSize = 5;
	  
	pokeData.pokemonCards = preloadService.preload("pokemon");
	pokeData.trainerCards = preloadService.preload("trainer");
	pokeData.energyCards = preloadService.preload("energy");
	
	pokeData.deck = {
		deckCount : 0,
		deckMax : 60,
		cards : []
	};
	
	pokeData.getPokemonByName=(function(input){
		var card = [];
		if(typeof input === "string"){
			console.log(input);
			for(i=0;i<pokeData.pokemonCards.length;i++){
				if(pokeData.pokemonCards[i].name === input){
					card.push(pokeData.pokemonCards[i]);
				}
			}
			pokeData.search = card;
			console.log(card);
		} else {
			var supertype = input.supertype;
			if(supertype.includes("Pok")){
				console.log(supertype);
				console.log(input);
				for(i=0;i<pokeData.pokemonCards.length;i++){
					if(pokeData.pokemonCards[i].name === input.name){
						card.push(pokeData.pokemonCards[i]);
					}
				}
				pokeData.search = card;
				console.log(card);
			}
		}
	});
	
	pokeData.getUniquePokemon=(function(){
		var pokeList = [];
		var localIndeces = [];
		for(i=0;i<pokeData.pokemonCards.length;i++){
			if(localIndeces.indexOf(pokeData.pokemonCards[i].nationalPokedexNumber) === -1){
				localIndeces.push(pokeData.pokemonCards[i].nationalPokedexNumber);
				pokeList.push(pokeData.pokemonCards[i]);
			}
		}
		pokeList.sort(function(a,b){
			var x = a.nationalPokedexNumber;
			var y = b.nationalPokedexNumber;
			return ((x<y) ? -1 : ((x>y) ? 1 : 0));
		});
		
		pokeData.pageCount = function(){
			return Math.ceil(pokeList.length / pokeData.itemsPerPage);
		}
		pokeData.totalItems = pokeList.length;
		pokeData.search = pokeList;
	});
	
	pokeData.getTrainers=(function(){
		var trainerList = [];
		var localNames = [];
		for(i=0;i<pokeData.trainerCards.length;i++){
			if(localNames.indexOf(pokeData.trainerCards[i].name) === -1){
				localNames.push(pokeData.trainerCards[i].name);
				trainerList.push(pokeData.trainerCards[i]);
			}
		}
		trainerList.sort(function(a,b){
			var x = a.id;
			var y = b.id;
			return ((x<y) ? -1 : ((x>y) ? 1 : 0));
		});
		
		pokeData.pageCount = function(){
			return Math.ceil(trainerList.length / pokeData.itemsPerPage);
		}
		pokeData.totalItems = trainerList.length;
		pokeData.search = trainerList;
	});
	
	pokeData.getEnergy=(function(){
		var energyList = [];
		var localNames = [];
		for(i=0;i<pokeData.energyCards.length;i++){
			if(localNames.indexOf(pokeData.energyCards[i].name) === -1){
				if(!pokeData.energyCards[i].name.toString().includes("Basic") && !pokeData.energyCards[i].attacks){
					localNames.push(pokeData.energyCards[i].name);
					energyList.push(pokeData.energyCards[i]);
				}
			}
		}
		energyList.sort(function(a,b){
			var x = a.id;
			var y = b.id;
			return ((x<y) ? -1 : ((x>y) ? 1 : 0));
		});
		energyList.sort(function(a,b){
			var x = a.subtype;
			var y = b.subtype;
			return ((x<y) ? -1 : ((x>y) ? 1 : 0));
		});
		
		pokeData.pageCount = function(){
			return Math.ceil(energyList.length / pokeData.itemsPerPage);
		}
		pokeData.totalItems = energyList.length;
		pokeData.search = energyList;
	});
	
	pokeData.addToDeck=(function(input){
		var count = 0;
		var list = pokeData.deck.cards;
		var supertype = input.supertype;
		
		for (i=0;i<list.length;i++){
			if(list[i].name === input.name){
				count++;
			}
		}
		
		if(pokeData.deck.deckCount < pokeData.deck.deckMax){
			if(supertype.includes("Pok")){
				console.log("I'm a pokemon");
				if(count < 4){
					pokeData.deck.cards.push(input);
					pokeData.deck.deckCount++;
					console.log(input + " Added to Deck");
					console.log(pokeData.deck);
				}
			} else {
				pokeData.deck.cards.push(input);
				pokeData.deck.deckCount++;
				console.log(input + " Added to Deck");
				console.log(pokeData.deck);
			}
		}
	});
	
	pokeData.removeFromDeck=(function(input){
		if(pokeData.deck.cards.indexOf(input) > -1){
			pokeData.deck.cards.forEach(function(){
				var index = pokeData.deck.indexOf(input);
				(function(){
					pokeData.deck.cards.splice(index, 1);
				});
			});
		}
	});
	
	pokeData.viewDeck=(function(){
		return pokeData.deck.cards;
	});
	
	$scope.showAll=(function(list){
		angular.forEach(list, function(pokemon){
			pokemon.show = true;
		});
	});
	
	$scope.hideAll=(function(list){
		angular.forEach(list, function(pokemon){
			pokemon.show = false;
		});
	});
}]);