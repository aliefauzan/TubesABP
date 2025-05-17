import 'package:flutter/material.dart';
import 'package:keretaxpress/models/booking.dart';
import 'package:keretaxpress/utils/theme.dart';
import 'package:keretaxpress/utils/currency_formatter.dart';

class BookingCard extends StatelessWidget {
  final Booking booking;
  final bool isLoadingAction;
  final Function(Booking) onUploadPaymentProof;
  final Function(Booking) onDownloadTicket;

  const BookingCard({
    super.key,
    required this.booking,
    required this.isLoadingAction,
    required this.onUploadPaymentProof,
    required this.onDownloadTicket,
  });

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Card(
      elevation: 2,
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header with train name and status
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    booking.trainName,
                    style: textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: booking.status == 'Sudah dibayar'
                        ? Colors.green.shade50
                        : Colors.orange.shade50,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Text(
                    booking.status,
                    style: textTheme.bodySmall?.copyWith(
                      color: booking.status == 'Sudah dibayar'
                          ? Colors.green.shade700
                          : Colors.orange.shade700,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 4),
            Text(
              booking.operator,
              style: textTheme.bodyMedium?.copyWith(
                color: Colors.grey[700],
              ),
            ),
            const SizedBox(height: 24),

            // Timeline section
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Departure details
                Expanded(
                  flex: 2,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        booking.time,
                        style: textTheme.titleMedium?.copyWith(
                          color: AppTheme.primaryColor,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        booking.departure,
                        style: textTheme.bodyMedium?.copyWith(
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
                  // Timeline visualization
                Expanded(
                  flex: 3,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      SizedBox(
                        height: 32,
                        child: Stack(
                          alignment: Alignment.center,
                          children: [
                            Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 12.0),
                              child: Container(
                                height: 2,
                                color: Colors.blue.shade200,
                              ),
                            ),
                            Center(
                              child: Container(
                                padding: const EdgeInsets.all(4),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  shape: BoxShape.circle,
                                  border: Border.all(
                                    color: Colors.blue.shade400,
                                    width: 2,
                                  ),
                                ),
                                child: Icon(
                                  Icons.train,
                                  size: 14,
                                  color: Colors.blue.shade700,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '3j 40m', // You might want to calculate this from actual data
                        style: textTheme.bodySmall?.copyWith(
                          color: Colors.blue.shade700,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),

                // Arrival details
                Expanded(
                  flex: 2,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        '--:--', // Arrival time if available
                        style: textTheme.titleMedium?.copyWith(
                          color: AppTheme.primaryColor,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        booking.arrival,
                        style: textTheme.bodyMedium?.copyWith(
                          fontWeight: FontWeight.w500,
                        ),
                        textAlign: TextAlign.end,
                      ),
                    ],
                  ),
                ),
              ],
            ),

            const SizedBox(height: 24),
            // Price and actions
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'ID: ${booking.transactionId}',
                  style: textTheme.bodySmall?.copyWith(
                    color: Colors.grey[600],
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      'Total Biaya',
                      style: textTheme.bodySmall?.copyWith(
                        color: Colors.grey[600],
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      currencyFormat.format(parsePrice(booking.price)),
                      style: textTheme.titleMedium?.copyWith(
                        color: AppTheme.primaryColor,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: isLoadingAction 
                        ? null 
                        : () => onUploadPaymentProof(booking),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: AppTheme.primaryColor,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                    child: const Text('Upload Bukti'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton(
                    onPressed: isLoadingAction 
                        ? null 
                        : () => onDownloadTicket(booking),
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                    child: const Text('Download Tiket'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}