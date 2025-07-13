<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Models\Cliente;
use App\Models\Pedido;
use App\Models\Administrativo;
use App\Http\Controllers\Api\PedidoController;
use App\Http\Controllers\Api\ClienteApiController;
use App\Http\Controllers\Api\AdministrativoApiController;


Route::apiResource('pedidos', PedidoController::class);
Route::apiResource('clientes', ClienteApiController::class);
Route::apiResource('administrativos', AdministrativoApiController::class);


Route::post('/loginadmin', function (Request $request) {
    $administrativo = Administrativo::where('email', $request->email)->first();

    if (!$administrativo || !Hash::check($request->password, $administrativo->password)) {
        return response()->json(['mensaje' => 'Credenciales incorrectas'], 401);
    }

    return response()->json(['mensaje' => 'Login correcto', 'administrativo' => $administrativo]);
});

Route::post('/login', function (Request $request) {
    $cliente = Cliente::where('email', $request->email)->first();

    if (!$cliente || !Hash::check($request->password, $cliente->password)) {
        return response()->json(['mensaje' => 'Credenciales incorrectas'], 401);
    }

    return response()->json(['mensaje' => 'Login correcto', 'cliente' => $cliente]);
});

Route::post('/clientes', function (Request $request) {
    $cliente = Cliente::create([
        'nombre' => $request->nombre,
        'dni' => $request->dni,
        'telefono' => $request->telefono,
        'email' => $request->email,
        'direccion' => $request->direccion,
        'password' => Hash::make($request->password)  // AQUÍ va la encriptación
    ]);

    return response()->json([
    'mensaje' => 'Registro exitoso',
    'cliente' => $cliente
], 201);
});

Route::post('/pedidos', function (Request $request) {
    $pedido = Pedido::create([
        'cliente_id' => $request->cliente_id,
        'servicio' => $request->servicio,
        'detalles' => $request->detalles,
        'fecha_solicitud' => $request->fecha_solicitud,
        'estado' => $request->estado ?? 'pendiente',
        'precio_estimado' => $request->precio_estimado,
    ]);

    return response()->json(['mensaje' => 'Pedido registrado correctamente', 'pedido' => $pedido], 201);
});

