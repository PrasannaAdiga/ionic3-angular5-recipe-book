import { Injectable } from '@angular/core';
import { Ingredient } from '../../data/ingredient';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthProvider } from '../auth/auth';
import 'rxjs/Rx';
import firebase from 'firebase';

@Injectable()
export class IngredientsProvider {
  private ingredients: Ingredient[] = [];

  constructor(private httpClient: HttpClient,
    private authService: AuthProvider) {}

  addIngredient(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }

  getAllIngredients() {
    return this.ingredients.slice();
  }

  removeIngredient(index: number){
    this.ingredients.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.httpClient.put('https://recipe-book-e9f2f.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token,
      this.ingredients);
  }

  getList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.httpClient.get('https://recipe-book-e9f2f.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token);
  }
}
