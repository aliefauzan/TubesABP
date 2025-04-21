import 'package:flutter/material.dart';
import 'package:keretaxpress/models/train.dart';
import 'package:keretaxpress/utils/theme.dart';
import 'package:keretaxpress/widgets/app_bar.dart';
import 'package:keretaxpress/widgets/train_card.dart';
import 'package:keretaxpress/screens/passenger_data_screen.dart';

class ScheduleScreen extends StatelessWidget {
  const ScheduleScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Dummy train data
    final List<Train> trains = [
      Train(
        id: '1',
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
      ),
      Train(
        id: '2',
        name: 'Argo Parahyangan 43A',
        operator: 'PT. KAI',
        date: '16 Nov 2024',
        time: '08:00',
        departure: 'Bandung',
        arrival: 'Jakarta',
        arrivalTime: '11:30',
        duration: '3h 30m',
        classType: 'Eksekutif',
        price: 'Rp350.000',
        seatsLeft: 20,
      ),
      Train(
        id: '3',
        name: 'Cikuray 267',
        operator: 'PT. KAI',
        date: '16 Nov 2024',
        time: '14:00',
        departure: 'Pasar Senen',
        arrival: 'Kiaracondong',
        arrivalTime: '17:30',
        duration: '3h 30m',
        classType: 'Bisnis',
        price: 'Rp250.000',
        seatsLeft: 35,
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
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                const Icon(Icons.location_on, color: AppTheme.primaryColor),
                const SizedBox(width: 5),
                const Text('Bandung'),
                const Icon(Icons.arrow_right_alt, color: AppTheme.primaryColor),
                const Icon(Icons.location_on, color: AppTheme.primaryColor),
                const SizedBox(width: 5),
                const Text('Jakarta'),
                const Spacer(),
                TextButton(
                  onPressed: () {
                    _selectDate(context);
                  },
                  child: const Row(
                    children: [
                      Icon(Icons.calendar_today, size: 16),
                      SizedBox(width: 5),
                      Text('16 Nov 2024'),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            TextField(
              decoration: InputDecoration(
                hintText: 'Cari Kereta...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
            ),
            const SizedBox(height: 20),
            const Text(
              'Kereta Yang Tersedia',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 10),
            Expanded(
              child: ListView.builder(
                itemCount: trains.length,
                itemBuilder: (context, index) {
                  return TrainCard(
                    train: trains[index],
                    onTap: () {
                      Navigator.pushNamed(
                        context,
                        '/passenger-data',
                        arguments: trains[index],
                      );
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

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 365)),
    );
    if (picked != null) {
      // Handle date selection
    }
  }
}