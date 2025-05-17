import 'package:flutter/material.dart';
import 'package:keretaxpress/utils/theme.dart';

class TimelineWidget extends StatelessWidget {
  final String duration;
  final double height;
  final double iconSize;

  const TimelineWidget({
    super.key,
    required this.duration,
    this.height = 32,
    this.iconSize = 14,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        SizedBox(
          height: height,
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
                    size: iconSize,
                    color: Colors.blue.shade700,
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 4),
        Text(
          duration,
          style: TextStyle(
            color: Colors.blue.shade700,
            fontWeight: FontWeight.w500,
            fontSize: 12,
          ),
        ),
      ],
    );
  }
}
