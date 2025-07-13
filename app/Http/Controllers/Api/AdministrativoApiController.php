<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Administrativo;
use Illuminate\Support\Facades\Hash;

class AdministrativoApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Administrativo::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
                $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'dni' => 'required|string|max:20|unique:administrativos',
            'email' => 'required|email|unique:administrativos',
            'telefono' => 'nullable|string',
            'cargo' => 'nullable|string',
            'password' => 'required|string|min:6',
        ]);

        $data['password'] = Hash::make($data['password']);

        return Administrativo::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
                return Administrativo::findOrFail($id);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
                $admin = Administrativo::findOrFail($id);

        $data = $request->validate([
            'nombre' => 'sometimes|string|max:255',
            'dni' => 'sometimes|string|max:20|unique:administrativos,dni,'.$id,
            'email' => 'sometimes|email|unique:administrativos,email,'.$id,
            'telefono' => 'nullable|string',
            'cargo' => 'nullable|string',
            'password' => 'nullable|string|min:6',
        ]);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $admin->update($data);

        return $admin;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
                $admin = Administrativo::findOrFail($id);
        $admin->delete();

        return response()->json(['message' => 'Eliminado correctamente']);
    }
}
