import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../services/collection.service';
import { RestaurantService } from '../services/restaurant.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IFavoriteListModel } from '../interfaces/IFavoriteListModel';
import { IRestaurantModel } from '../interfaces/IRestaurantModel';
@Component({
	selector: 'app-collection',
	templateUrl: './collection.component.html',
	styleUrls: ['./collection.component.scss']
})

export class CollectionComponent implements OnInit {
	user: object;
	userID: number;
	favoriateList: IFavoriteListModel;
	restaurantIDList: number[] = [];
	restaurants: IRestaurantModel[] = [];
	private restaurantDetailUrl = 'restaurants/';
	newrestaurantIDList: number[] = [];             // used to update collection


	constructor(private router: Router,
		private collectionData: CollectionService,
		private restaurantData: RestaurantService,
		private auth: AuthService) { }

	ngOnInit() {
		this.auth.getSession().subscribe(data => {
			this.userID = data.userID;
      console.log('get current user in collection: ' + JSON.stringify(data));
      // get the collection by favoriateListID
      if (this.userID > 0) {
        this.collectionData.getCollectionByUserID(this.userID).subscribe(
          data => {
            this.favoriateList = data;
            this.restaurantIDList = this.favoriateList[0].restaurantIDList;
            console.log('favoriateList of collection: ', this.favoriateList);
            // get every restaurant in the favoriateList
            for (let each of this.restaurantIDList) {
              this.restaurantData.getByID(each).subscribe(restaurant => {
                this.restaurants.push(restaurant);
                console.log('restaurant in fav list of collection: ', restaurant);
              });
            }
          });
      }
		});
		
	}

	click(rID) {
		var nextStationUrl = this.restaurantDetailUrl + rID;
		this.router.navigateByUrl(nextStationUrl);
	}

	// add new restaurant to this collection
	addRestaurantToCollection(restaurantId: number) {
		this.restaurantIDList.push(restaurantId);
		console.log('restaurantIDList: ', this.restaurantIDList);
		if (restaurantId !== null) {
			const body = {
				favoriteListID: this.favoriateList[0].favoriteListID,
				userID: this.favoriateList[0].userID,
				restaurantIDList: this.restaurantIDList
			};
			console.log('favorite list id: ', this.favoriateList[0].favoriteListID);
			console.log('new list object: ', body);
			this.collectionData.updateCollectionByListID(this.favoriateList[0].favoriteListID, body);
		} else {
			console.log('restaurantID is null when add into collection');
		}
	}

	// delete restaurant from this collection
	deleteRestaurantFromCollection(restaurantId: number) {
		// find the restaurantID in the list and remove it
		this.restaurantIDList.splice(this.restaurantIDList.indexOf(restaurantId), 1);
		if (restaurantId !== null) {
			const body = {
				favoriteListID: this.favoriateList[0].favoriteListID,
				userID: this.favoriateList[0].userID,
				restaurantIDList: this.restaurantIDList
			};
			console.log('new list: ', body);
			this.collectionData.updateCollectionByListID(this.favoriateList[0].favoriteListID, body);
		} else {
			console.log('restaurantID is null when delete from collection');
		}
	}
}
