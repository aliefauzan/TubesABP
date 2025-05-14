import 'package:flutter/material.dart';
import 'package:keretaxpress/screens/home_screen.dart';
import 'package:keretaxpress/screens/login_screen.dart';
import 'package:keretaxpress/screens/register_screen.dart';
import 'package:keretaxpress/screens/schedule_screen.dart';
import 'package:keretaxpress/screens/passenger_data_screen.dart';
import 'package:keretaxpress/screens/payment_confirmation_screen.dart';
import 'package:keretaxpress/screens/payment_success_screen.dart';
import 'package:keretaxpress/screens/booking_history_screen.dart';
import 'package:keretaxpress/utils/theme.dart';
import 'package:keretaxpress/models/train.dart';
import 'package:keretaxpress/core/services/auth_service.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await dotenv.load(fileName: '.env');

  // Initialize authentication
  final authService = AuthService();
  await authService.initializeAuth();
  
  runApp(const KeretaXpressApp());
}

class KeretaXpressApp extends StatefulWidget {
  const KeretaXpressApp({super.key});

  @override
  State<KeretaXpressApp> createState() => _KeretaXpressAppState();
}

class _KeretaXpressAppState extends State<KeretaXpressApp> {
  final _authService = AuthService();
  bool _initialized = false;
  bool _isAuthenticated = false;

  @override
  void initState() {
    super.initState();
    _checkAuthState();
  }

  Future<void> _checkAuthState() async {
    final isAuthenticated = await _authService.isAuthenticated();
    setState(() {
      _initialized = true;
      _isAuthenticated = isAuthenticated;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!_initialized) {
      return const MaterialApp(
        home: Scaffold(
          body: Center(
            child: CircularProgressIndicator(),
          ),
        ),
      );
    }

    return MaterialApp(
      title: 'KeretaXpress',
      theme: AppTheme.theme,
      initialRoute: _isAuthenticated ? '/' : '/login',
      routes: {
        '/': (context) => const HomeScreen(),
        '/home': (context) => const HomeScreen(),
        '/login': (context) => const LoginScreen(),
        '/register': (context) => const RegisterScreen(),
        '/schedule': (context) => const ScheduleScreen(),
        '/payment-confirmation': (context) => const PaymentConfirmationScreen(),
        '/payment-success': (context) => const PaymentSuccessScreen(),
        '/booking-history': (context) => const BookingHistoryScreen(),
      },
      onGenerateRoute: (settings) {
        if (settings.name == '/passenger-data') {
          final Train train = settings.arguments as Train;
          return MaterialPageRoute(
            builder: (context) => PassengerDataScreen(train: train, selectedSeat: '',),
          );
        }
        return null;
      },
      debugShowCheckedModeBanner: false,
    );
  }
}
