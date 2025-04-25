import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:keretaxpress/core/services/api_service.dart';

class AuthService {
  final SupabaseClient _supabase = Supabase.instance.client;
  final ApiService _api = ApiService();

  Future<AuthResponse> signUp(String email, String password, String name) async {
    try {
      final supabaseResponse = await _supabase.auth.signUp(
        email: email,
        password: password,
        data: {'name': name},
      );
      
      final laravelResponse = await _api.post(
        '/auth/register',
        {'email': email, 'password': password, 'name': name},
      );
      
      return supabaseResponse;
    } catch (e) {
      throw Exception('Registration failed: $e');
    }
  }

  Future<AuthResponse> signIn(String email, String password) async {
    try {
      final supabaseResponse = await _supabase.auth.signInWithPassword(
        email: email,
        password: password,
      );
      
      final laravelResponse = await _api.post(
        '/auth/login',
        {'email': email, 'password': password},
      );
      
      return supabaseResponse;
    } catch (e) {
      throw Exception('Login failed: $e');
    }
  }

  Future<void> signOut() async {
    await _supabase.auth.signOut();
    await _api.post('/auth/logout', {});
  }
}