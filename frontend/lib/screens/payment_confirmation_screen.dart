import 'package:flutter/material.dart';
import 'package:keretaxpress/models/train.dart';
import 'package:keretaxpress/utils/theme.dart';
import 'package:keretaxpress/widgets/app_bar.dart';

class PaymentConfirmationScreen extends StatelessWidget {
  const PaymentConfirmationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // In a real app, you would get this from state management
    final train = Train.dummy();

    return Scaffold(
      appBar: const CustomAppBar(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Konfirmasi Pembayaran',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 20),
            const Center(
              child: Column(
                children: [
                  Icon(
                    Icons.payment,
                    size: 50,
                    color: Colors.orange,
                  ),
                  SizedBox(height: 10),
                  Text(
                    'Pembayaran Belum Dilakukan',
                    style: TextStyle(                    fontSize: 16,
                    color: Colors.orange,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text('Silahkan lakukan pembayaran terlebih dahulu'),
                ],
              ),
            ),
            const SizedBox(height: 20),
            Text(
              'Transaction ID: ${train.id}',
              style: const TextStyle(
                color: Colors.grey,
              ),
            ),
            const SizedBox(height: 20),
            Card(
              elevation: 2,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      train.name,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(train.operator),
                    const SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(train.date),
                            Text(train.time),
                            Text(train.departure),
                          ],
                        ),
                        Column(
                          children: [
                            Text(train.duration),
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text(train.date),
                            Text(train.arrivalTime),
                            Text(train.arrival),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
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
            const Text('Alif Lohen'),
            const SizedBox(height: 10),
            Row(
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Text('Tanggal Lahir: 30 Mar 2003'),
                    Text('Jenis Kelamin: Laki-laki'),
                    Text('Kursi: A1'),
                  ],
                ),
                const Spacer(),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Text('Status Tiket: Menunggu pembayaran'),
                    Text('Kelas: Ekonomi'),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 20),
            const Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Total Biaya',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  'Rp150.000',
                  style: TextStyle(
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
                  Navigator.pushReplacementNamed(context, '/payment-success');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.primaryColor,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  minimumSize: const Size(double.infinity, 0),
                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: const Text(
                  'UPLOAD BUKTI PEMBAYARAN',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
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
                  padding: const EdgeInsets.symmetric(vertical: 15),
                  side: const BorderSide(color: AppTheme.primaryColor),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: const Text(
                  'PESAN TIKET LAIN',
                  style: TextStyle(
                    color: AppTheme.primaryColor,
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
                  padding: const EdgeInsets.symmetric(vertical: 15),
                  side: const BorderSide(color: AppTheme.primaryColor),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: const Text(
                  'DOWNLOAD TIKET',
                  style: TextStyle(
                    color: AppTheme.primaryColor,
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