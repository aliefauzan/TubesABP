import 'package:keretaxpress/core/services/api_service.dart';

class TrainService {
  final ApiService _api = ApiService();

  Future<dynamic> searchTrains({
    required String departureStation,
    required String arrivalStation,
    required DateTime date,
  }) async {
    try {
      final queryParams = {
        'departure_station': departureStation,
        'arrival_station': arrivalStation,
        'date': date.toIso8601String().split('T')[0],
      };
      
      final queryString = Uri(queryParameters: queryParams).query;
      return await _api.get('/trains/search?$queryString');
    } catch (e) {
      throw TrainException('Failed to search trains: ${e.toString()}');
    }
  }

  Future<dynamic> getPromoTrains() async {
    try {
      return await _api.get('/trains/promo');
    } catch (e) {
      throw TrainException('Failed to fetch promo trains: ${e.toString()}');
    }
  }

  Future<dynamic> getAllTrains() async {
    try {
      return await _api.get('/trains/all');
    } catch (e) {
      throw TrainException('Failed to fetch all trains: ${e.toString()}');
    }
  }
}

class TrainException implements Exception {
  final String message;

  TrainException(this.message);

  @override
  String toString() => message;
}
