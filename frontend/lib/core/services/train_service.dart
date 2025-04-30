import 'package:keretaxpress/core/services/api_service.dart';

class TrainService {
  final ApiService _api = ApiService();

  Future<dynamic> searchTrains(Map<String, dynamic> queryParams) async {
    // Construct query string from queryParams
    final queryString = Uri(queryParameters: queryParams).query;
    return await _api.get('/trains/search?$queryString');
  }

  Future<dynamic> getPromoTrains() async {
    return await _api.get('/trains/promo');
  }
}
