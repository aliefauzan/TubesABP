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
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await dotenv.load(fileName: '.env');
  
  await Supabase.initialize(
    url: dotenv.env['SUPABASE_PROJECT_URL']!,
    anonKey: dotenv.env['SUPABASE_ANON_KEY']!,
  );
  
  runApp(const KeretaXpressApp());
}

class KeretaXpressApp extends StatelessWidget {
  const KeretaXpressApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'KeretaXpress',
      theme: AppTheme.theme,
      initialRoute: '/',
      routes: {
        '/': (context) => const HomeScreen(),
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
            builder: (context) => PassengerDataScreen(train: train),
          );
        }
        return null;
      },
      debugShowCheckedModeBanner: false,
    );
  }
}