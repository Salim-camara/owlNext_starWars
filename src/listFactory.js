import React, { useEffect, useState } from "react";
import axios from 'axios';

const ListFactory = ({ word }) => {

    const [data, setData] = useState([]);

    // list generator
    const listGenerator = (data) => {
        for (const element of data) {
            const elementContainer = document.createElement('div');
            const elementContainerRight = document.createElement('div');
            const elementContainerLeft = document.createElement('div');
            elementContainer.classList.add('elementContainer');
            elementContainerRight.classList.add('elementContainer_right');
            elementContainerLeft.classList.add('elementContainer_left');
            elementContainerRight.innerHTML = 'Afficher détails';
            if (element.climate) {
                elementContainerLeft.innerHTML = `Planète  =>  <strong>${element.name}</strong>`;
            } else {
                elementContainerLeft.innerHTML = `Personnage  =>  <strong>${element.name}</strong>`; 
            }
            elementContainer.appendChild(elementContainerLeft);
            elementContainer.appendChild(elementContainerRight);
            document.querySelector('.ListFactory').appendChild(elementContainer);
        }
    }

    useEffect(() => {
        console.log('hellowordl')
    }, [word])

    // fetching data
    useEffect(() => {
        let tempoData = [];

        axios.get('https://swapi.dev/api/people/')
            .then((resPeople) => {
                tempoData.push(...resPeople.data.results);
                axios.get('https://swapi.dev/api/planets/')
                    .then((resPlanets) => {
                        tempoData.push(...resPlanets.data.results);
                        setData(tempoData);
                        if(word) {
                            console.log(true);
                        }
                    })
                    .catch((err) => console.log('error fetch data planets: ' + err))
            })
            .then(() => {
                listGenerator(tempoData);
                console.log(data)
            })
            .catch((err) => console.log('error fetch data people: ' + err))
    }, []);


    return (
        <div className="ListFactory">

        </div>
    )
}

export default ListFactory;