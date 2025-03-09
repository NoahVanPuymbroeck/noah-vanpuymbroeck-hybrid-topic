"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

// Jouw locatie: Blauwe Hoevestraat 6, Sint-Niklaas
const userLocation = { lat: 51.1657, lon: 4.1431 };

// Lijst met hogescholen en hun coördinaten
const universities = [
    { name: "Antwerp Maritime Academy", address: "Noordkasteel-Oost 6, 2030 Antwerpen", lat: 51.2314, lon: 4.4128 },
    { name: "AP Hogeschool Antwerpen", address: "Lange Nieuwstraat 101, 2000 Antwerpen", lat: 51.2194, lon: 4.4213 },
    { name: "Arteveldehogeschool", address: "Geraard De Duivelstraat 5, 9000 Gent", lat: 51.0376, lon: 3.7076 },
    { name: "Erasmushogeschool Brussel", address: "Nijverheidskaai 170, 1070 Anderlecht", lat: 50.8503, lon: 4.3517 },
    { name: "Hogeschool PXL", address: "Elfde-Liniestraat 24, 3500 Hasselt", lat: 50.9311, lon: 5.3378 },
    { name: "Hogeschool VIVES", address: "Xaverianenstraat 10, 8200 Brugge", lat: 50.8225, lon: 3.2646 },
    { name: "HOGENT", address: "Geraard De Duivelstraat 5, 9000 Gent", lat: 51.0362, lon: 3.7363 },
    { name: "Howest", address: "Doorniksesteenweg 145, 8500 Kortrijk", lat: 50.8225, lon: 3.2646 },
    { name: "Karel de Grote Hogeschool", address: "Brusselstraat 45, 2018 Antwerpen", lat: 51.2194, lon: 4.4213 },
    { name: "LUCA School of Arts", address: "Paleizenstraat 70, 1030 Schaarbeek", lat: 50.8662, lon: 4.3751 },
    { name: "Odisee", address: "Warmoesberg 26, 1000 Brussel", lat: 50.8503, lon: 4.3517 },
    { name: "Thomas More", address: "Zandpoortvest 60, 2800 Mechelen", lat: 51.1656, lon: 4.9896 },
    { name: "UC Leuven-Limburg", address: "Geldenaaksebaan 335, 3001 Leuven", lat: 50.8796, lon: 4.7009 },
    { name: "Warmoesberg 26, 1000 Brussel", address: "Warmoesberg 26, 1000 Brussel", lat: 50.8497, lon: 4.3517 },
    { name: "LUCA School of Arts (Paleizenstraat 70, 1030 Schaarbeek)", address: "Paleizenstraat 70, 1030 Schaarbeek", lat: 50.8594, lon: 4.3789 },
    { name: "Erasmushogeschool Brussel (Nijverheidskaai 170, 1070 Anderlecht)", address: "Nijverheidskaai 170, 1070 Anderlecht", lat: 50.8373, lon: 4.2878 },
    { name: "Artesis Plantijn Hogeschool Antwerpen (Lange Nieuwstraat 101, 2000 Antwerpen)", address: "Lange Nieuwstraat 101, 2000 Antwerpen", lat: 51.2113, lon: 4.4217 },
    { name: "Karel de Grote Hogeschool (Brusselstraat 45, 2018 Antwerpen)", address: "Brusselstraat 45, 2018 Antwerpen", lat: 51.2101, lon: 4.4144 },
    { name: "Hogere Zeevaartschool (Noordkasteel-Oost 6, 2030 Antwerpen)", address: "Noordkasteel-Oost 6, 2030 Antwerpen", lat: 51.2516, lon: 4.4069 },
    { name: "Thomas More Kempen (Kleinhoefstraat 4, 2440 Geel)", address: "Kleinhoefstraat 4, 2440 Geel", lat: 51.1594, lon: 4.9443 },
    { name: "Thomas More Mechelen-Antwerpen (Zandpoortvest 60, 2800 Mechelen)", address: "Zandpoortvest 60, 2800 Mechelen", lat: 51.0295, lon: 4.4709 },
    { name: "UC Leuven (Geldenaaksebaan 335, 3001 Leuven)", address: "Geldenaaksebaan 335, 3001 Leuven", lat: 50.8796, lon: 4.7009 },
    { name: "Hogeschool PXL (Elfde-Liniestraat 24, 3500 Hasselt)", address: "Elfde-Liniestraat 24, 3500 Hasselt", lat: 50.9340, lon: 5.3449 },
    { name: "UC Limburg (Agoralaan Gebouw B 1 bus 1, 3590 Diepenbeek)", address: "Agoralaan Gebouw B 1 bus 1, 3590 Diepenbeek", lat: 50.9605, lon: 5.3912 },
    { name: "Katholieke Hogeschool Vives Noord (Xaverianenstraat 10, 8200 Brugge)", address: "Xaverianenstraat 10, 8200 Brugge", lat: 51.2113, lon: 3.2248 },
    { name: "Katholieke Hogeschool Vives Zuid (Doorniksesteenweg 145, 8500 Kortrijk)", address: "Doorniksesteenweg 145, 8500 Kortrijk", lat: 50.8377, lon: 3.2677 },
    { name: "Hogeschool West-Vlaanderen (Marksesteenweg 58, 8500 Kortrijk)", address: "Marksesteenweg 58, 8500 Kortrijk", lat: 50.8379, lon: 3.2647 },
    { name: "Hogeschool Gent (Geraard De Duivelstraat 5, 9000 Gent)", address: "Geraard De Duivelstraat 5, 9000 Gent", lat: 51.0391, lon: 3.7156 },
    { name: "Arteveldehogeschool (Geraard De Duivelstraat 5, 9000 Gent)", address: "Geraard De Duivelstraat 5, 9000 Gent", lat: 51.0391, lon: 3.7156 }
];

// Haversine-formule om afstand in km te berekenen
const haversineDistance = (coord1, coord2) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371; // Straal van de aarde in km
    const dLat = toRad(coord2.lat - coord1.lat);
    const dLon = toRad(coord2.lon - coord1.lon);
    const lat1 = toRad(coord1.lat);
    const lat2 = toRad(coord2.lat);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Afstand in km
};

export default function DistanceChart() {
    const svgRef = useRef();

    useEffect(() => {
        const width = 600, height = 400;
        const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);

        // Bereken de afstanden en sorteer van klein naar groot
        const distances = universities
            .map((uni) => ({
                name: uni.name,
                distance: haversineDistance(userLocation, { lat: uni.lat, lon: uni.lon }),
            }))
            .sort((a, b) => a.distance - b.distance);

        const margin = { top: 20, right: 30, bottom: 40, left: 100 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(distances, (d) => d.distance)])
            .range([0, chartWidth]);

        const yScale = d3.scaleBand()
            .domain(distances.map((d) => d.name))
            .range([0, chartHeight])
            .padding(0.2);

        const chart = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

        // X-as
        chart.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(d3.axisBottom(xScale));

        // Y-as
        chart.append("g").call(d3.axisLeft(yScale));

        // Staafjes
        chart.selectAll(".bar")
            .data(distances)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("y", (d) => yScale(d.name))
            .attr("width", (d) => xScale(d.distance))
            .attr("height", yScale.bandwidth())
            .attr("fill", "steelblue");

    }, []);

    return <svg ref={svgRef}></svg>;
}
