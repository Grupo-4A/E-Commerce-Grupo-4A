import { useState } from 'react'
import styles from'./App.module.css'
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Shortcut from './components/Shortcut/Shortcut';
import Featuredproducts from './components/Featuredproducts/Featuredproducts';
import Footer from './components/Footer/Footer';
function App() {

  return (
    <div className={styles.container}> 
      <Navbar />
      <Header />
      <Shortcut />
      <Featuredproducts />
      <Footer />
    </div>
  )
}

export default App
