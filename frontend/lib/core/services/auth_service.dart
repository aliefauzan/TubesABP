import 'package:keretaxpress/core/services/api_service.dart';

import 'package:keretaxpress/core/services/api_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  final ApiService _api = ApiService();

  Future<dynamic> signUp(String email, String password, String name) async {
    try {
      final laravelResponse = await _api.post(
        '/register',
        {
          'email': email,
          'password': password,
          'password_confirmation': password,
          'name': name
        },
      );

      return laravelResponse;
    } catch (e) {
      throw Exception('Registration failed: $e');
    }
  }

  Future<dynamic> signIn(String email, String password) async {
    try {
      final laravelResponse = await _api.post(
        '/login',
        {'email': email, 'password': password},
      );

      // Set token in ApiService if token is present in laravelResponse
      if (laravelResponse != null && laravelResponse['token'] != null) {
        _api.setToken(laravelResponse['token']);
        // Save user UUID to shared preferences if present
        if (laravelResponse['user'] != null && laravelResponse['user']['uuid'] != null) {
          final prefs = await SharedPreferences.getInstance();
          await prefs.setString('user_uuid', laravelResponse['user']['uuid']);
        }
      }

      return laravelResponse;
    } catch (e) {
      throw Exception('Login failed: $e');
    }
  }

  Future<String?> getUserUUID() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('user_uuid');
  }

  Future<void> signOut() async {
    await _api.post('/logout', {});
    _api.setToken('');
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('user_uuid');
  }
}
