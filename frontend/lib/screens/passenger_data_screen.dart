import 'package:flutter/material.dart';
import 'package:keretaxpress/models/train.dart';
import 'package:keretaxpress/utils/theme.dart';
import 'package:keretaxpress/widgets/app_bar.dart';
import 'package:keretaxpress/core/services/booking_service.dart';
import 'package:keretaxpress/core/services/auth_service.dart';
import 'package:keretaxpress/utils/currency_formatter.dart';
import 'package:keretaxpress/widgets/train_timeline.dart';
import 'package:intl/intl.dart';
import 'package:keretaxpress/screens/payment_confirmation_screen.dart';
import 'package:keretaxpress/widgets/booking/passenger_form.dart';
import 'package:keretaxpress/widgets/booking/trip_details_card.dart';
import 'package:keretaxpress/widgets/booking/payment_details_card.dart';

class PassengerDataScreen extends StatefulWidget {
  final Train train;
  final String selectedSeat;

  const PassengerDataScreen({
    super.key,
    required this.train,
    required this.selectedSeat,
  });

  @override
  _PassengerDataScreenState createState() => _PassengerDataScreenState();
}

class _PassengerDataScreenState extends State<PassengerDataScreen> {
  final _formKey = GlobalKey<FormState>();
  final _bookingService = BookingService();
  final _nameController = TextEditingController();
  final _idNumberController = TextEditingController();
  DateTime? _birthDate;
  String _gender = 'Laki-laki';
  bool _isLoading = false;
  String? _errorMessage;
  String _paymentMethod = 'transfer';

  @override
  void dispose() {
    _nameController.dispose();
    _idNumberController.dispose();
    super.dispose();
  }

  Future<void> _submitBooking() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    if (_birthDate == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please select birth date'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final authService = AuthService();
      final userUUID = await authService.getUserUUID();
      final bookingData = {
        'user_uuid': userUUID,
        'train_id': widget.train.id,
        'travel_date': widget.train.date,
        'passenger_name': _nameController.text,
        'passenger_gender': _gender == 'Laki-laki' ? 'male' : 'female',
        'passenger_id_number': _idNumberController.text,
        'passenger_dob': DateFormat('yyyy-MM-dd').format(_birthDate!),
        'payment_method': _paymentMethod,
        'seat_number': widget.selectedSeat,
      };

      final response = await _bookingService.book(bookingData);

      if (mounted) {
        showDialog(
          context: context,
          barrierDismissible: false,
          builder: (context) => AlertDialog(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
            title: const Padding(
              padding: EdgeInsets.only(top: 16.0, bottom: 8.0),
              child: Text(
                'Pemesanan Berhasil',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
            ),
            content: const Padding(
              padding: EdgeInsets.symmetric(vertical: 8.0),
              child: Text(
                'Apa yang ingin Anda lakukan selanjutnya?',
                textAlign: TextAlign.center,
              ),
            ),
            actionsAlignment: MainAxisAlignment.center,
            actions: [
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    ElevatedButton(
                      onPressed: () {
                        Navigator.pop(context);
                        Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const PaymentConfirmationScreen(),
                            settings: RouteSettings(
                              arguments: {
                                'booking': response,
                                'train': widget.train,
                              },
                            ),
                          ),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.primaryColor,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        padding: const EdgeInsets.symmetric(vertical: 12),
                      ),
                      child: const Text(
                        'Konfirmasi Pembayaran',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                    const SizedBox(height: 8),
                    OutlinedButton(
                      onPressed: () {
                        Navigator.pop(context);
                        Navigator.pushReplacementNamed(context, '/booking-history');
                      },
                      style: OutlinedButton.styleFrom(
                        side: const BorderSide(color: AppTheme.primaryColor),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        padding: const EdgeInsets.symmetric(vertical: 12),
                      ),
                      child: const Text(
                        'Lihat Riwayat Pemesanan',
                        style: TextStyle(
                          color: AppTheme.primaryColor,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      }
    } catch (e) {
      setState(() {
        _errorMessage = e.toString();
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(_errorMessage!),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Text(
                    'Isi Data Penumpang',
                    style: Theme.of(context).textTheme.displayMedium,
                    textAlign: TextAlign.center,
                  ),
                ),
                const SizedBox(height: 24),

                // --- Passenger Data Form Fields ---
                PassengerForm(
                  nameController: _nameController,
                  idNumberController: _idNumberController,
                  initialBirthDate: _birthDate,
                  initialGender: _gender,
                  onBirthDateChanged: (date) {
                    setState(() {
                      _birthDate = date;
                    });
                  },
                  onGenderChanged: (gender) {
                    setState(() {
                      _gender = gender;
                    });
                  },
                ),
                const SizedBox(height: 24),
                // --- End Passenger Data Form Fields ---

                TripDetailsCard(train: widget.train),

                const SizedBox(height: 20),
                PaymentDetailsCard(price: widget.train.price),

                const SizedBox(height: 16),
                DropdownButtonFormField<String>(
                  value: _paymentMethod,
                  decoration: InputDecoration(
                    labelText: 'Metode Pembayaran',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    prefixIcon: const Icon(Icons.payment),
                  ),
                  items: [
                    DropdownMenuItem(value: 'transfer', child: Text('Transfer Bank')),
                    // Add more payment methods here if needed
                  ],
                  onChanged: (value) {
                    if (value != null) {
                      setState(() {
                        _paymentMethod = value;
                      });
                    }
                  },
                ),
                const SizedBox(height: 20),
                Row(
                  children: [
                    Expanded(
                      child: OutlinedButton(
                        onPressed: _isLoading ? null : () => Navigator.pop(context),
                        style: OutlinedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          side: const BorderSide(color: AppTheme.primaryColor),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        child: const Text(
                          'BATALKAN',
                          style: TextStyle(
                            color: AppTheme.primaryColor,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: ElevatedButton(
                        onPressed: _isLoading ? null : _submitBooking,
                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        child: _isLoading
                            ? const SizedBox(
                                width: 24,
                                height: 24,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                                ),
                              )
                            : const Text(
                                'LANJUTKAN',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}