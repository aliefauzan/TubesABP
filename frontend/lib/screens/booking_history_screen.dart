import 'package:flutter/material.dart';
import 'package:keretaxpress/models/booking.dart';
import 'package:keretaxpress/utils/theme.dart';
import 'package:keretaxpress/widgets/app_bar.dart';
import 'package:keretaxpress/core/services/booking_service.dart';
import 'package:keretaxpress/core/services/auth_service.dart';

class BookingHistoryScreen extends StatefulWidget {
  const BookingHistoryScreen({super.key});

  @override
  _BookingHistoryScreenState createState() => _BookingHistoryScreenState();
}

class _BookingHistoryScreenState extends State<BookingHistoryScreen> {
  late Future<List<Booking>> _futureBookings;
  bool _isLoadingAction = false;

  @override
  void initState() {
    super.initState();
    _loadBookings();
  }

  void _loadBookings() {
    setState(() {
      _futureBookings = _fetchBookings();
    });
  }

  Future<List<Booking>> _fetchBookings() async {
    final bookingService = BookingService();
    final authService = AuthService();
    final userUuid = await authService.getUserUUID();
    if (userUuid == null) {
      return [];
    }
    final data = await bookingService.getBookingHistory(userUuid);
    if (data is List) {
      return data.map((json) => Booking.fromJson(json)).toList();
    }
    return [];
  }

  Future<void> _onRefresh() async {
    _loadBookings();
    await _futureBookings;
  }

  void _uploadPaymentProof(Booking booking) {
    // Placeholder for upload payment proof functionality
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Upload payment proof for booking ${booking.transactionId}')),
    );
  }

  void _downloadTicket(Booking booking) {
    // Placeholder for download ticket functionality
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Download ticket for booking ${booking.transactionId}')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(),
      body: RefreshIndicator(
        onRefresh: _onRefresh,
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Text(
                'Riwayat Pemesanan',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 24),
              FutureBuilder<List<Booking>>(
                future: _futureBookings,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  } else if (snapshot.hasError) {
                    return Center(
                      child: Column(
                        children: [
                          const Text('Gagal memuat riwayat.'),
                          const SizedBox(height: 8),
                          ElevatedButton(
                            onPressed: _loadBookings,
                            child: const Text('Coba Lagi'),
                          ),
                        ],
                      ),
                    );
                  } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                    return const Center(child: Text('Tidak ada riwayat pemesanan.'));
                  }
                  final bookings = snapshot.data!;
                  return ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: bookings.length,
                    itemBuilder: (context, index) {
                      final booking = bookings[index];
                      return Card(
                        elevation: 2,
                        margin: const EdgeInsets.only(bottom: 20),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(18),
                          side: BorderSide(color: Colors.blue.shade100),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              // Passenger name centered at top
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    booking.passengerName,
                                    style: const TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                ],
                              ),
                              const SizedBox(height: 8),
                              // Train name, operator, and status badge to the right
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          booking.trainName,
                                          style: const TextStyle(
                                            fontSize: 20,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        Text(
                                          booking.operator,
                                          style: TextStyle(
                                            color: Colors.blue.shade700,
                                            fontWeight: FontWeight.w500,
                                            fontSize: 15,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                    decoration: BoxDecoration(
                                      color: booking.status == 'Sudah dibayar'
                                          ? Colors.blue.shade100
                                          : Colors.yellow.shade100,
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                    child: Text(
                                      booking.status,
                                      style: TextStyle(
                                        color: booking.status == 'Sudah dibayar'
                                            ? Colors.blue.shade700
                                            : Colors.orange.shade700,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 18),
                              // Timeline
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  // Departure
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        booking.date,
                                        style: const TextStyle(fontWeight: FontWeight.w500),
                                      ),
                                      Text(
                                        booking.time,
                                        style: TextStyle(
                                          color: Colors.blue.shade700,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 16,
                                        ),
                                      ),
                                      Text(
                                        booking.departure,
                                        style: const TextStyle(fontWeight: FontWeight.w500),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(width: 10),
                                  // Timeline visual
                                  Expanded(
                                    child: Column(
                                      children: [
                                        Container(
                                          margin: const EdgeInsets.only(bottom: 4),
                                          height: 2,
                                          color: Colors.blue.shade200,
                                        ),
                                        Icon(Icons.train, color: Colors.blue.shade400, size: 28),
                                        Container(
                                          margin: const EdgeInsets.only(top: 4),
                                          height: 2,
                                          color: Colors.blue.shade200,
                                        ),
                                        // Duration (dummy for now)
                                        Text(
                                          '3j40m',
                                          style: TextStyle(
                                            color: Colors.blue.shade700,
                                            fontWeight: FontWeight.w500,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  const SizedBox(width: 10),
                                  // Arrival
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: [
                                      Text(
                                        booking.date,
                                        style: const TextStyle(fontWeight: FontWeight.w500),
                                      ),
                                      Text(
                                        '--:--',
                                        style: TextStyle(
                                          color: Colors.blue.shade700,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 16,
                                        ),
                                      ),
                                      Text(
                                        booking.arrival,
                                        style: const TextStyle(fontWeight: FontWeight.w500),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                              const SizedBox(height: 18),
                              // Bottom row with Transaction ID and Total Biaya
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  // Transaction ID on bottom left
                                  Text(
                                    'Transaction ID : ${booking.transactionId}',
                                    style: TextStyle(
                                      fontWeight: FontWeight.w500,
                                      color: Colors.grey.shade700,
                                      fontSize: 13,
                                    ),
                                  ),
                                  // Total Biaya on bottom right
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: [
                                      const Text('Total Biaya', style: TextStyle(color: Colors.grey)),
                                      Text(
                                        booking.price,
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          color: Colors.blue.shade700,
                                          fontSize: 18,
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                              const SizedBox(height: 18),
                              // Action buttons
                              Row(
                                children: [
                                  Expanded(
                                    child: OutlinedButton(
                                      onPressed: _isLoadingAction ? null : () => _uploadPaymentProof(booking),
                                      style: OutlinedButton.styleFrom(
                                        padding: const EdgeInsets.symmetric(vertical: 14),
                                        side: BorderSide(color: Colors.blue.shade700),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                      ),
                                      child: Text(
                                        'Upload bukti pembayaran',
                                        style: TextStyle(color: Colors.blue.shade700),
                                      ),
                                    ),
                                  ),
                                  const SizedBox(width: 12),
                                  Expanded(
                                    child: ElevatedButton(
                                      onPressed: _isLoadingAction ? null : () => _downloadTicket(booking),
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: Colors.blue.shade700,
                                        padding: const EdgeInsets.symmetric(vertical: 14),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                      ),
                                      child: const Text(
                                        'Download tiket',
                                        style: TextStyle(color: Colors.white),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
