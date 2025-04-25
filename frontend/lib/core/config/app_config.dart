class AppConfig {
  static String get supabaseUrl => const String.fromEnvironment('SUPABASE_URL');
  static String get supabaseKey => const String.fromEnvironment('SUPABASE_KEY');
  static String get laravelApiUrl => const String.fromEnvironment('LARAVEL_API_URL');
}