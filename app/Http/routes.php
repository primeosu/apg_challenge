<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('dashboard');
});

Route::post('upload/delete',  'MalwareController@deleteUploads');
Route::post('upload',         'MalwareController@store');

Route::get('upload',          'MalwareController@uploadsIndex');
Route::get('malware',         'MalwareController@index');
Route::get('malware/{id}',    'MalwareController@show');
