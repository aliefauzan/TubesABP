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
  });
}