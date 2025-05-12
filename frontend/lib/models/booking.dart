class Booking {
  final String transactionId;
  final String trainName;
  final String operator;
  final String date;
  final String time;
  final String departure;
  final String arrival;
  final String status;
  final String price;
  final String passengerName;
  final String passengerId;
  final String passengerDob;
  final String passengerGender;
  final String seatClass;
  final String seatNumber;

  Booking({
    required this.transactionId,
    required this.trainName,
    required this.operator,
    required this.date,
    required this.time,
    required this.departure,
    required this.arrival,
    required this.status,
    required this.price,
    required this.passengerName,
    required this.passengerId,
    required this.passengerDob,
    required this.passengerGender,
    required this.seatClass,
    required this.seatNumber,
  });

  factory Booking.dummy() {
    return Booking(
      transactionId: '35151859256378',
      trainName: 'Serayu 255',
      operator: 'PT. KAI',
      date: '16 Nov 2024',
      time: '00:15',
      departure: 'Kiaracondong',
      arrival: 'Jatinegara',
      status: 'Sudah dibayar',
      price: 'Rp150.000',
      passengerName: 'Alif Lohen',
      passengerId: '77773023030043043',
      passengerDob: '30 Mar 2003',
      passengerGender: 'Laki-laki',
      seatClass: 'Ekonomi',
      seatNumber: 'A1',
    );
  }

  factory Booking.fromJson(Map<String, dynamic> json) {
    return Booking(
      transactionId: json['transaction_id']?.toString() ?? '',
      trainName: json['train_name'] ?? '',
      operator: json['operator'] ?? '',
      date: json['date'] ?? '',
      time: json['time'] ?? '',
      departure: json['departure'] ?? '',
      arrival: json['arrival'] ?? '',
      status: json['status'] ?? '',
      price: json['price']?.toString() ?? '',
      passengerName: json['passenger_name'] ?? '',
      passengerId: json['passenger_id']?.toString() ?? '',
      passengerDob: json['passenger_dob'] ?? '',
      passengerGender: json['passenger_gender'] ?? '',
      seatClass: json['seat_class'] ?? '',
      seatNumber: json['seat_number']?.toString() ?? '',
    );
  }
}