import 'package:flutter/material.dart';
import 'package:keretaxpress/models/train.dart';
import 'package:keretaxpress/utils/theme.dart';
import 'package:keretaxpress/widgets/app_bar.dart';
import 'package:keretaxpress/core/services/booking_service.dart';
import 'package:keretaxpress/core/services/auth_service.dart';
import 'package:keretaxpress/utils/currency_formatter.dart';
import 'package:keretaxpress/widgets/train_timeline.dart';
import 'package:intl/intl.dart';

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

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _birthDate ?? DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: ColorScheme.light(
              primary: AppTheme.primaryColor,
              onPrimary: Colors.white,
              surface: Colors.white,
              onSurface: Colors.black,
            ),
          ),
          child: child!,
        );
      },
    );
    if (picked != null && picked != _birthDate) {
      setState(() {
        _birthDate = picked;
      });
    }
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
            title: const Text('Pemesanan Berhasil'),
            content: const Text('Apa yang ingin Anda lakukan selanjutnya?'),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.pop(context); // Close dialog
                  Navigator.pushReplacementNamed(context, '/booking-history');
                },
                child: const Text('Lihat Riwayat Pemesanan'),
              ),
              TextButton(
                onPressed: () {
                  Navigator.pop(context); // Close dialog
                  Navigator.pushReplacementNamed(context, '/payment-confirmation', arguments: response);
                },
                child: const Text('Konfirmasi Pembayaran'),
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
                Text(
                  'Isi Data Penumpang',
                  style: Theme.of(context).textTheme.displayMedium,
                ),
                const SizedBox(height: 24),
                Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Detail Perjalanan',
                          style: Theme.of(context).textTheme.displaySmall,
                        ),
                        const SizedBox(height: 16),
                        TrainTimeline(
                          departureTime: widget.train.time,
                          departureStation: widget.train.departureStationName ?? widget.train.departure,
                          duration: widget.train.duration,
                          arrivalTime: widget.train.arrivalTime,
                          arrivalStation: widget.train.arrivalStationName ?? widget.train.arrival,
                        ),
                        const SizedBox(height: 16),
                        Text(
                          '${widget.train.name} ${widget.train.classType}',
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          widget.train.operator,
                          style: const TextStyle(
                            color: Colors.grey,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                Card(
                  elevation: 4,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Detail Pembayaran',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Harga tiket'),
                            Text(currencyFormat.format(parsePrice(widget.train.price))),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Total Penumpang'),
                            const Text('1'),
                          ],
                        ),
                        const Divider(),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              'Total Harga',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(
                              currencyFormat.format(parsePrice(widget.train.price)),
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
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