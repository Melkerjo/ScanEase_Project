"use client"

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import Quagga from 'quagga'; // Importera Quagga

export default function Shop() {
    const [scannedProducts, setScannedProducts] = useState([
        {name:"Ost", price:"149", ean: "9772066291223", units: 2},
        {name:"Paprika", price:"18", ean: "9767431382547", units: 3},
        {name:"Chips", price:"29", ean: "9761697128365", units: 3}
    ]);
    const [isCameraActive, setIsCameraActive] = useState(false); // State för att hålla koll på om kameran är aktiv
    const [isQuaggaInitialized, setIsQuaggaInitialized] = useState(false); // State för att hålla koll på om Quagga är initialiserat
    const videoRef = useRef(null); // Ref för att komma åt videokomponenten

    useEffect(() => {
        if (isCameraActive && !isQuaggaInitialized) {
            // Konfigurera QuaggaJS
            Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: videoRef.current, // Använd ref för att komma åt videokomponenten
                    constraints: {
                        facingMode: "environment" // Använd bakre kamera om tillgänglig
                    }
                },
                decoder: {
                    readers: [
                        "code_128_reader",
                        "ean_reader",
                        "ean_8_reader",
                        "code_39_reader",
                        "code_39_vin_reader",
                        "codabar_reader",
                        "upc_reader",
                        "upc_e_reader",
                        "i2of5_reader"
                    ],
                    debug: {
                        showCanvas: true,
                        showPatches: true,
                        showFoundPatches: true,
                        showSkeleton: true,
                        showLabels: true,
                        showPatchLabels: true,
                        showRemainingPatchLabels: true,
                        boxFromPatches: {
                            showTransformed: true,
                            showTransformedBox: true,
                            showBB: true
                        }
                    }
                }
            }, function(err) {
                if (err) {
                    console.error("Det uppstod ett fel vid initiering av QuaggaJS:", err);
                    return;
                }
                console.log("QuaggaJS initierad");
                Quagga.start(); // Starta streckkodsläsaren
                setIsQuaggaInitialized(true); // Sätt isQuaggaInitialized till true när Quagga är initialiserat
            });

            // Lyssna på händelser från QuaggaJS
            Quagga.onDetected(function(result) {
                console.log("Skanning lyckades", result);
                const { codeResult } = result;
                if (codeResult) {
                    const { code } = codeResult;
                    let scannedProductIndex = -1;
                    
                    scannedProducts.map((product, index) => {
                        if (product.ean === code) {
                            scannedProductIndex = index;
                            product.units++;
                        }
                    });
                
                    if (scannedProductIndex !== -1) {
                        const updatedProducts = [...scannedProducts];
                        updatedProducts[scannedProductIndex].units++; // Öka units för den befintliga produkten med ett
                        setScannedProducts(updatedProducts); // Uppdatera state med den nya produkten
                    } else {
                        scannedProducts.push({name:"", price:"", ean: code, units: 1});
                        setScannedProducts(prevProducts => [...prevProducts, { ean: code, units: 1 }]); // Lägg till den skannade produkten med units 1 i state
                    }
                }
                
                
            });
        }

        // Funktion för att stänga av kameran när komponenten avmonteras
        return () => {
            if (isQuaggaInitialized) {
                Quagga.stop();
            }
        };
    }, [isCameraActive, isQuaggaInitialized]);

    const toggleCamera = () => {
        setIsCameraActive(prevState => !prevState); // Växla mellan att aktivera och inaktivera kameran
    };

    const completePurchase = () => {
        alert('Köp slutfört! Tack för din beställning.');
        setScannedProducts([]);
    };

    return (
        <main className={styles.main}>
            <h2>Handla</h2>
            <button onClick={toggleCamera} className={styles.cameraButton}>
                {isCameraActive ? 'Klar med skanning' : 'Skanna produkter'}
            </button>
            <h3>Varukorg</h3>
            <table className={styles.cartTable}>
                <thead>
                    <tr>
                        <th>Produktnamn</th>
                        <th>Pris</th>
                        <th>EAN-kod</th>
                        <th>Antal</th>
                    </tr>
                </thead>
                <tbody>
                    {scannedProducts.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.price} kr</td>
                            <td>{product.ean}</td>
                            <td>{product.units}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={completePurchase} className={styles.purchaseButton}>
                Slutför köp
            </button>
            <video ref={videoRef} id="video" playsInline style={{ transform: 'scaleX(-1)' }}></video>
        </main>
    );
}
