<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Supabase\GoTrue\GoTrueClient;

class AuthController extends Controller
{
    protected $supabaseAuth;

    public function __construct()
    {
        $this->supabaseAuth = app('supabase.auth');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Create user in Supabase
        try {
            $supabaseResponse = $this->supabaseAuth->signUp([
                'email' => $request->email,
                'password' => $request->password,
                'user_metadata' => ['name' => $request->name]
            ]);

            $supabaseUser = $supabaseResponse->getData()['user'];

            // Create local user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'supabase_uid' => $supabaseUser->id,
                'api_token' => Str::random(60),
            ]);

            return response()->json([
                'user' => $user,
                'token' => $user->api_token,
                'supabase_token' => $supabaseResponse->getData()['access_token']
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        try {
            // Authenticate with Supabase
            $supabaseResponse = $this->supabaseAuth->signInWithPassword([
                'email' => $request->email,
                'password' => $request->password,
            ]);

            $supabaseUser = $supabaseResponse->getData()['user'];

            // Find or create local user
            $user = User::where('supabase_uid', $supabaseUser->id)->first();

            if (!$user) {
                $user = User::create([
                    'name' => $supabaseUser->user_metadata['name'] ?? $supabaseUser->email,
                    'email' => $supabaseUser->email,
                    'password' => Hash::make($request->password),
                    'supabase_uid' => $supabaseUser->id,
                    'api_token' => Str::random(60),
                ]);
            }

            return response()->json([
                'user' => $user,
                'token' => $user->api_token,
                'supabase_token' => $supabaseResponse->getData()['access_token']
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Invalid credentials',
                'error' => $e->getMessage()
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        try {
            // Logout from Supabase
            $this->supabaseAuth->signOut($request->bearerToken());

            // Logout from Laravel
            $request->user()->currentAccessToken()->delete();

            return response()->json(['message' => 'Successfully logged out']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Logout failed'], 500);
        }
    }

    public function user(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
            'supabase_user' => $request->supabase_user ?? null
        ]);
    }
}