<?php

namespace App;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Classification
 * @package App
 */
class Classification extends Model
{
    public $table = 'classification_types';
    public $fillable = ['name'];

    /**
     * Return all hashes related to this classification type
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function hashes(){
        return $this->hasMany('App\HashName', 'classification_type_id', 'id');
    }

    /**
     * Get all classification types and count all hashes that are part of each
     * @return Collection
     */
    public static function hashCounts(){
        return Classification::all()->transform(function($class){
            $class->count = $class->hashes()->count();

            return $class;
        })->filter(function($class){
            return $class->count > 0;
        });
    }
}
