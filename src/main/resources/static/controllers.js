/**
 * 
 */

angular.module("PokeModule").controller("PokeController", function(preloadService){
	
	var pokemonCards = preloadService.preload("pokemon");
	var trainerCards = preloadService.preload("trainer");
	var energyCards = preloadService.preload("energy");
	
	var deck = {
		deckCount : 0,
		deckMax : 60,
		cards : [],
		
	};
	
	var pokeData = this;
	
	pokeData.getPokemon=(function(input){
		var card;
		console.log(input);
		for(i=0;i<pokemonCards.length;i++){
			if(pokemonCards[i].name === input){
				card=pokemonCards[i];
				console.log(card);
				console.log(i);
	//			return card;
			}
		}
	})
	
	pokeData.getAllPokemon=(function(){
		var pokeList = [];
		var localIndeces = [];
		for(i=0;i<pokemonCards.length;i++){
			if(localIndeces.indexOf(pokemonCards[i].nationalPokedexNumber) === -1){
				localIndeces.push(pokemonCards[i].nationalPokedexNumber);
				pokeList.push(pokemonCards[i]);
			}
		}
		pokeList.sort(function(a,b){
			var x = a.nationalPokedexNumber;
			var y = b.nationalPokedexNumber;
			return ((x<y) ? -1 : ((x>y) ? 1 : 0));
		});
		console.log(pokeList);
//		return pokeList;
	});
	
	pokeData.getTrainers=(function(){
		var trainerList = [];
		var localNames = [];
		for(i=0;i<trainerCards.length;i++){
			if(localNames.indexOf(trainerCards[i].name) === -1){
				localNames.push(trainerCards[i].name);
				trainerList.push(trainerCards[i]);
			}
		}
		trainerList.sort(function(a,b){
			var x = a.id;
			var y = b.id;
			return ((x<y) ? -1 : ((x>y) ? 1 : 0));
		});
		console.log(trainerList);
//		return pokeList;
	});
	
	pokeData.getEnergy=(function(){
		var energyList = [];
		var localNames = [];
		for(i=0;i<energyCards.length;i++){
			if(localNames.indexOf(energyCards[i].name) === -1){
				if(!energyCards[i].name.toString().includes("Basic") && !energyCards[i].attacks){
					localNames.push(energyCards[i].name);
					energyList.push(energyCards[i]);
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
		console.log(energyList);
//		return pokeList;
	});
	
	pokeData.addToDeck=(function(input){
		(function(input){
			var count = {};
			deck.cards.forEach(function(x){
				var num = x.nationalPokedexNumber;
				count[num] = (count[num] || 0)+1;
			});
			if(count[input.nationalPokedexNumber] < 4 && deck.deckCount < deck.deckMax){
				deck.cards.push(input);
				deck.deckCount++;
			}
		});
	});
	
	pokeData.removeFromDeck=(function(input){
		if(deck.cards.indexOf(input) > -1){
			deck.cards.forEach(function(){
				var index = deck.indexOf(input);
				(function(){
					deck.cards.splice(index, 1);
				});
			});
		}
	});
	
	pokeData.viewDeck=(function(){
		return deck.cards;
	});
	
});