import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import "./Home2.css";
import { SideCart, Cart, Products } from './deler/funksjoner';
import bildet1 from "./bilder/bildet1.jpg"
import bildet2 from "./bilder/bildet2.jpg"
import bildet3 from "./bilder/bildet 3.png"
import video1 from "./bilder/video.mp4"



const produkter = [
  {
    id: 1,
    price: "30kr",
    amount: 1,
    img: bildet1
  },
  {
    id: 2,
    price: "145kr",
    amount: 5,
    img: bildet2
  },
  {
    id: 3,
    price: "290kr",
    amount: 10,
    img: bildet3
  },
]

function App() {
  const [vis_cart, setvis_cart] = useState(false);
  const [cart_tot, setcart_tot] = useState(0);
  const [bought, setbought] = useState([]);
  const [element, setelement] = useState(0);
  const [prod, setprod] = useState(produkter[0]);
  const [animer, setanimer] = useState(false)


  useEffect(() => {
    setprod(produkter[element]);
  }, [element])

  function slide(sann) {
    if (sann) {
      if (element === (produkter.length - 1)) {
        setelement(0);
      }
      else {
        setelement(element + 1);
      }
    }

    if (!sann) {
      if (element === 0) {
        setelement(produkter.length - 1)
      }
      else {
        setelement(element - 1)
      }
    }
  }

  function add(tall) {
    //fikser cart svg antall
    setcart_tot(cart_tot + 1);

    //setter i cart
    const produktet = produkter[tall];
    var finns = false;
    if (bought.length !== 0) {
      for (let i = 0; i < bought.length; i++) {
        if (bought[i].id === produktet.id) {
          finns = true;
        }
        else {
          finns = false;
        }
      }
    }

    if (finns) {
      var kjøpte_prod = bought.find((ene) => ene.id === produktet.id)
      var ind = bought.indexOf(kjøpte_prod);
      kjøpte_prod.amount += 1;
      var new_bought = bought;
      new_bought[ind] = kjøpte_prod;
      setbought(new_bought);
    }
    if (!finns) {
      var xx = {
        id: produktet.id,
        amount: 1,
      }
      setbought([...bought, xx]);
    }



  }

  return <div className='all'>
    <div className='navbarbak'></div>
    <section className="navbar">
      <div className="logo">
        <h5 className='midlertidig-logo'>LOGO</h5>
      </div>

      <div className="cart" onClick={() => setvis_cart(!vis_cart)}>
        <Cart cart_tot={cart_tot} animer={animer} setanimer={setanimer} />
      </div>


      <div className="language-hoved">
        <div className="language-div">
          <h1 className='Språk'>EN</h1>
          <svg className='pil-ned' shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <path transform="translate(.93662 4.8236)" d="m100.83 86.029h101.16c-28.099 28.895-38.401 41.211-51.983 115.34-5.1514-75.07-16.391-85.373-49.173-115.34z" fill="#f2a304" stroke-width=".6" /></svg>
        </div>
      </div>
    </section>


    <section className="hoved">
      {vis_cart && <SideCart produkter={produkter} bought={bought} setvis_cart={setvis_cart} vis_cart={vis_cart} />}

      <div className="about">
        <video className='video' src={video1} autoPlay loop muted ></video>
      </div>

      <section className="products">
        <Products prod={prod} slide={slide} />
        <div>
          <h3 className='antall'>{prod.amount} for {prod.price},</h3>
        </div>

        <div>
          <button className='btn' onClick={() => { add(element); setanimer(true) }}>Buy</button>
        </div>
      </section>

      <section className="contact">contact</section>

    </section>

  </div>
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

