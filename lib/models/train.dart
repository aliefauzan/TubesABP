class Train {
  final String id;
  final String name;
  final String operator;
  final String date;
  final String time;
  final String departure;
  final String arrival;
  final String arrivalTime;
  final String duration;
  final String classType;
  final String price;
  final int seatsLeft;

  Train({
    required this.id,
    required this.name,
    required this.operator,
    required this.date,
    required this.time,
    required this.departure,
    required this.arrival,
    required this.arrivalTime,
    required this.duration,
    required this.classType,
    required this.price,
    required this.seatsLeft,
  });

  factory Train.dummy() {
    return Train(
      id: '35151859256378',
      name: 'Serayu 255',
      operator: 'PT. KAI',
      date: '16 Nov 2024',
      time: '00:15',
      departure: 'Kiaracondong',
      arrival: 'Jatinegara',
      arrivalTime: '03:55',
      duration: '3h 40m',
      classType: 'Ekonomi',
      price: 'Rp150.000',
      seatsLeft: 50,
    );
  }
}