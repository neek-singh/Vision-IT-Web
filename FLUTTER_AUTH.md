# Flutter Authentication Integration Guide

Following the role-based auth strategy implemented in the Supabase backend, here is how to integrate it into your Flutter app.

## 1. Setup Dependencies

Add `supabase_flutter` and `google_sign_in` (optional for Google login) to your `pubspec.yaml`:

```yaml
dependencies:
  supabase_flutter: ^2.8.1
  google_sign_in: ^6.2.1 # Required for native Google login
```

Initialize Supabase in `main.dart`:

```dart
import 'package:supabase_flutter/supabase_flutter.dart';

void main() async {
  await Supabase.initialize(
    url: 'YOUR_SUPABASE_URL',
    anonKey: 'YOUR_SUPABASE_ANON_KEY',
  );
  runApp(MyApp());
}
```

## 2. Authentication Logic

### Admin Login (OTP + Whitelist)

Admin login should first check the whitelist using the RPC function we created.

```dart
class AuthRepository {
  final _supabase = Supabase.instance.client;

  /// ADMIN FLOW: Check whitelist before sending OTP
  Future<void> sendAdminOTP(String email) async {
    // 1. RPC Check
    final isWhitelisted = await _supabase.rpc('is_admin_whitelisted', params: {
      'check_email': email,
    });

    if (isWhitelisted != true) {
      throw Exception('This email is not authorized as an Admin.');
    }

    // 2. Send OTP
    await _supabase.auth.signInWithOtp(email: email);
  }

  /// Verify OTP Code
  Future<void> verifyOTP(String email, String token) async {
    await _supabase.auth.verifyOTP(
      email: email,
      token: token,
      type: OtpType.magiclink, // Use magiclink if sending link, or 'email' if sending code
    );
  }

  /// USER FLOW: Email + Password
  Future<void> signInUser(String email, String password) async {
    await _supabase.auth.signInWithPassword(email: email, password: password);
  }

  /// USER FLOW: Google OAuth
  Future<void> signInWithGoogle() async {
    await _supabase.auth.signInWithOAuth(
      OAuthProvider.google,
      redirectTo: 'com.visionit.app://login-callback/', // Replace with your deep link
    );
  }
}
```

## 3. Role-Based Navigation

Define a `UserRole` model and fetch it after login.

```dart
enum UserRole { admin, user }

class AuthState {
  static Future<UserRole?> getUserRole() async {
    final user = Supabase.instance.client.auth.currentUser;
    if (user == null) return null;

    final response = await Supabase.instance.client
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

    final roleStr = response['role'] as String;
    return roleStr == 'admin' ? UserRole.admin : UserRole.user;
  }
}
```

### Navigation Logic (GoRouter Example)

```dart
final router = GoRouter(
  redirect: (context, state) async {
    final session = Supabase.instance.client.auth.currentSession;
    if (session == null) return '/login';

    final role = await AuthState.getUserRole();
    
    // Protect Admin Routes
    if (state.fullPath?.startsWith('/admin') == true && role != UserRole.admin) {
      return '/dashboard'; // Redirect non-admins to user dashboard
    }
    
    return null;
  },
  routes: [
    GoRoute(path: '/login', builder: (c, s) => const LoginScreen()),
    GoRoute(path: '/dashboard', builder: (c, s) => const UserDashboard()),
    GoRoute(path: '/admin/dashboard', builder: (c, s) => const AdminDashboard()),
  ],
);
```

## 4. Key UI Elements

*   **Admin Mode**: Use a `TextFormField` for email, followed by a pin-code input (e.g., `pinput` package) for the OTP.
*   **User Mode**: Standard `Email` and `Password` fields + a custom `MaterialButton` for Google Sign-In.

> [!TIP]
> Use the `pinput` package for a premium OTP entry experience in Flutter.
