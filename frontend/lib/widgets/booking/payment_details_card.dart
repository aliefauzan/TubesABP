import 'package:flutter/material.dart';
import 'package:keretaxpress/utils/currency_formatter.dart';
// Potentially AppTheme if specific colors are used directly, otherwise Theme.of(context) is fine

class PaymentDetailsCard extends StatelessWidget {
  final String price;
  // final int numberOfPassengers; // If this can vary, otherwise default to 1

  const PaymentDetailsCard({
    super.key,
    required this.price,
    // this.numberOfPassengers = 1, // Defaulting to 1 for now
  });

  @override
  Widget build(BuildContext context) {
    final parsedPrice = parsePrice(price);
    // final totalPasengers = numberOfPassengers; // If used

    return Card(
      elevation: 2, // Consistent with other cards
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      margin: const EdgeInsets.symmetric(vertical: 8.0), // Standard margin
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Detail Pembayaran',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Harga tiket'),
                Text(currencyFormat.format(parsedPrice)),
              ],
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Total Penumpang'),
                const Text('1'), // Assuming 1 passenger for now
              ],
            ),
            const Divider(height: 20, thickness: 1),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Total Harga',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
                ),
                Text(
                  currencyFormat.format(parsedPrice), // Assuming price is per passenger and only 1 passenger
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
} 