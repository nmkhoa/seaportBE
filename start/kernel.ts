/*
|--------------------------------------------------------------------------
| Application middleware
|--------------------------------------------------------------------------
|
| This file is used to define middleware for HTTP requests. You can register
| middleware as a `closure` or an IoC container binding. The bindings are
| preferred, since they keep this file clean.
|
*/

import Server from '@ioc:Adonis/Core/Server'

// import { fetchUpcomingMatchJob } from 'App/Jobs/FetchUpcomingMatchJob'
// import { fetchLiveMatchJob } from 'App/Jobs/FetchLiveMatchJob'

// import { calcOuFtJob } from 'App/Jobs/CalcOuFtJob'
// import { calcOuHtJob } from 'App/Jobs/CalcOuHtJob'
// import { calcOddsHtJob } from 'App/Jobs/CalcOddsHtJob'
// import { calcOddsFtJob } from 'App/Jobs/CalcOddsFtJob'

// import { requestRandomPredict } from 'App/Jobs/RequestRandomPredict'

// const FetchMatchInfoInitTask = require('@ioc:App/Tasks/FetchMatchInfoTask')
// const FetchUserBettingTask = require('@ioc:App/Tasks/FetchUserBettingTask')
// const CalcPredictInitTask = require('@ioc:App/Tasks/CalcPredictTask')
// const FetchGiftCodeInitTask = require('@ioc:App/Tasks/FetchGiftCodeTask')

// const FetchSeaportEventInitTask = require('@ioc:App/Tasks/FetchSeaportEventTask')
// const FetchUniswapEventInitTask = require('@ioc:App/Tasks/FetchUniswapEventTask')
const FetchUniswapPoolEventInitTask = require('@ioc:App/Tasks/FetchUniswapPoolEventTask')

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| An array of global middleware, that will be executed in the order they
| are defined for every HTTP requests.
|
*/
Server.middleware.register([() => import('@ioc:Adonis/Core/BodyParser')])

/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined as key-value pair. The value is the namespace
| or middleware function and key is the alias. Later you can use these
| alias on individual routes. For example:
|
| { auth: () => import('App/Middleware/Auth') }
|
| and then use it as follows
|
| Route.get('dashboard', 'UserController.dashboard').middleware('auth')
|
*/
Server.middleware.registerNamed({
  checkSignature: () => import('App/Middleware/CheckSignature'),
  checkAuthSignature: () => import('App/Middleware/CheckAuthSignature'),
  checkAuthWallet: () => import('App/Middleware/CheckAuthWallet'),
})

//const Scheduler = require('@ioc:Adonis/Addons/Scheduler')

new Promise(() => {
  // Scheduler.run();
  // fetchUpcomingMatchJob({})
  // fetchLiveMatchJob()
  // FetchMatchInfoInitTask.initTask()
  // FetchUserBettingTask.initTask()
  // CalcPredictInitTask.initTask()
  // FetchGiftCodeInitTask.initTask()
  // calcOuFtJob()
  // calcOuHtJob()
  // calcOddsHtJob()
  // calcOddsFtJob()
  // requestRandomPredict()

  // FetchSeaportEventInitTask.initTask()
  // FetchUniswapEventInitTask.initTask()
  FetchUniswapPoolEventInitTask.initTask()
  return
}).then(() => {})
