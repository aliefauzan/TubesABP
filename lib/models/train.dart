class Train {
  final String name;
  final String operator;
  final String date;
  final String time;
  final String departure;
  final String arrival;
  final String classType;
  final String price;
  final int seatsLeft;

  Train({
    required this.name,
    required this.operator,
    required this.date,
    required this.time,
    required this.departure,
    this.arrival = '',
    required this.classType,
    required this.price,
    required this.seatsLeft,
  });
}