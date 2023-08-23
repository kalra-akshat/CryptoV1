import '../Styles/Coins.css';

function Coin(context){
    return (
        <div className="container">
            <div className="row">
                <div className="coin">
                    <img src={context.image} alt="coin"/>
                    <p>{context.name}</p>
                </div>
                <div className="price">
                    <p className="coin-price">Rs. {context.price}</p>
                </div>
                <div className="price-change">
                    {context.pricechange<0? 
                    <p className="price-change-negative">{context.pricechange.toFixed(2)}%</p>:
                    <p className="price-change-positive">{context.pricechange.toFixed(2)}%</p>}
                </div>
                <div className="mkt-cap">
                    Rs.   {context.marketcap.toLocaleString()}
                </div>
            </div>
        </div>
    );
}

export default Coin;