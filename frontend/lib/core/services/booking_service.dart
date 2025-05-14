import 'package:keretaxpress/core/services/api_service.dart';

class BookingService {
  final ApiService _api = ApiService();

  Future<dynamic> book(Map<String, dynamic> bookingData) async {
    try {
      return await _api.post('/bookings', bookingData);
    } catch (e) {
      throw BookingException('Failed to create booking: ${e.toString()}');
    }
  }

  Future<dynamic> getBookingHistory(String userUuid) async {
    try {
      return await _api.get('/bookings/history?user_uuid=$userUuid');
    } catch (e) {
      throw BookingException('Failed to fetch booking history: ${e.toString()}');
    }
  }


  Future<dynamic> uploadPaymentProof(String bookingId, String imagePath) async {
    try {
      // TODO: Implement multipart form data upload
      return await _api.post('/payments/$bookingId/upload', {
        'image_path': imagePath,
      });
    } catch (e) {
      throw BookingException('Failed to upload payment proof: ${e.toString()}');
    }
  }
}

class BookingException implements Exception {
  final String message;

  BookingException(this.message);

  @override
  String toString() => message;
}
