<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FileType extends Model
{
    public $table = 'file_types';
    public $fillable = ['type'];

    public function hashes(){
        return $this->hasMany('App\HashName', 'file_type_id', 'id');
    }
}
