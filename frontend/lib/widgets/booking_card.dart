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
            // Passenger Name (Centered)
            if (booking.passengerName.isNotEmpty)
              Center(
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 8.0), // Increased bottom padding
                  child: Text(
                    booking.passengerName,
                    style: textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center, // Ensure text itself is centered if it wraps
                    maxLines: 2, // Allow for a slightly longer name to wrap
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ),
            
            // Header with train name and status
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Text(
                    booking.trainName,
                    style: textTheme.titleLarge?.copyWith( // Back to titleLarge for train name
                      fontWeight: FontWeight.bold,
                    ),
                    maxLines: 2, // Allow train name to wrap if long
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                const SizedBox(width: 8), // Add some spacing before the status badge
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: (booking.status == 'paid' || booking.status == 'confirmed')
                        ? Colors.green.shade50
                        : Colors.orange.shade50,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Text(
                    booking.status,
                    style: textTheme.bodySmall?.copyWith(
                      color: (booking.status == 'paid' || booking.status == 'confirmed')
                          ? Colors.green.shade700
                          : Colors.orange.shade700,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
            // Operator below train name
            if (booking.operator.isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(top: 4.0), // Add padding above operator
                child: Text(
                  booking.operator,
                  style: textTheme.bodyMedium?.copyWith(
                    color: Colors.grey[700],
                  ),
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
                        booking.arrivalTime.isNotEmpty ? booking.arrivalTime : '--:--',
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
                if (booking.status != 'confirmed') // Conditionally render Upload Bukti button
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
                if (booking.status != 'confirmed') // Add SizedBox only if Upload Bukti is shown
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