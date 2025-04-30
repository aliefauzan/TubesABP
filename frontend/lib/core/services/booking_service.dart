import 'package:keretaxpress/core/services/api_service.dart';

class BookingService {
  final ApiService _api = ApiService();

  Future<dynamic> book(Map<String, dynamic> bookingData) async {
    return await _api.post('/bookings', bookingData);
  }

  Future<dynamic> getBookingHistory() async {
    return await _api.get('/bookings/history');
  }
}
