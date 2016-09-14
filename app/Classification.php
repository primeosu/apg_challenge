<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classification extends Model
{
    public $table = 'classification_types';
    public $fillable = ['name'];

    public function hashes(){
        return $this->hasMany('App\HashName', 'classification_type_id', 'id');
    }
}
