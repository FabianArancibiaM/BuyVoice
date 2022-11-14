# BuyVoice
Proyecto de titulo

# Generar APK
* npm i
* ionic build (Genera carpeta www que se puede levantar como paginaweb en un servidor)
* npx cap add android (Genera una carpeta android, el cual se utiliza para generar la apk en android studio)
* npx cap open android (sino funciona, se debe abrir android studio y seleccionar la carpeta android)



https://enappd.com/blog/icon-splash-in-ionic-react-capacitor-apps/114/

Los íconos en la plataforma Android residen en la carpeta mipmap en la aplicación → res → mipmap
Hay dos formas de crear un icono personalizado para el proyecto
Reemplace cada ícono individual con sus activos personalizados, cuidando los nombres de los archivos
Cree un nuevo activo de icono en el propio Android Studio

Tomemos el método 2, ya que es más rápido. Haga clic con el botón derecho en la rescarpeta, Nuevo → Activo de imagen
****-> (Let’s take method 2, as it is faster. Right-click on res folder, New → Image asset) usar url imaen en descargas

Se abrirá otra ventana, donde puede seleccionar la imagen de su icono y comprobar las vistas previas del icono.
Finalice la operación y sobrescribirá los archivos de iconos existentes. 