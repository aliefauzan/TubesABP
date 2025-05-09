import 'package:flutter/material.dart';
import 'package:keretaxpress/utils/theme.dart';

import 'package:flutter/material.dart';
import 'package:keretaxpress/utils/theme.dart';
import 'package:keretaxpress/core/services/api_service.dart';
import 'package:keretaxpress/core/services/auth_service.dart';

class CustomAppBar extends StatefulWidget implements PreferredSizeWidget {
  const CustomAppBar({super.key});

  @override
  State<CustomAppBar> createState() => _CustomAppBarState();

  @override
  Size get preferredSize => const Size.fromHeight(110);
}

class _CustomAppBarState extends State<CustomAppBar> {
  bool _isLoggedIn = false;
  String _userId = '';
  String _userName = '';
  String _userEmail = '';
  final AuthService _authService = AuthService();
  final ApiService _apiService = ApiService();

  @override
  void initState() {
    super.initState();
    _checkLoginStatus();
  }

  void _checkLoginStatus() async {
    bool loggedIn = _apiService.isLoggedIn();
    if (loggedIn) {
      try {
        // Get user UUID from local storage or token
        // Since ApiService does not have getUserUUID, get from AuthService or other means
        String? userUUID = await _authService.getUserUUID();
        print('DEBUG: userUUID = $userUUID');
        if (userUUID == null || userUUID.isEmpty) {
          setState(() {
            _isLoggedIn = true;
            _userName = '';
            _userEmail = '';
          });
          return;
        }
        final userInfo = await _apiService.getUserInfo(userUUID);
        setState(() {
          _isLoggedIn = true;
          _userName = userInfo['user'] != null ? userInfo['user']['name'] ?? '' : '';
          _userEmail = userInfo['user'] != null ? userInfo['user']['email'] ?? '' : '';
        });
      } catch (e) {
        print('DEBUG: error in _checkLoginStatus: $e');
        setState(() {
          _isLoggedIn = false;
          _userId = '';
          _userName = '';
          _userEmail = '';
        });
      }
    } else {
      setState(() {
        _isLoggedIn = false;
        _userId = '';
        _userName = '';
        _userEmail = '';
      });
    }
  }

  void _logout() async {
    await _authService.signOut();
    _apiService.setToken('');
    setState(() {
      _isLoggedIn = false;
      _userName = '';
      _userEmail = '';
    });
    if (mounted) {
      Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
    }
  }

  void _showAccountDialog() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Akun'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Nama: $_userName'),
              const SizedBox(height: 8),
              Text('Email: $_userEmail'),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Tutup'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
                _logout();
              },
              child: const Text('Logout'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Image.asset(
            'assets/logo/logo_white.png',
            height: 40,
          ),
          const SizedBox(width: 8),
          Flexible(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
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
                TextButton.icon(
                  onPressed: () {
                    if (_isLoggedIn) {
                      _showAccountDialog();
                    } else {
                      Navigator.pushNamed(context, '/login');
                    }
                  },
                  icon: const Icon(Icons.account_circle, color: AppTheme.primaryColor),
                  label: const Text(
                    'AKUN',
                    style: TextStyle(
                      color: AppTheme.textColor,
                      fontSize: 12,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
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
