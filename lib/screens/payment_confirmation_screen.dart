import 'package:flutter/material.dart';
import '../widgets/app_bar.dart';

class PaymentConfirmationScreen extends StatelessWidget {
  const PaymentConfirmationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Konfirmasi Pembayaran',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            const Center(
              child: Text(
                'Pembayaran Belum Dilakukan',
                style: TextStyle(fontSize: 18, color: Colors.red),
              ),
            ),
            const Center(
              child: Text('Silahkan Lakukan Pembayaran Terlebih Dahulu'),
            ),
            const SizedBox(height: 20),
            const Text('Transaction ID : 35151859256378'),
            const SizedBox(height: 20),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Serayu 255',
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    const Text('PT.KAI'),
                    const SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('Nov 16'),
                            const Text('00:15'),
                            const Text('Karacondang'),
                          ],
                        ),
                        const Column(
                          children: [
                            Text('3h 40m'),
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            const Text('Nov 16'),
                            const Text('03:55'),
                            const Text('Jathregara'),
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
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            const Text('Alif Lohen'),
            const SizedBox(height: 10),
            Row(
              children: [
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Tanggal Lahir : 30 Mar 2003'),
                    Text('Jenis Kelamin : Laki - Laki'),
                  ],
                ),
                const Spacer(),
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Status tiket : Telah dikonfirmasi'),
                    Text('Jenis kursi : Ekonomi'),
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
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                Text(
                  'Rp.150.000',
                  style: TextStyle(fontWeight: FontWeight.bold),
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
                child: const Text('Upload bukti pembayaran'),
              ),
            ),
            const SizedBox(height: 10),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: () {
                  // Book another ticket
                },
                child: const Text('Pesan tiket lain'),
              ),
            ),
            const SizedBox(height: 10),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: () {
                  // Download ticket
                },
                child: const Text('Download tiket'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}