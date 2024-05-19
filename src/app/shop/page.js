"use client"
import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import Quagga from 'quagga'; //quagga for ean-scanning
import fetchData from "../../services/ProductService";

export default function Shop() {
    let [productInStock, setproductInStock] = useState([]);
    let [scannedProducts, setScannedProducts] = useState([]);
    const [isCameraActive, setIsCameraActive] = useState(false); // State if camera is active or not
    const [isQuaggaInitialized, setIsQuaggaInitialized] = useState(false); // State for qagga
    const [manualEAN, setManualEAN] = useState(''); // State for manual input
    const videoRef = useRef(null); // Ref for video reference

    useEffect(() => {
        fetchData().then(data => {
            setproductInStock(data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        console.log("Kamera" + isCameraActive);
        console.log("Quagga" + isQuaggaInitialized);
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
                        "ean_reader"
                        
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
            }, function (err) {
                if (err) {
                    console.error("An error occurred during initialization of QuaggaJS:", err);
                    return;
                }
                Quagga.start(); // Start scanner
                setIsQuaggaInitialized(true); // Set isQuaggaInitialized to true when Quagga is initialized
            });

            Quagga.onDetected(function (result) {
                if (validateEAN(result.codeResult.code, productInStock)) {
                    Quagga.stop();
                    setIsCameraActive(false);
                    setIsQuaggaInitialized(false);
                    console.log("Scanning succeed", result);
                    const { codeResult } = result;
                    if (codeResult) {
                        const { code } = codeResult;
                        let scannedProductIndex = -1;

                        scannedProducts.map((product, index) => {
                            if (product.ean === codeResult.code) {
                                scannedProductIndex = index;
                                product.units++;
                            }
                        });

                        if (scannedProductIndex !== -1) {
                            const updatedProducts = [...scannedProducts];
                            updatedProducts[scannedProductIndex].units++;
                            setScannedProducts(updatedProducts);

                        } else {
                            // Om produkten inte finns i scannedProducts, lägg till den med produktinformationen
                            const scannedProductInfo = productInStock.find(product => product.ean === codeResult.code);
                            if (scannedProductInfo) {
                                setScannedProducts(prevProducts => [...prevProducts, {
                                    id: scannedProductInfo.id,
                                    name: scannedProductInfo.name,
                                    price: scannedProductInfo.price,
                                    ean: codeResult.code,
                                    units: 1
                                }]);
                            }
                        }

                    }
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
        setIsQuaggaInitialized(false);
    };

    const completePurchase = async () => {
        alert('Köp slutfört! Tack för din beställning. Se beställningen under "Mina beställningar"');
        const UserId = localStorage.getItem('userId');
    
        // Hämta detaljerad produktinformation för varje produkt i beställningen
        const orderProducts = await Promise.all(scannedProducts.map(async (product) => {
            try {
                const response = await fetch(`https://localhost:7294/api/products/${product.id}`);
                if (response.ok) {
                    const productDetails = await response.json();
                    return {
                        productId: productDetails.id,
                        product: productDetails,
                        quantity: product.units
                    };
                } else {
                    console.error(`Failed to fetch product details for product with ID ${product.id}`);
                    return null;
                }
            } catch (error) {
                console.error(`Error fetching product details for product with ID ${product.id}:`, error);
                return null;
            }
        }));
    
   
        // Beräkna den totala mängden och värdet av ordern
        const totalQuantity = orderProducts.reduce((acc, product) => acc + product.quantity, 0); 
        const totalAmount = orderProducts.reduce((acc, product) => acc + product.product.price * product.quantity, 0);
    
        try {
            const response = await fetch('https://localhost:7294/api/Order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: UserId,
                    order: orderProducts,
                    quantity: totalQuantity, // Hela orderns totala antal produkter
                    amount: totalAmount, // Hela orderns totala värde
                    
                })
            });
    
            if (response.ok) {
                // Rensa listan med skannade produkter om ordern skapades framgångsrikt
                setScannedProducts([]);
            } else {
                console.error('Failed to create order:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };
    
    

    const manualInput = () => {
        if (validateEAN(manualEAN, productInStock)) {
            const scannedProductIndex = scannedProducts.findIndex(product => product.ean === manualEAN);
            if (scannedProductIndex !== -1) {
                const updatedProducts = [...scannedProducts];
                updatedProducts[scannedProductIndex].units++;
                setScannedProducts(updatedProducts);
            } else {
                const scannedProductInfo = productInStock.find(product => product.ean === manualEAN);
                if (scannedProductInfo) {
                    setScannedProducts(prevProducts => [...prevProducts, {
                        id: scannedProductInfo.id,
                        name: scannedProductInfo.name,
                        price: scannedProductInfo.price,
                        ean: manualEAN,
                        units: 1
                    }]);
                }
            }
        } else {
            alert('Invalid EAN code.');
        }
        setManualEAN(''); // Reset the manual EAN input field
    };

    return (
        <main className={styles.main}>
            <h2>Handla</h2>
            <button onClick={toggleCamera} className={styles.cameraButton}>
                {isCameraActive ? 'Skannar, klar? ' : 'Skanna produkt'}
            </button>
            <input
                type="text"
                value={manualEAN}
                onChange={(e) => setManualEAN(e.target.value)}
                placeholder="Mata in EAN-kod"
            />
            <button onClick={manualInput} className={styles.scanButton}>
                Manuell inmatning
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

const validateEAN = (ean, productInStock) => {
    console.log(productInStock);
    console.log(ean);
    const productExist = productInStock.find(product => product.ean === ean);

    if (!productExist) {
        return false;
    }

    if (ean.length !== 13 && ean.length !== 8) { //Length is 13 or 8
        return false;
    }

    if (!/^\d+$/.test(ean)) { //No letter
        return false;
    }

    if (ean[0] != 7) { //No letter
        return false;
    }

    // Kontrollera kontrollsiffran för EAN-13
    if (ean.length === 13) {
        const sum = ean.slice(0, 12).split('').map(Number).reduce((acc, digit, index) => {
            return index % 2 === 0 ? acc + digit * 1 : acc + digit * 3;
        }, 0);
        const checkDigit = (10 - (sum % 10)) % 10;
        return Number(ean[12]) === checkDigit;
    }

    // Kontrollera kontrollsiffran för EAN-8
    if (ean.length === 8) {
        const sum = ean.slice(0, 7).split('').map(Number).reduce((acc, digit, index) => {
            return index % 2 === 0 ? acc + digit * 3 : acc + digit * 1;
        }, 0);
        const checkDigit = (10 - (sum % 10)) % 10;
        return Number(ean[7]) === checkDigit;
    }

    return false;
};
