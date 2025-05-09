import 'package:flutter/material.dart';
import 'package:keretaxpress/models/train.dart';
import 'package:keretaxpress/utils/theme.dart';
import 'package:keretaxpress/widgets/app_bar.dart';
import 'package:keretaxpress/widgets/train_card.dart';
import 'package:keretaxpress/screens/passenger_data_screen.dart';
import 'package:keretaxpress/core/services/api_service.dart';
import 'package:keretaxpress/models/station.dart';

class ScheduleScreen extends StatefulWidget {
  const ScheduleScreen({super.key});

  @override
  _ScheduleScreenState createState() => _ScheduleScreenState();
}

class _ScheduleScreenState extends State<ScheduleScreen> {
  final ApiService _apiService = ApiService();
  List<Train> _trains = [];
  List<Station> _stations = [];
  Station? _selectedDepartureStation;
  Station? _selectedArrivalStation;
  bool _isLoading = true;
  String _searchQuery = '';
  DateTime _selectedDate = DateTime.now();
  String? _errorMessage;
  bool _showAllTrains = false;

  @override
  void initState() {
    super.initState();
    _fetchStations().then((_) {
      _fetchAllTrains();
    });
  }

  Future<void> _fetchStations() async {
    try {
      final response = await _apiService.getStations();
      if (response != null && response is List) {
        setState(() {
          _stations = response.map((data) => Station.fromJson(data)).toList();
          if (_stations.isNotEmpty) {
            _selectedDepartureStation = _stations.first;
            _selectedArrivalStation = _stations.length > 1 ? _stations[1] : _stations.first;
          }
        });
        await _fetchTrains();
      }
    } catch (e) {
      setState(() {
        _errorMessage = 'Failed to load stations: $e';
      });
    }
  }

  Future<void> _fetchTrains() async {
    if (_selectedDepartureStation == null || _selectedArrivalStation == null) {
      setState(() {
        _errorMessage = 'Please select both departure and arrival stations.';
      });
      return;
    }
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });
    try {
      final departureStationId = _selectedDepartureStation!.id;
      final arrivalStationId = _selectedArrivalStation!.id;
      final dateStr = _selectedDate.toIso8601String().split('T')[0];

      final response = await _apiService.get('/trains/search?departure_station=$departureStationId&arrival_station=$arrivalStationId&date=$dateStr');

      if (response != null && response['trains'] != null && response['trains'] is List) {
        setState(() {
          _trains = (response['trains'] as List).map((data) => Train.fromJson(data)).toList();
          _isLoading = false;
        });
      } else {
        setState(() {
          _trains = [];
          _isLoading = false;
          _errorMessage = 'No trains found.';
        });
      }
    } catch (e) {
      setState(() {
        _trains = [];
        _isLoading = false;
        _errorMessage = 'Failed to load trains: $e';
      });
    }
  }

  Future<void> _fetchAllTrains() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });
    try {
      final response = await _apiService.getAllTrains();
      if (response != null && response['trains'] != null && response['trains'] is List) {
        setState(() {
          _trains = (response['trains'] as List).map((data) => Train.fromJson(data)).toList();
          _isLoading = false;
          _showAllTrains = true;
        });
      } else {
        setState(() {
          _trains = [];
          _isLoading = false;
          _errorMessage = 'No trains found.';
          _showAllTrains = true;
        });
      }
    } catch (e) {
      setState(() {
        _trains = [];
        _isLoading = false;
        _errorMessage = 'Failed to load trains: $e';
        _showAllTrains = true;
      });
    }
  }

  void _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate,
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 365)),
    );
    if (picked != null && picked != _selectedDate) {
      setState(() {
        _selectedDate = picked;
      });
      // Optionally refetch or filter trains by date
    }
  }

  @override
  Widget build(BuildContext context) {
    final filteredTrains = _trains.where((train) {
      final query = _searchQuery.toLowerCase();
      return train.name.toLowerCase().contains(query) ||
          train.departure.toLowerCase().contains(query) ||
          train.arrival.toLowerCase().contains(query);
    }).toList();

    final trainsToShow = _showAllTrains ? _trains : filteredTrains;

    return Scaffold(
      appBar: const CustomAppBar(),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            const Text(
              'Pilih Jadwal Keberangkatan',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 10),
            ConstrainedBox(
              constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width),
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Wrap(
                  spacing: 10,
                  crossAxisAlignment: WrapCrossAlignment.center,
                  children: [
                    const Icon(Icons.location_on, color: AppTheme.primaryColor),
                    SizedBox(
                      width: 150,
                      child: DropdownButton<Station>(
                        isExpanded: true,
                        value: _selectedDepartureStation ?? (_stations.isNotEmpty ? _stations.first : null),
                        hint: const Text('Select Departure'),
                        items: _stations.map((station) {
                          return DropdownMenuItem<Station>(
                            value: station,
                            child: Text(station.toString()),
                          );
                        }).toList(),
                        onChanged: (Station? newValue) {
                          setState(() {
                            _selectedDepartureStation = newValue;
                            _showAllTrains = false;
                          });
                          _fetchTrains();
                        },
                      ),
                    ),
                    const Icon(Icons.arrow_right_alt, color: AppTheme.primaryColor),
                    const Icon(Icons.location_on, color: AppTheme.primaryColor),
                    SizedBox(
                      width: 150,
                      child: DropdownButton<Station>(
                        isExpanded: true,
                        value: _selectedArrivalStation ?? (_stations.length > 1 ? _stations[1] : (_stations.isNotEmpty ? _stations.first : null)),
                        hint: const Text('Select Arrival'),
                        items: _stations.map((station) {
                          return DropdownMenuItem<Station>(
                            value: station,
                            child: Text(station.toString()),
                          );
                        }).toList(),
                        onChanged: (Station? newValue) {
                          setState(() {
                            _selectedArrivalStation = newValue;
                            _showAllTrains = false;
                          });
                          _fetchTrains();
                        },
                      ),
                    ),
                    SizedBox(
                      width: 140,
                      child: ElevatedButton(
                        onPressed: () {
                          _fetchAllTrains();
                        },
                        child: const Text('Show All Trains'),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),
            TextField(
              decoration: InputDecoration(
                hintText: 'Cari Kereta...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              onChanged: (value) {
                setState(() {
                  _searchQuery = value;
                });
              },
            ),
            const SizedBox(height: 20),
            const Text(
              'Kereta Yang Tersedia',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 10),
            _isLoading
                ? const Center(child: CircularProgressIndicator())
                : trainsToShow.isEmpty
                    ? const Center(child: Text('Tidak ada kereta yang ditemukan.'))
                    : ListView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: trainsToShow.length,
                        itemBuilder: (context, index) {
                          return TrainCard(
                            train: trainsToShow[index],
                            onTap: () {
                              Navigator.pushNamed(
                                context,
                                '/passenger-data',
                                arguments: trainsToShow[index],
                              );
                            },
                          );
                        },
                      ),
          ],
        ),
      ),
    );
  }

  String _monthName(int month) {
    const months = [
      '',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Okt',
      'Nov',
      'Des'
    ];
    return months[month];
  }
}
