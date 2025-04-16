import 'package:flutter/material.dart';
import 'package:keretaxpress/utils/theme.dart';

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  const CustomAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset(
            'assets/logo/logo_white.png',
            height: 40,
          ),
          const SizedBox(width: 8),
          const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'KERETAXPRESS',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                  color: Colors.white,
                ),
              ),
              Text(
                'AYO NAIK KERETA',
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.white,
                ),
              ),
            ],
          ),
        ],
      ),
      actions: [
        IconButton(
          icon: const Icon(Icons.notifications, color: Colors.white),
          onPressed: () {},
        ),
      ],
      bottom: PreferredSize(
        preferredSize: const Size.fromHeight(50),
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white,
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.3),
                spreadRadius: 1,
                blurRadius: 5,
              ),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _NavButton(
                  label: 'BERANDA',
                  icon: Icons.home,
                  onPressed: () => Navigator.pushNamedAndRemoveUntil(
                    context, '/', (route) => false),
                ),
                _NavButton(
                  label: 'JADWAL',
                  icon: Icons.schedule,
                  onPressed: () => Navigator.pushNamed(context, '/schedule'),
                ),
                _NavButton(
                  label: 'PESAN',
                  icon: Icons.train,
                  onPressed: () => Navigator.pushNamed(context, '/schedule'),
                ),
                _NavButton(
                  label: 'KONTAK',
                  icon: Icons.contact_support,
                  onPressed: () {},
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(110);
}

class _NavButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final VoidCallback onPressed;

  const _NavButton({
    required this.label,
    required this.icon,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return TextButton.icon(
      onPressed: onPressed,
      icon: Icon(icon, color: AppTheme.primaryColor),
      label: Text(
        label,
        style: const TextStyle(
          color: AppTheme.textColor,
          fontSize: 12,
        ),
      ),
    );
  }
}