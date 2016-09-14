<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class HashName
 * @package App
 */
class HashName extends Model
{
    public $table = 'hash_names';
    public $fillable = ['md5', 'name', 'size', 'classification_type_id', 'file_type_id'];

    /**
     * Return relevant hash name
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function classification(){
        return $this->hasOne('App\Classification', 'id', 'classification_type_id');
    }

    /**
     * Return relevant malware type
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function type(){
        return $this->hasOne('App\FileType', 'id', 'file_type_id');
    }
}
