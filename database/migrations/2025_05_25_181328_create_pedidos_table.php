<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pedidos', function (Blueprint $table) {
             $table->bigIncrements('pedido_id');
            $table->unsignedBigInteger('cliente_id');
            $table->string('servicio');
            $table->text('detalles')->nullable();
            $table->date('fecha_solicitud');
            $table->string('estado');
            $table->decimal('precio_estimado', 10, 2);
            $table->timestamps();

            // Llave foránea a clientes
            $table->foreign('cliente_id')->references('id')->on('clientes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
