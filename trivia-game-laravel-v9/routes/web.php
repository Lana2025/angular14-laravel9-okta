<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
use App\Http\Controllers\PlayerController;
//Route::get('/question', ['middleware' => 'cors' , 'uses'=> 'MyController@Action']);

Route::get('/players', 'App\Http\Controllers\PlayerController@index');
Route::get('/question', function(Request $request) {
    return response()->json(json_decode(file_get_contents('http://jservice.io/api/random?count=1')));
});
//Route::get('/question','UserController@getData')->middleware('CORS');
