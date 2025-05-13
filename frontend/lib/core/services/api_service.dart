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

  void clearToken() {
    _token = null;
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

  Future<dynamic> get(String endpoint, {Map<String, String>? queryParameters}) async {
    try {
      final cleanBaseUrl = _baseUrl.endsWith('/') ? _baseUrl.substring(0, _baseUrl.length - 1) : _baseUrl;
      final cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;

      Uri url;
      if (queryParameters != null && queryParameters.isNotEmpty) {
        url = Uri.parse('$cleanBaseUrl/$cleanEndpoint').replace(queryParameters: queryParameters);
      } else {
        url = Uri.parse('$cleanBaseUrl/$cleanEndpoint');
      }

      final response = await http.get(
        url,
        headers: await _getHeaders(),
      );
      return _handleResponse(response);
    } catch (e) {
      throw _handleError(e);
    }
  }

  Future<dynamic> getStations() async {
    try {
      return await get('/stations');
    } catch (e) {
      throw Exception('Failed to fetch stations: $e');
    }
  }

  Future<dynamic> getAllTrains() async {
    try {
      return await get('/trains/all');
    } catch (e) {
      throw Exception('Failed to fetch all trains: $e');
    }
  }

  Future<dynamic> getUserInfo(String userId) async {
    try {
      return await get('/user/$userId');
    } catch (e) {
      throw Exception('Failed to fetch user info: $e');
    }
  }

  Future<dynamic> post(String endpoint, dynamic data) async {
    try {
      final cleanBaseUrl = _baseUrl.endsWith('/') ? _baseUrl.substring(0, _baseUrl.length - 1) : _baseUrl;
      final cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
      final url = '$cleanBaseUrl/$cleanEndpoint';

      final response = await http.post(
        Uri.parse(url),
        headers: await _getHeaders(),
        body: jsonEncode(data),
      );
      return _handleResponse(response);
    } catch (e) {
      throw _handleError(e);
    }
  }

  Future<dynamic> put(String endpoint, dynamic data) async {
    try {
      final cleanBaseUrl = _baseUrl.endsWith('/') ? _baseUrl.substring(0, _baseUrl.length - 1) : _baseUrl;
      final cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
      final url = '$cleanBaseUrl/$cleanEndpoint';

      final response = await http.put(
        Uri.parse(url),
        headers: await _getHeaders(),
        body: jsonEncode(data),
      );
      return _handleResponse(response);
    } catch (e) {
      throw _handleError(e);
    }
  }

  Future<dynamic> delete(String endpoint) async {
    try {
      final cleanBaseUrl = _baseUrl.endsWith('/') ? _baseUrl.substring(0, _baseUrl.length - 1) : _baseUrl;
      final cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
      final url = '$cleanBaseUrl/$cleanEndpoint';

      final response = await http.delete(
        Uri.parse(url),
        headers: await _getHeaders(),
      );
      return _handleResponse(response);
    } catch (e) {
      throw _handleError(e);
    }
  }

  dynamic _handleResponse(http.Response response) {
    final responseData = jsonDecode(response.body);
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return responseData;
    } else {
      throw ApiException(
        message: responseData['message'] ?? 'Request failed',
        statusCode: response.statusCode,
        errors: responseData['errors'],
      );
    }
  }

  Exception _handleError(dynamic error) {
    if (error is ApiException) {
      return error;
    }
    return ApiException(
      message: error.toString(),
      statusCode: 500,
    );
  }
}

class ApiException implements Exception {
  final String message;
  final int statusCode;
  final Map<String, dynamic>? errors;

  ApiException({
    required this.message,
    required this.statusCode,
    this.errors,
  });

  @override
  String toString() => message;
}
