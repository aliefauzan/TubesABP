import 'package:flutter/material.dart';
import '../widgets/app_bar.dart';
import '../models/booking.dart';

class BookingHistoryScreen extends StatelessWidget {
  const BookingHistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Sample booking data
    List<Booking> bookings = [
      Booking(
        transactionId: '35151859256378',
        trainName: 'Serayu 255',
        operator: 'PT.KAI',
        date: 'Nov 16',
        time: '00:15',
        departure: 'Kiaracondong',
        arrival: 'Jatinegara',
        status: 'Sudah dibayar',
        price: 'Rp.150.000',
      ),
      Booking(
        transactionId: '35151859256379',
        trainName: 'Argo Parahyangan',
        operator: 'PT.KAI',
        date: 'Nov 17',
        time: '08:00',
        departure: 'Bandung',
        arrival: 'Jakarta',
        status: 'Sudah dibayar',
        price: 'Rp.350.000',
      ),
    ];

    return Scaffold(
      appBar: const CustomAppBar(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Riwayat Pemesanan',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: bookings.length,
              itemBuilder: (context, index) {
                return Card(
                  margin: const EdgeInsets.only(bottom: 16),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Transaction ID : ${bookings[index].transactionId}'),
                        const SizedBox(height: 10),
                        Text(
                          bookings[index].trainName,
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        Text(bookings[index].operator),
                        const SizedBox(height: 10),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(bookings[index].date),
                                Text(bookings[index].time),
                                Text(bookings[index].departure),
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
                                Text(bookings[index].date),
                                Text('03:55'),
                                Text(bookings[index].arrival),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Status Pembayaran'),
                            Chip(
                              label: Text(bookings[index].status),
                              backgroundColor: Colors.green,
                              labelStyle: const TextStyle(color: Colors.white),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Total Biaya'),
                            Text(
                              bookings[index].price,
                              style: const TextStyle(fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        SizedBox(
                          width: double.infinity,
                          child: OutlinedButton(
                            onPressed: () {
                              // Upload payment proof
                            },
                            child: const Text('Upload bukti pembayaran'),
                          ),
                        ),
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
              },
            ),
          ],
        ),
      ),
    );
  }
}