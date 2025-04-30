import 'package:keretaxpress/core/services/api_service.dart';

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
      }

      return laravelResponse;
    } catch (e) {
      throw Exception('Login failed: $e');
    }
  }

  Future<void> signOut() async {
    await _api.post('/logout', {});
    _api.setToken('');
  }
}
