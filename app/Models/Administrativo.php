<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Administrativo extends Model
{
    //
        use HasFactory;

    protected $fillable = [
        'nombre',
        'dni',
        'email',
        'telefono',
        'cargo',
        'password',
    ];

    protected $hidden = [
        'password',
    ];
}
