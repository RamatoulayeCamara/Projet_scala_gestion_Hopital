# Utiliser une image de base Scala
FROM openjdk:17-jdk-slim as build

# Ajouter les fichiers de votre application
WORKDIR /app
COPY . /app

# Installer sbt (outil de construction Scala)
RUN apt-get update && apt-get install -y curl gnupg \
    && curl -sL https://dl.bintray.com/sbt/debian/sbt-1.5.5.deb -o sbt.deb \
    && dpkg -i sbt.deb \
    && apt-get install -y sbt

# Construire l'application
RUN sbt clean compile

# Exposer le port utilisé par votre application
EXPOSE 8080

# Démarrer l'application
CMD ["sbt", "run"]
