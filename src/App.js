import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [ttc, setTtc] = useState(""); // 선택된 코인의 가격
  const [x, setX] = useState(""); // 사용자가 입력한 금액

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  // 코인 선택 핸들러
  const handleSelectChange = (event) => {
    setTtc(parseFloat(event.target.value)); // 문자열을 숫자로 변환
  };

  // 변환할 금액 입력 핸들러
  const handleXChange = (event) => {
    setX(event.target.value);
  };

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>

      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <>
          {/* 코인 선택 드롭다운 */}
          <select onChange={handleSelectChange}>
            <option value="">Select a coin</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <br />
          <br />
          {/* 변환할 금액 입력 필드 */}
          <input
            type="number"
            onChange={handleXChange}
            value={x}
            placeholder="USD"
          />
          USD
          <br /> =
          <br />
          {/* 변환된 금액 표시 */}
          <input
            value={x && ttc ? (parseFloat(x) / ttc).toFixed(6) : ""}
            placeholder="Coins"
            readOnly
          />
          COINS
        </>
      )}
    </div>
  );
}

export default App;
