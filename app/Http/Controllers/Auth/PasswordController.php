<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): void
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), /*'confirmed'*/'different:current_password'],
            'password_confirmation' => ['required_with:password', 'same:password'],
        ], [
            'current_password.required' => 'Por favor, informe a senha atual',
            'current_password.current_password' => 'A senha informada é inválida',
            'password.required' => 'Por favor, informe a nova senha',
            'password.different' => 'A nova senha deve ser diferente da senha atual',
            'password_confirmation.required_with' => 'Por favor, confirme a nova senha',
            'password_confirmation.same' => 'A senha e sua confirmação não correspondem',
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        // return back();
    }
}
