import 'package:keretaxpress/core/services/api_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  final ApiService _api = ApiService();
  static const String _tokenKey = 'auth_token';
  static const String _uuidKey = 'user_uuid';

  Future<void> _persistToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, token);
    _api.setToken(token);
  }

  Future<void> _persistUserUUID(String uuid) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_uuidKey, uuid);
  }

  Future<bool> initializeAuth() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString(_tokenKey);
    if (token != null && token.isNotEmpty) {
      _api.setToken(token);
      return true;
    }
    return false;
  }

  Future<dynamic> signUp(String email, String password, String name) async {
    try {
      final response = await _api.post(
        '/register',
        {
          'email': email,
          'password': password,
          'password_confirmation': password,
          'name': name
        },
      );

      if (response != null && response['token'] != null) {
        await _persistToken(response['token']);
        if (response['user'] != null && response['user']['uuid'] != null) {
          await _persistUserUUID(response['user']['uuid']);
        }
      }

      return response;
    } catch (e) {
      throw Exception('Registration failed: $e');
    }
  }

  Future<dynamic> signIn(String email, String password) async {
    try {
      final response = await _api.post(
        '/login',
        {'email': email, 'password': password},
      );

      if (response != null && response['token'] != null) {
        await _persistToken(response['token']);
        if (response['user'] != null && response['user']['uuid'] != null) {
          await _persistUserUUID(response['user']['uuid']);
        }
      }

      return response;
    } catch (e) {
      throw Exception('Login failed: $e');
    }
  }

  Future<String?> getUserUUID() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_uuidKey);
  }

  Future<bool> isAuthenticated() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString(_tokenKey);
    final uuid = prefs.getString(_uuidKey);
    return token != null && token.isNotEmpty && uuid != null && uuid.isNotEmpty;
  }

  Future<void> signOut() async {
    try {
      await _api.post('/logout', {});
    } catch (e) {
      // Ignore logout errors
    } finally {
      _api.setToken('');
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_tokenKey);
      await prefs.remove(_uuidKey);
    }
  }
}
