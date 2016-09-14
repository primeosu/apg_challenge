<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('dashboard', ['as' => 'dashboard', 'uses' => 'MainController@dashboard']);
Route::post('upload', ['as' => 'upload', 'uses' => 'MainController@upload']);

Route::get('/', ['as' => 'home', 'uses' => 'MainController@index']);
