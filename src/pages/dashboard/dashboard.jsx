import Loading from "../../components/loading/loading";
import { useState, useEffect } from "react";
import "./dashboard.css";
import { toast } from "react-toastify";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
function Title() {
    return (
        <div className="title">
            <h1>Dashboard</h1>
            <p>Track Your Short Urls</p>
        </div>
    );
}

function Nodata() {
    return (
        <div className="nodata">
            <p>Please Create A Short Url To See The Dashboard</p>
            <a href="/">Create Now</a>
        </div>
    )
}

function Card({ code, long, count }) {
    let lhref = long.startsWith("http") ? long : "https://" + long;
    return (
        <div className="card">
            <p><strong>Short Code: </strong>{code}</p>
            <p><strong>Long Url: </strong><a href={lhref}>{long}</a></p>
            <p><strong>Redirects: </strong>{count}</p>
        </div>
    );
}

function Details({ data }) {
    return (
        <div className="details">
            <h2>Details</h2>
            <div className="cards">
                {
                    data.map((item, index) => (
                        <Card key={index} code={item.code} long={item.long} count={item.count} />
                    ))
                }
            </div>
        </div>
    );
}

function Data({ data, isPhone }) {
    const modifycode = (code) => {
        if (code.length > 5) {
            return code.slice(0, 5) + "...";
        }
        return code;
    }
    let [height, width] = isPhone ? [300, "90%"] : [350, "65%"];

    let chartsdata = []
    data.forEach(item => {
        chartsdata.push({
            code: modifycode(item.code),
            count: item.count
        });
    });
    chartsdata = chartsdata.slice(0, isPhone ? 5 : 10);
    return (
        <>
            <div className="charts">
                <ResponsiveContainer width={width} height={height}>
                    <BarChart width={500} height={300} data={chartsdata}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="code" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#ff6b5f" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <Details data={data} />
        </>

    )
}



function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [isPhone, setIsPhone] = useState(window.matchMedia("(max-width: 800px)").matches);
    useEffect(() => {
        let token = localStorage.getItem("urltoken");
        if (!token) {
            setLoading(false);
            return;
        }
        fetch("/api/url/getdashdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token }),
        }).then(res => res.json()).then(data => {
            if (data.error) {
                toast.error(data.message)
            } else {
                let lis = data.urls;
                lis.sort((a, b) => b.count - a.count);
                setData(lis);
            }
            setLoading(false);
        })
        window.matchMedia("(max-width: 800px)").addEventListener("change", (e) => {
            setIsPhone(e.matches);
        });
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="dashboard">
            <Title />
            {data ? <Data data={data} isPhone={isPhone} /> : <Nodata />}
        </div>
    );
}

export default Dashboard;