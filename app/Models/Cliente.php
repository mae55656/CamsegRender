<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    // Campos que se pueden llenar de manera masiva (mass assignment)
    protected $fillable = [
        'nombre',
        'dni',
        'telefono',
        'email',
        'password',
        'direccion'
    ];
    public function pedidos()
{
    return $this->hasMany(Pedido::class, 'cliente_id');
}
}
