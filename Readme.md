# Projekt X - E-handelsapplikation

## Introduktion

Projekt X är en e-handelsapplikation för att skanna och köpa/skanna produkter via mobilens kamera eller manuellt via inmatning av EAN-kod. Detta README-dokument ger en översikt över hur man installerar och kör projektet samt information om API:et och användning av localhost.

## Installation

För att köra projektet lokalt behöver du först ha Node.js installerat på din dator. Om du inte redan har Node.js installerat kan du ladda ner det från [Node.js webbplats](https://nodejs.org/).

När Node.js är installerat, följ dessa steg:

1. Klona projektets GitHub-repositorium till din lokala dator.
2. Öppna en terminal och navigera till projektmappen.
3. Kör kommandot `npm install` för att installera alla projektets beroenden.

## Körning av projektet

När installationen är klar kan du köra projektet med följande kommando:
`npm run dev`

Detta kommando startar utvecklingsservern och öppnar applikationen i din webbläsare på [http://localhost:3000](http://localhost:3000).

## API:et

Projektet använder ett API för att hantera produkter och beställningar. API:et finns på `https://localhost:7294/api/`. Du kan använda detta API för att hämta produkter, skapa beställningar och mycket mer.


## Lokal utveckling

Under utvecklingsprocessen kan du komma åt API:et via `localhost`. Se till att API:et körs lokalt på din dator för att kunna använda det under utveckling.

## Övrigt

Projektet är utvecklat med React för frontend och QuaggaJS för EAN-skanning via webbkamera. Läs igenom källkoden och dokumentationen för att få en bättre förståelse för projektets struktur och funktionalitet.


