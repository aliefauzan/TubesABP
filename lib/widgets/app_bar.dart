import 'package:flutter/material.dart';

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  const CustomAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'KERETAXPRESS',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          Text(
            'AYO MAIK KERETA',
            style: TextStyle(fontSize: 12),
          ),
        ],
      ),
      actions: [
        IconButton(
          icon: const Icon(Icons.notifications),
          onPressed: () {},
        ),
      ],
      // Update the bottom navigation in CustomAppBar
      bottom: PreferredSize(
        preferredSize: const Size.fromHeight(40),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              TextButton(
                onPressed: () {
                  Navigator.pushNamedAndRemoveUntil(
                    context, 
                    '/', 
                    (route) => false
                  );
                },
                child: const Text('BERANDA'),
              ),
              TextButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/schedule');
                },
                child: const Text('JADWAL KEBERANGKATAN'),
              ),
              TextButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/schedule');
                },
                child: const Text('PESAN KERETA'),
              ),
              TextButton(
                onPressed: () {
                  // Add contact screen if needed
                },
                child: const Text('HUBUNGI KAMI'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(100);
}