import BelgiumMapWithGraph from "../../components/BelgiumMap";
import DistanceChart from "../../components/DistanceChart";

export default function Home() {
    return (
        <main style={{ display: "flex", justifyContent: "center", gap: "20px", alignItems: "start" }}>
            <div style={{ flex: 1 }}>
                <h1>Belgium Map with D3.js</h1>
                <BelgiumMapWithGraph />
            </div>
            <div style={{ flex: 1 }}>
                <DistanceChart />
            </div>
        </main>
    );
}

