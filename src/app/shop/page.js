"use client"

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import Quagga from 'quagga';  //quagga for ean-scanning

export default function Shop() {
    const [scannedProducts, setScannedProducts] = useState([ //array for product in basket
        {name:"Ost", price:"149", ean: "9772066291223", units: 2},
        {name:"Paprika", price:"18", ean: "9767431382547", units: 3},
        {name:"Chips", price:"29", ean: "9761697128365", units: 3}
    ]);
    const [isCameraActive, setIsCameraActive] = useState(false); // State if camera is active or not
    const [isQuaggaInitialized, setIsQuaggaInitialized] = useState(false); // State for qagga
    const videoRef = useRef(null); // Ref for video reference

    useEffect(() => {
        if (isCameraActive && !isQuaggaInitialized) {
            // configure QuaggaJS
            Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: videoRef.current, 
                    constraints: {
                        facingMode: "environment" // use backcamere if its possible
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
                    console.error("An error occurred during initialization of QuaggaJS:", err);
                    return;
                }
                Quagga.start(); // Start scanner
                setIsQuaggaInitialized(true); // Set isQuaggaInitialized to true when Quagga is initialized
            });

            Quagga.onDetected(function(result) {
                console.log("Scanning succeed", result);
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
                        updatedProducts[scannedProductIndex].units++; // add units to basket if prouduct already exist
                        setScannedProducts(updatedProducts); 
                    } else {
                        scannedProducts.push({name:"", price:"", ean: code, units: 1});
                        setScannedProducts(prevProducts => [...prevProducts, { ean: code, units: 1 }]); 
                }
                
                
            });
        }

        // Function for cloosing kamera
        return () => {
            if (isQuaggaInitialized) {
                Quagga.stop();
            }
        };
    }, [isCameraActive, isQuaggaInitialized]);

    const toggleCamera = () => {
        setIsCameraActive(prevState => !prevState); // Activate, deactivate camera
    };

    const completePurchase = () => {
        alert('Köp slutfört! Tack för din beställning.');
        setScannedProducts([]);
        scannedProducts = [];
    };

    return (
        <main className={styles.main}>
            <h2>Handla</h2>
            <button onClick={toggleCamera} className={styles.cameraButton}>
                {isCameraActive ? 'Klar' : 'Skanna produkter'}
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
