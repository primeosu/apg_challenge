<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HashName extends Model
{
    public $table = 'hash_names';
    public $fillable = ['md5', 'name', 'size', 'classification_type_id', 'file_type_id'];

    public function classification(){
        return $this->hasOne('App\Classification', 'id', 'classification_type_id');
    }

    public function type(){
        return $this->hasOne('App\FileType', 'id', 'file_type_id');
    }
}
