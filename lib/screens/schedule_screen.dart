import 'package:flutter/material.dart';
import '../widgets/app_bar.dart';
import '../widgets/train_card.dart';
import '../models/train.dart';

class ScheduleScreen extends StatelessWidget {
  const ScheduleScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Sample train data
    List<Train> trains = [
      Train(
        name: 'Serayu 255',
        operator: 'PT. KAI',
        date: '16 Nov 2024',
        time: '03:15',
        departure: 'Kiaracondong',
        classType: 'Ekonomi',
        price: 'Rp.150.000',
        seatsLeft: 50,
      ),
      Train(
        name: 'Argo Parahyangan 43A',
        operator: 'PT. KAI',
        date: '16 Nov 2024',
        time: '03:55',
        departure: 'Jatinegara',
        classType: 'Eksekutif',
        price: 'Rp.350.000',
        seatsLeft: 50,
      ),
      Train(
        name: 'Cikuray 267',
        operator: 'PT. KAI',
        date: '16 Nov 2024',
        time: '03:55',
        departure: 'Pasar Senen',
        classType: 'Bisnis',
        price: 'Rp.250.000',
        seatsLeft: 50,
      ),
    ];

    return Scaffold(
      appBar: const CustomAppBar(),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Pilih Jadwal Keberangkatan',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                const Icon(Icons.location_on),
                const SizedBox(width: 5),
                const Text('Bandung, Indonesia'),
                const Icon(Icons.arrow_right_alt),
                const Icon(Icons.location_on),
                const SizedBox(width: 5),
                const Text('Jakarta, Indonesia'),
                const Spacer(),
                TextButton(
                  onPressed: () {
                    // Show date picker
                  },
                  child: const Text('16 Nov 2024'),
                ),
              ],
            ),
            const SizedBox(height: 20),
            TextField(
              decoration: InputDecoration(
                hintText: 'Cari Kereta',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
            ),
            const SizedBox(height: 20),
            const Text(
              'Kereta Yang Tersedia',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            Expanded(
              child: ListView.builder(
                itemCount: trains.length,
                itemBuilder: (context, index) {
                  return TrainCard(
                    train: trains[index],
                    onTap: () {
                      Navigator.pushNamed(context, '/passenger-data');
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}