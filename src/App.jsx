import { useState } from 'react'
import styles from'./App.module.css'
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Shortcut from './components/Shortcut/Shortcut';
import Fproducts from './components/Featuredproducts/Featuredproducts';
import Footer from './components/Footer/Footer';
import { Provider } from "./components/ui/provider"
function App() {

  return (
    <Provider>
    <div className={styles.container}> 
      <Navbar />
      <Header />
      <Shortcut />
      <Fproducts />
      <Footer />
    </div>
    </Provider>
  )
}

export default App
