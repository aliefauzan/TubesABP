import 'package:flutter/material.dart';
import 'package:keretaxpress/models/train.dart';
import 'package:keretaxpress/utils/theme.dart';
import 'package:keretaxpress/widgets/app_bar.dart';
import 'package:keretaxpress/widgets/train_card.dart';
import 'package:keretaxpress/screens/passenger_data_screen.dart';
import 'package:keretaxpress/core/services/train_service.dart';
import 'package:keretaxpress/core/services/station_service.dart';
import 'package:keretaxpress/models/station.dart';
import 'package:keretaxpress/screens/seat_selection_screen.dart';

class ScheduleScreen extends StatefulWidget {
  const ScheduleScreen({super.key});

  @override
  _ScheduleScreenState createState() => _ScheduleScreenState();
}

class _ScheduleScreenState extends State<ScheduleScreen> {
  final TrainService _trainService = TrainService();
  final StationService _stationService = StationService();
  List<Train> _trains = [];
  List<Station> _stations = [];
  Station? _selectedDepartureStation;
  Station? _selectedArrivalStation;
  bool _isLoading = true;
  String _searchQuery = '';
  DateTime _selectedDate = DateTime.now();
  String? _errorMessage;
  bool _showAllTrains = false;
  String _trainClassFilter = 'Semua';

  @override
  void initState() {
    super.initState();
    _initializeData(showAll: true);
  }

  Future<void> _initializeData({bool showAll = false}) async {
    try {
      await _fetchStations();
      if (_stations.isNotEmpty) {
        if (showAll) {
          await _fetchAllTrains();
        } else {
          await _fetchTrains();
        }
      }
    } catch (e) {
      setState(() {
        _errorMessage = 'Failed to initialize data: $e';
        _isLoading = false;
      });
    }
  }

  Future<void> _fetchStations() async {
    try {
      final response = await _stationService.getAllStations();
      if (response != null && response is List) {
        setState(() {
          _stations = response.map((data) => Station.fromJson(data)).toList();
          if (_stations.isNotEmpty) {
            _selectedDepartureStation = _stations.first;
            _selectedArrivalStation = _stations.length > 1 ? _stations[1] : _stations.first;
          }
        });
      }
    } catch (e) {
      setState(() {
        _errorMessage = 'Failed to load stations: $e';
        _isLoading = false;
      });
      rethrow;
    }
  }

  Future<void> _fetchTrains() async {
    if (_selectedDepartureStation == null || _selectedArrivalStation == null) {
      setState(() {
        _errorMessage = 'Please select both departure and arrival stations.';
        _isLoading = false;
      });
      return;
    }

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final response = await _trainService.searchTrains(
        departureStation: _selectedDepartureStation!.id.toString(),
        arrivalStation: _selectedArrivalStation!.id.toString(),
        date: _selectedDate,
      );

      if (response != null && response['trains'] != null && response['trains'] is List) {
        setState(() {
          _trains = (response['trains'] as List)
            .map((data) => Train.fromJson(data, stations: _stations))
            .toList();
          _isLoading = false;
          _showAllTrains = false;
        });
      } else {
        setState(() {
          _trains = [];
          _isLoading = false;
          _errorMessage = 'No trains found for the selected criteria.';
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
      final response = await _trainService.getAllTrains();
      if (response != null && response['trains'] != null && response['trains'] is List) {
        setState(() {
          _trains = (response['trains'] as List)
            .map((data) => Train.fromJson(data, stations: _stations))
            .toList();
          _isLoading = false;
          _showAllTrains = true;
        });
      } else {
        setState(() {
          _trains = [];
          _isLoading = false;
          _errorMessage = 'No trains available.';
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

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate,
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 365)),
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
    if (picked != null && picked != _selectedDate) {
      setState(() {
        _selectedDate = picked;
      });
      await _fetchTrains();
    }
  }

  @override
  Widget build(BuildContext context) {
    final filteredTrains = _trains.where((train) {
      final query = _searchQuery.toLowerCase();
      final matchesClass = _trainClassFilter == 'Semua' || train.classType == _trainClassFilter;
      return (train.name.toLowerCase().contains(query) ||
          train.departure.toLowerCase().contains(query) ||
          train.arrival.toLowerCase().contains(query)) && matchesClass;
    }).toList();

    return Scaffold(
      appBar: const CustomAppBar(),
      body: RefreshIndicator(
        onRefresh: _initializeData,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: ListView(
            children: [
              const Center(
                child: Text(
                  'Pilih Jadwal Keberangkatan',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
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
                        'Stasiun Keberangkatan & Kedatangan',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 16),
                      Row(
                        children: [
                          Expanded(
                            child: DropdownButtonFormField<Station>(
                              isExpanded: true,
                              decoration: InputDecoration(
                                labelText: 'Stasiun Keberangkatan',
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                prefixIcon: const Icon(Icons.location_on),
                              ),
                              value: _selectedDepartureStation,
                              items: _stations.map((station) {
                                return DropdownMenuItem<Station>(
                                  value: station,
                                  child: Text(station.toString()),
                                );
                              }).toList(),
                              onChanged: (Station? newValue) {
                                if (newValue != null) {
                                  setState(() {
                                    _selectedDepartureStation = newValue;
                                  });
                                  _fetchTrains();
                                }
                              },
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: DropdownButtonFormField<Station>(
                              isExpanded: true,
                              decoration: InputDecoration(
                                labelText: 'Stasiun Kedatangan',
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                prefixIcon: const Icon(Icons.location_on),
                              ),
                              value: _selectedArrivalStation,
                              items: _stations.map((station) {
                                return DropdownMenuItem<Station>(
                                  value: station,
                                  child: Text(station.toString()),
                                );
                              }).toList(),
                              onChanged: (Station? newValue) {
                                if (newValue != null) {
                                  setState(() {
                                    _selectedArrivalStation = newValue;
                                  });
                                  _fetchTrains();
                                }
                              },
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      // Train class filter dropdown
                      DropdownButtonFormField<String>(
                        isExpanded: true,
                        decoration: InputDecoration(
                          labelText: 'Kelas Kereta',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                          prefixIcon: const Icon(Icons.category),
                        ),
                        value: _trainClassFilter,
                        items: <String>['Semua', 'Ekonomi', 'Bisnis', 'Eksekutif']
                            .map((String value) {
                          return DropdownMenuItem<String>(
                            value: value,
                            child: Text(value),
                          );
                        }).toList(),
                        onChanged: (String? newValue) {
                          setState(() {
                            _trainClassFilter = newValue ?? 'Semua';
                          });
                        },
                      ),
                      const SizedBox(height: 16),
                      Row(
                        children: [
                          Expanded(
                            child: OutlinedButton.icon(
                              onPressed: () => _selectDate(context),
                              icon: const Icon(Icons.calendar_today),
                              label: Text(
                                '${_selectedDate.day}/${_selectedDate.month}/${_selectedDate.year}',
                              ),
                              style: OutlinedButton.styleFrom(
                                padding: const EdgeInsets.symmetric(vertical: 16),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8),
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: ElevatedButton.icon(
                              onPressed: _fetchAllTrains,
                              icon: const Icon(Icons.train),
                              label: const Text('Semua Kereta'),
                              style: ElevatedButton.styleFrom(
                                padding: const EdgeInsets.symmetric(vertical: 16),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      Row(
                        children: [
                          Expanded(
                            child: ElevatedButton.icon(
                              onPressed: _fetchTrains,
                              icon: const Icon(Icons.search),
                              label: const Text('Cari Kereta'),
                              style: ElevatedButton.styleFrom(
                                padding: const EdgeInsets.symmetric(vertical: 16),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8),
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
              if (_isLoading)
                const Center(
                  child: CircularProgressIndicator(),
                )
              else if (_errorMessage != null)
                Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(
                        Icons.error_outline,
                        color: Colors.red,
                        size: 48,
                      ),
                      const SizedBox(height: 16),
                      Text(
                        _errorMessage!,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: Colors.red,
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                )
              else if (filteredTrains.isEmpty)
                const Center(
                  child: Text(
                    'Tidak ada kereta yang tersedia',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey,
                    ),
                  ),
                )
              else
                ListView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: filteredTrains.length,
                  itemBuilder: (context, index) {
                    final train = filteredTrains[index];
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 16.0),
                      child: TrainCard(
                        train: train,
                        onTap: () async {
                          // Fetch available seats from backend
                          List<String> availableSeats = [];
                          try {
                            availableSeats = await _trainService.getAvailableSeats(
                              trainId: train.id,
                              date: train.date,
                            );
                          } catch (e) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text('Gagal memuat kursi: $e')),
                            );
                            return;
                          }
                          if (availableSeats.isEmpty) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('Tidak ada kursi tersedia untuk kereta ini.')),
                            );
                            return;
                          }
                          // Navigate to seat selection screen
                          final selectedSeat = await Navigator.push<String>(
                            context,
                            MaterialPageRoute(
                              builder: (context) => SeatSelectionScreen(availableSeats: availableSeats),
                            ),
                          );
                          if (selectedSeat != null) {
                            // Navigate to passenger data screen with selected seat
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => PassengerDataScreen(train: train, selectedSeat: selectedSeat),
                              ),
                            );
                          }
                        },
                      ),
                    );
                  },
                ),
            ],
          ),
        ),
      ),
    );
  }
}
