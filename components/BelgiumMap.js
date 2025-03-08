'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BelgiumMapWithGraph = () => {
    const svgRef = useRef(null);

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

    useEffect(() => {
        const width = 800, height = 600;
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        // Create tooltip div
        const tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("background", "white")
            .style("border", "1px solid #999")
            .style("padding", "8px")
            .style("border-radius", "4px")
            .style("visibility", "hidden")
            .style("box-shadow", "0px 0px 6px rgba(0,0,0,0.2)");

        d3.json('/belgium.geojson').then((geoData) => {
            const projection = d3.geoMercator().fitSize([width, height], geoData);
            const pathGenerator = d3.geoPath().projection(projection);

            const g = svg.append('g'); // Group to hold map and markers

            g.selectAll('path')
                .data(geoData.features)
                .enter()
                .append('path')
                .attr('d', pathGenerator)
                .attr('fill', '#d3d3d3')
                .attr('stroke', '#333');

            // Draw universities on the map
            g.selectAll('circle')
                .data(universities)
                .enter()
                .append('circle')
                .attr('cx', d => projection([d.lon, d.lat])[0])
                .attr('cy', d => projection([d.lon, d.lat])[1])
                .attr('r', 5)
                .attr('fill', 'red')
                .on("mouseover", (event, d) => {
                    tooltip.style("visibility", "visible")
                        .text(`${d.name}\n${d.address}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY + 10) + "px");
                })
                .on("mousemove", (event) => {
                    tooltip.style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY + 10) + "px");
                })
                .on("mouseout", () => {
                    tooltip.style("visibility", "hidden");
                });

            // **Add Zoom and Pan**
            const zoom = d3.zoom()
                .scaleExtent([1, 8]) // Min and max zoom levels
                .on("zoom", (event) => {
                    g.attr("transform", event.transform);

                    // Adjust circle size dynamically based on zoom level
                    g.selectAll("circle")
                        .attr("r", 5 / event.transform.k); // Scale down circles when zooming in
                });

            svg.call(zoom);

        });

        return () => {
            tooltip.remove(); // Clean up tooltip when component unmounts
        };
    }, []);


    return <svg ref={svgRef}></svg>;
};

export default BelgiumMapWithGraph;
