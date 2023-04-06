/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', () => "It's working")

Route.group(() => {
  Route.get('/nft/list', 'SeaportController.getListNftByAddress')

  Route.post('order/create', 'SeaportController.createOrder')
  Route.get('nft/detail', 'SeaportController.getTokenDetail')
  Route.get('/cloneMetadata', 'SeaportController.cloneMetadata')
}).prefix('/api/v1')

Route.group(() => {
  Route.get('/dashboard', 'AdminsController.getDashboardData')
  Route.get('/code/get-avaiable-code', 'GiftCodeController.getCodeAvaiable')
  Route.post('/code/create-code', 'GiftCodeController.createCode')
})
  .prefix('/api/v1/admin')
  .middleware('checkAuthWallet')

Route.group(() => {})
  .prefix('/api/v1')
  .middleware('checkSignature')
