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

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await dotenv.load(fileName: '.env');
  
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
        '/home': (context) => const HomeScreen(),
        '/login': (context) => const LoginScreen(),
        '/register': (context) => const RegisterScreen(),
        '/schedule': (context) => const ScheduleScreen(),
        '/booking-history': (context) => const BookingHistoryScreen(),
      },
      onGenerateRoute: (settings) {
        if (settings.name == '/passenger-data') {
          final Train train = settings.arguments as Train;
          String selectedSeat = '';
          if (settings.arguments is Map && (settings.arguments as Map).containsKey('selectedSeat')) {
             selectedSeat = (settings.arguments as Map)['selectedSeat'] as String;
          } else if (settings.arguments is PassengerDataScreenArguments) {
            selectedSeat = (settings.arguments as PassengerDataScreenArguments).selectedSeat;
          }

          return MaterialPageRoute(
            builder: (context) => PassengerDataScreen(train: train, selectedSeat: selectedSeat),
          );
        }
        return null;
      },
      debugShowCheckedModeBanner: false,
    );
  }
}

class PassengerDataScreenArguments {
  final Train train;
  final String selectedSeat;

  PassengerDataScreenArguments({required this.train, required this.selectedSeat});
}
