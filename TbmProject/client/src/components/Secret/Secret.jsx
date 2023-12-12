import { useEffect, useState,useRef } from 'react';

const Secret = () => {
    const [secret, setSecret] = useState(false);
    const audioRef = useRef(null);

    const keys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        65: "a",
        66: "b"
    };
    const code = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
    let index = 0;

    const keydownHandler = (e) => {
        const key = keys[e.keyCode];
        const requiredKey = code[index];
        if (key === requiredKey) {
            index++;
            if (index === code.length) {
                activateCheats();
                index = 0;
            }
        } else {
            setSecret(false);
            index = 0;
        }
    };

    const activateCheats = async () => {
        if (!secret) {
            // Mettez l'attente ici pour le chargement de l'image
            setSecret(true);
            await loadImage();
            if (audioRef.current) {
                audioRef.current.currentTime = 15;
                audioRef.current.play();
            }
            // Faire défiler la page à 200 pixels de hauteur
            window.scrollTo(0, 480);
        }
    };

    const loadImage = () => {
        return new Promise((resolve) => {
            const image = new Image();
            image.src = "./ImagesBus/gragawan.svg";
            image.onload = resolve;
        });
    };

    useEffect(() => {
        document.addEventListener("keydown", keydownHandler);
        return () => {
            document.removeEventListener("keydown", keydownHandler);
        };
    }, []);

    return (
        <div>
            {secret && (
                <div>
                    <img src="./ImagesBus/gragawan.svg" alt="Secret Image" />
                    <audio ref={audioRef} controls autoPlay>
                        <source src="./ImagesBus/RISE.mp3" type="audio/mpeg" />
                    </audio>
                </div>
            )}
        </div>
    );
};

export default Secret;
