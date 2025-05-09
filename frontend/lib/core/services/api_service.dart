import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiService {
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  final String _baseUrl = dotenv.env['LARAVEL_API_URL']!;
  String? _token;

  void setToken(String token) {
    _token = token;
  }

  bool isLoggedIn() {
    return _token != null && _token!.isNotEmpty;
  }

  Future<Map<String, String>> _getHeaders() async {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      if (_token != null) 'Authorization': 'Bearer $_token',
    };
  }

  Future<dynamic> get(String endpoint) async {
    final cleanBaseUrl = _baseUrl.endsWith('/') ? _baseUrl.substring(0, _baseUrl.length - 1) : _baseUrl;
    final cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    final url = '$cleanBaseUrl/$cleanEndpoint';

    final response = await http.get(
      Uri.parse(url),
      headers: await _getHeaders(),
    );
    return _handleResponse(response);
  }

  Future<dynamic> getUserInfo(String userId) async {
    try {
      return await get('/user/$userId');
    } catch (e) {
      throw Exception('Failed to fetch user info: $e');
    }
  }

  Future<dynamic> post(String endpoint, dynamic data) async {
    final cleanBaseUrl = _baseUrl.endsWith('/') ? _baseUrl.substring(0, _baseUrl.length - 1) : _baseUrl;
    final cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    final url = '$cleanBaseUrl/$cleanEndpoint';

    final response = await http.post(
      Uri.parse(url),
      headers: await _getHeaders(),
      body: jsonEncode(data),
    );
    return _handleResponse(response);
  }

  dynamic _handleResponse(http.Response response) {
    final responseData = jsonDecode(response.body);
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return responseData;
    } else {
      throw Exception(responseData['message'] ?? 'Request failed');
    }
  }
}
