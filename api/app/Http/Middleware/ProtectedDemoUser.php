<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ProtectedDemoUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if (in_array($user->email, ['admin@example.com', 'demo@example.com'])) {
            return response()->json([
                'message' => 'デモユーザーは変更、削除できません'
            ], 403);
        }

        return $next($request);
    }
}
