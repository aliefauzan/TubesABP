import 'package:flutter/material.dart';
import 'package:keretaxpress/models/train.dart';
import 'package:keretaxpress/utils/theme.dart';
import 'package:keretaxpress/widgets/app_bar.dart';
import 'package:keretaxpress/widgets/train_card.dart';

class PaymentSuccessScreen extends StatelessWidget {
  const PaymentSuccessScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)?.settings.arguments as Map;
    final booking = args['booking'];
    final train = args['train'];

    return Scaffold(
      appBar: const CustomAppBar(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Center(
              child: Text(
                'Detail Pemesanan Berhasil',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(height: 20),
            Center(
              child: Column(
                children: [
                  const Icon(
                    Icons.check_circle,
                    size: 80,
                    color: AppTheme.successColor,
                  ),
                  const SizedBox(height: 10),
                  Text(
                    'PEMBAYARAN BERHASIL',
                    style: TextStyle(
                      fontSize: 18,
                      color: AppTheme.successColor,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const Text('Tiket Anda sudah aktif'),
                ],
              ),
            ),
            const SizedBox(height: 20),
            Text(
              'Transaction ID: ${booking.transactionId}',
              style: const TextStyle(
                color: Colors.grey,
              ),
            ),
            const SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: TrainCard(
                train: train,
                onTap: () {}, // No action needed here
              ),
            ),
            const SizedBox(height: 20),
            const Text(
              'Detail Penumpang',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 10),
            LayoutBuilder(
              builder: (context, constraints) {
                final isWide = constraints.maxWidth > 400;
                return isWide
                    ? Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(booking.passengerName, style: const TextStyle(fontWeight: FontWeight.bold)),
                                const SizedBox(height: 4),
                                Text('Tanggal Lahir: ${booking.passengerDob}'),
                                Text('Jenis Kelamin: ${booking.passengerGender}'),
                                Text('Kursi: ${booking.seatNumber}'),
                              ],
                            ),
                          ),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('Status Tiket: ${booking.status}'),
                                Text('Kelas: ${booking.seatClass}'),
                              ],
                            ),
                          ),
                        ],
                      )
                    : Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(booking.passengerName, style: const TextStyle(fontWeight: FontWeight.bold)),
                          const SizedBox(height: 4),
                          Text('Tanggal Lahir: ${booking.passengerDob}'),
                          Text('Jenis Kelamin: ${booking.passengerGender}'),
                          Text('Kursi: ${booking.seatNumber}'),
                          Text('Status Tiket: ${booking.status}'),
                          Text('Kelas: ${booking.seatClass}'),
                        ],
                      );
              },
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Total Biaya',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  booking.price,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    color: AppTheme.primaryColor,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 30),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  // Upload payment proof functionality
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.primaryColor,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: const Text(
                  'UPLOAD BUKTI PEMBAYARAN',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
            const SizedBox(height: 10),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: () {
                  Navigator.pushNamedAndRemoveUntil(
                    context, '/schedule', (route) => false);
                },
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  side: const BorderSide(color: AppTheme.primaryColor),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: const Text(
                  'PESAN TIKET LAIN',
                  style: TextStyle(
                    color: AppTheme.primaryColor,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 10),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: () {
                  // Download ticket functionality
                },
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  side: const BorderSide(color: AppTheme.primaryColor),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: const Text(
                  'DOWNLOAD TIKET',
                  style: TextStyle(
                    color: AppTheme.primaryColor,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 10),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: () {
                  Navigator.pushNamedAndRemoveUntil(
                    context, '/', (route) => false);
                },
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  side: const BorderSide(color: AppTheme.primaryColor),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: const Text(
                  'KEMBALI KE BERANDA',
                  style: TextStyle(
                    color: AppTheme.primaryColor,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}