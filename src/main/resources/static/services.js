/**
 * 
 */

angular.module("PokeModule").service('preloadService', function($http,$q){

	this.preload = function(input){
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
			for (x=0;x<localData.length;x++){
				
				for(z=0;z<localData[x].data.cards.length;z++){
					var cards = localData[x].data.cards[z];
					sortedCards.push(cards);
				}
				
			}
		});
		return sortedCards;
	}
});