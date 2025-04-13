import 'package:flutter/material.dart';
import 'screens/home_screen.dart';
import 'screens/login_screen.dart';
import 'screens/register_screen.dart';
import 'screens/schedule_screen.dart';
import 'screens/passenger_data_screen.dart';
import 'screens/payment_confirmation_screen.dart';
import 'screens/booking_history_screen.dart';
import 'screens/payment_success_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'KeretaXpress',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: 'Roboto',
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const HomeScreen(),
        '/login': (context) => const LoginScreen(),
        '/register': (context) => const RegisterScreen(),
        '/schedule': (context) => const ScheduleScreen(),
        '/passenger-data': (context) => const PassengerDataScreen(),
        '/payment-confirmation': (context) => const PaymentConfirmationScreen(),
        '/payment-success': (context) => const PaymentSuccessScreen(),
        '/booking-history': (context) => const BookingHistoryScreen(),
      },
      debugShowCheckedModeBanner: false,
    );
  }
}

