/**
 * 
 */

angular.module("PokeModule",[]);

angular.module("PokeModule").controller("PokeController",function($scope,$http,$q){
	
	var preload = (function(input){
		var promises = [];
		var localData;
		var sortedCards = [];
		
		var accumulatePokes = (function(){
			for (i=1;i<9;i++){
				var promise = $http.get("https://api.pokemontcg.io/v1/cards?supertype="+input+"&page="+i+"&pageSize=1000")
				promises.push(promise);
			}
			return promises;
		});
		
		$q.all(accumulatePokes()).then(function(data){
			localData=data;
			for (x=0;x<=localData.length;x++){
				if(x===localData.length){
					return sortedCards;
				} else {
					for(z=0;z<localData[x].data.cards.length;z++){
						var cards = localData[x].data.cards[z];
						sortedCards.push(cards);
					}
				}
			}
		});
	})
	
	var pokemonCards = preload("pokemon");
	var trainerCards = preload("trainer");
	var energyCards = preload("energy");
	
	var pokeData = this;
	
	pokeData.getPokemon=(function(input){
		
	});
	
	pokeData.getBySuperType=(function(input){
		
	});
	
	pokeData.getByPage=function(){
		
	}
});