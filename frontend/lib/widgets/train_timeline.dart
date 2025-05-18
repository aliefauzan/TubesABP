import 'package:flutter/material.dart';
// import 'package:keretaxpress/utils/theme.dart';

class TrainTimeline extends StatelessWidget {
  final String departureTime;
  final String departureStation;
  final String duration;
  final String arrivalTime;
  final String arrivalStation;

  const TrainTimeline({
    super.key,
    required this.departureTime,
    required this.departureStation,
    required this.duration,
    required this.arrivalTime,
    required this.arrivalStation,
  });

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final primaryColor = Colors.blue[600]!;

    return SizedBox(
      width: double.infinity,
      height: 60, // Fixed height to ensure consistent spacing
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Horizontal line
          Positioned(
            left: 0,
            right: 0,
            top: 20,
            child: Container(
              height: 1,
              color: Colors.blue.withOpacity(0.1), // More transparent
            ),
          ),
          // Train icon in circle
          Positioned(
            top: 6,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 35, // Slightly larger circle
                  height: 35,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: Colors.blue.withOpacity(0.1),
                      width: 1,
                    ),
                  ),
                  child: Center(
                    child: Icon(
                      Icons.train,
                      size: 18,
                      color: primaryColor.withOpacity(0.8),
                    ),
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  duration,
                  style: textTheme.bodySmall?.copyWith(
                    color: Colors.grey[600],
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
          // Time and station info
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Departure info
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    departureTime,
                    style: textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                      fontSize: 18,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    departureStation,
                    style: textTheme.bodyMedium?.copyWith(
                      color: Colors.grey[600],
                      fontSize: 13,
                    ),
                  ),
                ],
              ),
              const SizedBox(width: 40),
              // Arrival info
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    arrivalTime,
                    style: textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                      fontSize: 18,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    arrivalStation,
                    style: textTheme.bodyMedium?.copyWith(
                      color: Colors.grey[600],
                      fontSize: 13,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}
