import 'package:flutter/material.dart';
import 'package:keretaxpress/models/booking.dart';
import 'package:keretaxpress/utils/theme.dart';
import 'package:keretaxpress/widgets/app_bar.dart';
import 'package:keretaxpress/core/services/booking_service.dart';
import 'package:keretaxpress/core/services/auth_service.dart';
import 'package:keretaxpress/widgets/booking_card.dart';

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
    print('Booking history API response: $data');
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
              Center(
                child: Text(
                  'Riwayat Pemesanan',
                  style: Theme.of(context).textTheme.displayMedium,
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
                          Text(
                            'Gagal memuat riwayat.',
                            style: Theme.of(context).textTheme.bodyLarge,
                          ),
                          const SizedBox(height: 8),
                          ElevatedButton(
                            onPressed: _loadBookings,
                            child: const Text('Coba Lagi'),
                          ),
                        ],
                      ),
                    );
                  } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                    return Center(
                      child: Text(
                        'Tidak ada riwayat pemesanan.',
                        style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                          color: Colors.grey[600],
                        ),
                      ),
                    );
                  }
                  return ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: snapshot.data!.length,
                    itemBuilder: (context, index) {
                      final booking = snapshot.data![index];
                      return BookingCard(
                        booking: booking,
                        isLoadingAction: _isLoadingAction,
                        onUploadPaymentProof: _uploadPaymentProof,
                        onDownloadTicket: _downloadTicket,
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
