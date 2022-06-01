import "./styles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Table, Loader, Input, Title } from "@mantine/core";
import NoResults from "./components/NoResults";

export default function App() {
  const URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const tableTitles = [
    "Icon",
    "Name",
    "Current Price",
    "Symbol",
    "Total Volume",
    "Market Cap",
    "Price Change"
  ];

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data } = await axios.get(URL);
    createRows(data);
    setData(data);
    setLoading(false);
  }

  function createRows(coins) {
    const rows = coins.map((coin) => (
      <tr key={coin.id}>
        <td>
          <img className="crypto-icon" alt={coin.name} src={coin.image} />
        </td>
        <td>{coin.name}</td>
        <td>${coin.current_price.toLocaleString()}</td>
        <td>{coin.symbol.toUpperCase()}</td>
        <td>${coin.total_volume.toLocaleString()}</td>
        <td>${coin.market_cap.toLocaleString()}</td>
        <td className={stylePriceChange(coin.price_change_percentage_24h)}>
          {coin.price_change_percentage_24h.toFixed(2)}
        </td>
      </tr>
    ));

    setRows(rows);
  }

  function stylePriceChange(price) {
    return price < 0 ? "high-price" : "low-price";
  }

  function handleChange(e) {
    const filteredCoins = data.filter((coin) =>
      coin.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    createRows(filteredCoins);
  }

  return (
    <div className="App">
      <Container size="md">
        {loading && <Loader color="teal" />}

        {!loading && (
          <>
            <Title order={1} style={{ marginBottom: 20 }}>
              Crypto coin search
            </Title>

            <Input
              size="xl"
              type="text"
              placeholder="search coin name — i.e., bitcoin, avalance, dai, leo, etc"
              onChange={handleChange}
            />

            <Table striped highlightOnHover verticalSpacing="lg" fontSize="md">
              <thead className="table-header">
                <tr>
                  {tableTitles.map((title) => (
                    <th>{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </>
        )}

        {rows.length === 0 && !loading && (
          <NoResults text="No matches found. Try searching something different." />
        )}
      </Container>
    </div>
  );
}
