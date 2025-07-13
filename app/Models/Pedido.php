<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $primaryKey = 'pedido_id';

    protected $fillable = [
        'cliente_id',
        'servicio',
        'detalles',
        'fecha_solicitud',
        'estado',
        'precio_estimado'
    ];

    // Relación con cliente
    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }
}
