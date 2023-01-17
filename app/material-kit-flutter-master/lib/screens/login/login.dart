import 'package:flutter/material.dart';
import 'package:flutter_login/flutter_login.dart';
import 'package:get/get.dart';
import 'package:material_kit_flutter/constants/Theme.dart';
import 'package:material_kit_flutter/constants/strings.dart';
import 'package:material_kit_flutter/models/user/user.dart';
import 'package:material_kit_flutter/screens/home/home.dart';
import 'package:material_kit_flutter/screens/homeDriver/homeDriver.dart';
import 'package:material_kit_flutter/utils/utils.dart';

class Login extends StatefulWidget {
  const Login({Key? key}) : super(key: key);

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  
  @override
  void initState() {
    start();
    super.initState();
  }

  @override
  dispose() {
    super.dispose();
  }

  Future<void> start() async {
    var secureWords = await getAllSecureStorage();
    if(secureWords.isNotEmpty && secureWords.keys.contains("token")) {
      if(secureWords['driverValue'] == 'true')
        Get.to(() => HomeDriver());
      else
        Get.to(() => Home());
    }

  }

  @override
  Widget build(BuildContext context) {
    print("[BUILD] Login");
    return FlutterLogin(
        onSignup: (p0) => null,
        hideForgotPasswordButton: true,
        userValidator: (_) => validateUser(""),
        userType: LoginUserType.name,
        //theme: LoginTheme(pageColorLight: MaterialColors.blueMain),
        theme: LoginTheme(primaryColor: MaterialColors.blueMain),
        title: nameApp,
        logo: 'assets/img/condor1.png',
        hideSignUpButton: true,
        messages: LoginMessages(
            userHint: 'Usuario',
            passwordHint: 'Contraseña',
            confirmPasswordHint: 'Confirmar',
            loginButton: 'Iniciar sesíon',
            forgotPasswordButton: 'Olvidaste tu contraseña?',
            confirmPasswordError: 'Not match!',
            recoverPasswordDescription:
            'Enviaremos un correo para recuperar tu cuenta',
            recoverPasswordIntro: 'Escriba su correo electronico',
            goBackButton: 'Atras',
            recoverPasswordButton: 'Enviar',
            flushbarTitleError: 'Error'),
        onLogin: (_) => validateLogin(_.name, _.password, context),
        onSubmitAnimationCompleted: () {
          Navigator.of(context).pushReplacement(MaterialPageRoute(
            builder: (context) => Login(),
          ));
        },
        onRecoverPassword: (_) => null);
  }

  String? validateUser(String? name) {
    return null;
  }

  Future<String?> validateLogin(String name, String password, BuildContext context) async {
    try {
      User? response = await User.login(name, password);
      if (response != null) {
        Get.offAndToNamed('/home');
        return null;
      }
    } catch (e) { }
    return 'Verifique sus credenciales';
  }
}
