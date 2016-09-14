<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class FileType
 * @package App
 */
class FileType extends Model
{
    public $table = 'file_types';
    public $fillable = ['type'];

    /**
     * Return all hashes related to this file type
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function hashes(){
        return $this->hasMany('App\HashName', 'file_type_id', 'id');
    }
}
