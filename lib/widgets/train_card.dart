import 'package:flutter/material.dart';
import '../models/train.dart';

class TrainCard extends StatelessWidget {
  final Train train;
  final VoidCallback onTap;

  const TrainCard({
    super.key,
    required this.train,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '${train.name}',
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  Text('Sisa kursi ${train.seatsLeft}'),
                ],
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
                      Text(train.classType),
                      Text(train.price),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}